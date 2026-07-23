import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

/**
 * Wires Lenis smooth scrolling into GSAP's ticker so ScrollTrigger stays in
 * sync with the smoothed scroll position (continuity across sections is the
 * whole point — see memory: "flow together", not section-by-section polish).
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    // Lenis's whole job — easing discrete wheel deltas into inertial motion
    // — is already handled natively on touch devices, so it isn't just
    // redundant there: its raf-loop scroll-position sync fights the
    // browser's own touch-scroll animation on Android, which is what was
    // causing scrolling to stall or lock up entirely. ScrollTrigger listens
    // to native scroll events on its own and doesn't need Lenis in the loop
    // to work, so touch devices just get native scrolling instead.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [enabled])
}
