import { useCallback, useEffect, useRef, useState } from 'react'
import startVideo from '@/assets/start.mp4'
import startPoster from '@/assets/start-poster.jpg'
import { homeImageAssets } from '@/lib/homeAssets'
import { preloadImages } from '@/lib/preloadImages'

interface Props {
  /** Called once the clip has finished playing */
  onFinished: () => void
}

/**
 * Full-bleed splash: start.mp4 sits paused on its first frame until the
 * visitor scrolls (or taps), at which point it plays through once. When it
 * ends, `onFinished` fires so the caller can run the paper transition into
 * the home page. Body scroll is locked for the whole clip so the video is
 * the entire experience, not a backdrop competing with page scroll.
 *
 * `poster` is the video's own extracted first frame — mobile browsers on a
 * metered connection often don't actually buffer video data until playback
 * is requested, so without it the element renders black until the visitor
 * scrolls.
 *
 * The home page's artwork is preloaded in the background the whole time
 * this screen is up. `onFinished` is deferred until that preload resolves,
 * so the paper transition never reveals a page that's still popping in
 * images — the failure mode seen on GitHub Pages, where cold-cache image
 * requests are slow enough to lag behind the transition.
 */
export default function IntroVideo({ onFinished }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)
  const [assetsReady, setAssetsReady] = useState(false)
  const [pendingFinish, setPendingFinish] = useState(false)

  useEffect(() => {
    let cancelled = false
    preloadImages(homeImageAssets).then(() => {
      if (!cancelled) setAssetsReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (assetsReady && pendingFinish) onFinished()
  }, [assetsReady, pendingFinish, onFinished])

  // Every path off this screen (video end, autoplay failure, skip) routes
  // through here instead of calling onFinished directly, so none of them
  // can hand off before the home page's images are actually cached.
  const requestFinish = useCallback(() => {
    if (assetsReady) onFinished()
    else setPendingFinish(true)
  }, [assetsReady, onFinished])

  // Lock scroll for the duration of the intro.
  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevOverflow
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => setReady(true)
    const handleTime = () => {
      if (video.duration) setProgress(video.currentTime / video.duration)
    }
    const handleEnded = () => requestFinish()

    video.addEventListener('canplaythrough', handleCanPlay)
    video.addEventListener('timeupdate', handleTime)
    video.addEventListener('ended', handleEnded)
    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay)
      video.removeEventListener('timeupdate', handleTime)
      video.removeEventListener('ended', handleEnded)
    }
  }, [requestFinish])

  useEffect(() => {
    if (started) return

    const begin = () => {
      setStarted(true)
      const video = videoRef.current
      if (video) {
        video.play().catch(() => {
          // Autoplay blocked (rare for muted video) — fall through to the
          // finish state so the visitor isn't stuck on a frozen frame.
          requestFinish()
        })
      }
    }

    const onWheel = () => begin()
    const onTouch = () => begin()
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Enter'].includes(e.key)) begin()
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('keydown', onKey)
    }
  }, [started, requestFinish])

  return (
    <div className="fixed inset-0 z-50 bg-[#120A06]">
      <video
        ref={videoRef}
        src={startVideo}
        poster={startPoster}
        muted
        playsInline
        preload="auto"
        className="h-full w-full object-cover"
      />

      {/* Progress hairline */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/10">
        <div
          className="h-full bg-[#E3B872] transition-[width] duration-100 ease-linear"
          style={{ width: `${started ? progress * 100 : 0}%` }}
        />
      </div>

      {/* Scroll-to-begin cue */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 transition-opacity duration-700 ${
          started ? 'opacity-0' : ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span
          className="font-sans text-[11px] uppercase tracking-[0.35em] text-white"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.85), 0 1px 12px rgba(0,0,0,0.5)' }}
        >
          Scroll to begin
        </span>
        <span
          className="h-8 w-[1px] animate-pulse bg-white"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.85))' }}
        />
      </div>

      {/* Skip affordance — reads "Loading…" if tapped before the home
          page's art has finished preloading, so it can't hand off early. */}
      <button
        type="button"
        onClick={requestFinish}
        disabled={pendingFinish && !assetsReady}
        className="absolute right-5 top-5 font-sans text-[11px] uppercase tracking-[0.25em] text-white/90 transition-colors hover:text-white disabled:cursor-wait disabled:opacity-70 sm:right-8 sm:top-8"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.85), 0 1px 12px rgba(0,0,0,0.5)' }}
      >
        {pendingFinish && !assetsReady ? 'Loading…' : 'Skip'}
      </button>
    </div>
  )
}
