import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import mandap from '@/assets/mandap.png'
import together from '@/assets/together.png'
import { couple, venue } from '@/config/wedding'

export default function Venue() {
  const mandapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const anim = gsap.to(mandapRef.current, {
      y: -14,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    return () => {
      anim.kill()
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#F5E9D8] px-6 pb-24 pt-24 sm:px-6 sm:pb-28 sm:pt-28 lg:pb-32 lg:pt-32">
      <SectionLabel eyebrow="Where to find us" title={venue.title} kannada="ಸ್ಥಳ" />

      <Reveal className="relative mx-auto mt-12 max-w-3xl sm:mt-14">
        <div ref={mandapRef} className="relative mx-auto w-full max-w-lg">
          <img
            src={mandap}
            alt="Decorated engagement mandapam"
            draggable={false}
            className="w-full"
          />
          <img
            src={together}
            alt={`${couple.groomFull} and ${couple.brideFull} standing in the mandap`}
            draggable={false}
            className="pointer-events-none absolute bottom-[9%] left-1/2 h-[46%] w-auto -translate-x-1/2 object-contain"
          />
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-3.5 text-center">
        <h3 className="font-serif text-3xl text-[#2A1B12] sm:text-4xl">{venue.name}</h3>
        {venue.addressLines.map((line) => (
          <p key={line} className="font-sans text-base text-[#6B5A4E] sm:text-lg">
            {line}
          </p>
        ))}
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C08A3E] px-6 py-3 font-sans text-sm uppercase tracking-[0.25em] text-[#7C2233] transition-colors hover:bg-[#C08A3E] hover:text-[#FFFDF9]"
        >
          Get Directions
        </a>
        <div className="mt-6 flex max-w-md flex-col items-center gap-2">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#A8455A]">Note</span>
          <p className="font-sans text-base italic leading-relaxed text-[#7A5C48] sm:text-lg">{venue.note}</p>
        </div>
      </Reveal>

      <Reveal delay={0.25} className="mx-auto mt-12 max-w-3xl">
        <div
          className="relative h-56 overflow-hidden rounded-sm border border-[#E4D2B4] sm:h-80"
          style={{ boxShadow: '0 12px 28px rgba(60,40,20,0.08)' }}
        >
          <iframe
            title="Venue map"
            src={venue.mapsEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          {/* Same warm/muted tint as the old `filter: sepia()` on the
              iframe itself, but as a blend overlay instead — a CSS filter
              forces GPU compositing of the (cross-origin) iframe, which is
              a known Android Chrome bug that renders the map blank. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: '#C08A3E', opacity: 0.1, mixBlendMode: 'multiply' }}
          />
        </div>
      </Reveal>
    </section>
  )
}
