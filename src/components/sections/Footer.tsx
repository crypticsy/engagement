import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Mandala from '@/components/scene/Mandala'
import { couple, weddingDate } from '@/config/wedding'

export default function Footer() {
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
    <footer className="relative flex flex-col items-center gap-4 overflow-hidden bg-[#2A1B12] px-6 py-14 text-center sm:py-16">
      <div ref={mandalaRef} className="pointer-events-none absolute">
        <Mandala color="#E3B872" className="h-64 w-64 opacity-10 sm:h-80 sm:w-80" />
      </div>

      <span className="relative font-serif text-3xl text-[#E3B872] sm:text-4xl">
        {couple.groom[0]} &amp; {couple.bride[0]}
      </span>
      <span className="relative font-sans text-xs uppercase tracking-[0.35em] text-[#F5E9D8]/70 sm:text-sm">
        {weddingDate.display}
      </span>
      <span className="relative font-sans text-sm text-[#E3B872] sm:text-base">{couple.hashtag}</span>
    </footer>
  )
}
