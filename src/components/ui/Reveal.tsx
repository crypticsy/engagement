import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface RevealProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  y?: number
}

/** Fades + lifts its children in once they cross into the viewport. */
export default function Reveal({ children, className = '', id, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const anim = gsap.fromTo(
      el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      },
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay, y])

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  )
}

export function killAllScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill())
}
