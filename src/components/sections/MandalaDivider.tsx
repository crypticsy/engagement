import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Mandala from '@/components/scene/Mandala'
import Reveal from '@/components/ui/Reveal'

export default function MandalaDivider() {
  const mandalaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const anim = gsap.to(mandalaRef.current, {
      rotate: 360,
      duration: 90,
      repeat: -1,
      ease: 'none',
    })
    return () => {
      anim.kill()
    }
  }, [])

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#FBF3E7] px-6 py-24 sm:px-6 sm:py-28 lg:py-32">
      <div ref={mandalaRef} className="pointer-events-none absolute">
        <Mandala color="#7C2233" className="w-64 h-64 opacity-15 sm:w-80 sm:h-80 sm:opacity-20 lg:w-85 lg:h-85" />
      </div>

      <Reveal className="relative flex flex-col items-center gap-4 text-center">
        <span className="font-tamil text-2xl text-[#7C2233]">ஸ்ரீ</span>
        <p className="max-w-sm font-serif text-xl italic leading-relaxed text-[#3A2617]">
          "May this new bond be blessed with the warmth of family, the strength of tradition,
          and a lifetime of togetherness ahead."
        </p>
      </Reveal>
    </section>
  )
}
