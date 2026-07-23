import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Reveal from '@/components/ui/Reveal'
import balcony from '@/assets/balcony.png'
import peacockAndLanterns from '@/assets/peacock and lanterns.png'
import coupleInBalcony from '@/assets/couple in balcony.png'
import { closing, couple } from '@/config/wedding'

/**
 * Closing scene — balcony.png sets the lit archway, peacock-and-lanterns.png
 * and couple-in-balcony.png stack on top as a bottom-anchored foreground
 * (they were painted to interlock: peacock left, couple centre, lanterns
 * right), so the couple reads as standing on the balcony we're framing.
 */
export default function Closing() {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const anim = gsap.to(sceneRef.current, {
      scale: 1.06,
      duration: 22,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => {
      anim.kill()
    }
  }, [])

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#0E2A3A]">
      <div ref={sceneRef} className="absolute inset-0 h-full w-full">
        <img
          src={balcony}
          alt="Lantern-lit balcony overlooking the palms"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={peacockAndLanterns}
          alt=""
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={coupleInBalcony}
          alt={`${couple.groomFull} and ${couple.brideFull}`}
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-36"
        style={{ background: 'linear-gradient(180deg, #F5E9D8 0%, transparent 100%)' }}
      />

      <Reveal className="absolute inset-x-0 top-[25%] mx-auto flex max-w-md flex-col items-center gap-3 px-6 text-center sm:gap-4">
        <span className="font-kannada text-[clamp(1rem,2.8vw,1.25rem)] text-[#7C2233]">ಶ್ರೀ</span>
        <h2 className="font-serif text-[clamp(1.4rem,4.5vw,2.15rem)] leading-snug text-[#2A1B12]">
          {closing.title}
        </h2>
        <p className="max-w-sm font-sans text-[clamp(0.85rem,2.2vw,1rem)] leading-relaxed text-[#3A2617]">
          {closing.text}
        </p>
      </Reveal>
    </section>
  )
}
