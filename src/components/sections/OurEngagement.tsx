import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Reveal from '@/components/ui/Reveal'
import pond from '@/assets/pond.png'
import lanternAndLotus from '@/assets/lantern and lotus.png'
import { engagement, weddingDate } from '@/config/wedding'

/**
 * "Save the Date" moment — pond.png sets a still-water backdrop and
 * lantern-and-lotus.png frames the card as a floating ring, echoing the
 * mandap/temple watercolor set used elsewhere.
 */
export default function OurEngagement() {
  const frameRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const anim = gsap.to(frameRef.current, {
      scale: 1.04,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => {
      anim.kill()
    }
  }, [])

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0E3A3F] px-6 py-24 sm:px-6 sm:py-28 lg:py-32">
      <img
        src={pond}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />

      <img
        ref={frameRef}
        src={lanternAndLotus}
        alt=""
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />

      {/* Fade into the paper section that follows so the water reads as a
          moment, not a hard-edged block. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32"
        style={{ background: 'linear-gradient(0deg, #F5E9D8 0%, transparent 100%)' }}
      />

      <Reveal className="relative flex flex-col items-center gap-7 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#E3B872] sm:text-sm">
            {engagement.eyebrow}
          </span>
          <span className="font-kannada text-xl text-[#F5E9D8]/80 sm:text-2xl">ನಿಶ್ಚಿತಾರ್ಥ</span>
        </div>

        <h2 className="font-serif text-5xl text-[#FFFDF9] sm:text-6xl">{engagement.title}</h2>

        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-[#E3B872]/60 sm:w-12" />
          <span className="font-serif text-3xl text-[#F5E9D8] sm:text-4xl">{weddingDate.display}</span>
          <span className="h-px w-8 bg-[#E3B872]/60 sm:w-12" />
        </div>

        <p className="max-w-lg font-sans text-lg leading-relaxed text-[#F5E9D8]/85 sm:text-xl">
          {engagement.text}
        </p>
      </Reveal>
    </section>
  )
}
