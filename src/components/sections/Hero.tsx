import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import sky from '@/assets/sky.png'
import cloud1 from '@/assets/cloud_1.png'
import cloud2 from '@/assets/cloud_2.png'
import cloud3 from '@/assets/cloud_3.png'
import templeWithTree from '@/assets/temple-with-tree.png'
import { couple, hero } from '@/config/wedding'

/**
 * Recreates public/scene.png as a layered parallax composition — sky.png at
 * the back, drifting cloud_1/2/3.png, and temple with tree.png anchored to
 * the horizon — rather than using the flattened reference PNG directly.
 */
export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const skyRef = useRef<HTMLImageElement>(null)
  const cloud1Ref = useRef<HTMLImageElement>(null)
  const cloud2Ref = useRef<HTMLImageElement>(null)
  const cloud3Ref = useRef<HTMLImageElement>(null)
  const templeRef = useRef<HTMLImageElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap
        .timeline({ delay: 0.15 })
        .from(skyRef.current, { opacity: 0, duration: 1.2, ease: 'power2.out' })
        .from(templeRef.current, { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
        .from(
          titleRef.current?.children ?? [],
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          '-=0.5',
        )

      // Ambient cloud drift, independent of scroll — each cloud floats a
      // noticeably different distance/speed so the sky reads as alive
      // rather than static art.
      ;[cloud1Ref, cloud2Ref, cloud3Ref].forEach((ref, i) => {
        gsap.to(ref.current, {
          x: `+=${70 + i * 30}`,
          y: `+=${10 + i * 4}`,
          duration: 16 + i * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })

      // Scroll parallax — sky/clouds drift slower than the temple, temple
      // slower than the page, so depth reads as the hero scrolls away.
      gsap.to(skyRef.current, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to([cloud1Ref.current, cloud2Ref.current, cloud3Ref.current], {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(templeRef.current, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(titleRef.current, {
        yPercent: 40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: '60% top', scrub: true },
      })
    }, rootRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section ref={rootRef} className="relative h-svh w-full overflow-hidden bg-[#DCEEF7]">
      <img
        ref={skyRef}
        src={sky}
        alt=""
        draggable={false}
        className="absolute inset-0 h-[120%] w-full object-cover object-top"
      />

      <img
        ref={cloud1Ref}
        src={cloud1}
        alt=""
        draggable={false}
        className="absolute left-[-4%] top-[12%] w-[38%] max-w-105 opacity-90 mix-blend-multiply"
      />
      <img
        ref={cloud2Ref}
        src={cloud2}
        alt=""
        draggable={false}
        className="absolute right-[-6%] top-[22%] w-[34%] max-w-95 opacity-80 mix-blend-multiply"
      />
      <img
        ref={cloud3Ref}
        src={cloud3}
        alt=""
        draggable={false}
        className="absolute left-[18%] top-[6%] w-[24%] max-w-70 opacity-70 mix-blend-multiply"
      />

      <img
        ref={templeRef}
        src={templeWithTree}
        alt="Temple gopuram amid palm trees"
        draggable={false}
        className="absolute inset-x-0 bottom-0 h-[62%] w-full object-cover object-bottom sm:h-[70%]"
      />

      {/* Soft vignette so the title reads over the artwork */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(20,30,25,0.08) 0%, transparent 30%, transparent 55%, rgba(20,20,15,0.28) 100%)' }}
      />

      <div
        ref={titleRef}
        className="pointer-events-none absolute inset-x-0 top-[15%] flex flex-col items-center gap-4 px-6 text-center sm:top-[13%] sm:gap-5"
      >
        <span className="font-kannada text-lg text-[#5B4430]/80 sm:text-xl">{couple.kannadaLine}</span>
        <h1 className="font-serif text-[clamp(1.9rem,7vw,3.25rem)] leading-[1.05] text-[#3A2617]">
          {hero.headline}
        </h1>
        <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#5B4430]/70 sm:text-xs">
          {hero.subheading}
        </span>
        <h1 className="font-serif text-[clamp(2rem,8vw,4rem)] leading-[0.95] text-[#3A2617] pt-2">
          {couple.groom}
          <span className="mx-2 italic text-[#C08A3E] sm:mx-5">&amp;</span>
          {couple.bride}
        </h1>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-2">
        <span
          className="font-sans text-[10px] uppercase tracking-[0.35em] text-white"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.85), 0 1px 12px rgba(0,0,0,0.5)' }}
        >
          Scroll
        </span>
        <span
          className="h-6 w-px animate-pulse bg-white"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.85))' }}
        />
      </div>
    </section>
  )
}
