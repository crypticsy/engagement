import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { asset } from '@/lib/asset'
import { venue } from '@/config/wedding'

export default function Venue() {
  const mandapRef = useRef<HTMLImageElement>(null)

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

  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(venue.mapsQuery)}&output=embed`

  return (
    <section className="relative overflow-hidden bg-[#F5E9D8] px-6 pb-24 pt-6 sm:px-6 sm:pb-28 lg:pb-32">
      <SectionLabel eyebrow="Where to find us" title="The Venue" tamil="இடம்" />

      <Reveal className="relative mx-auto mt-12 max-w-3xl sm:mt-14">
        <img
          ref={mandapRef}
          src={asset('/mandap.png')}
          alt="Decorated engagement mandapam"
          draggable={false}
          className="mx-auto w-full max-w-lg"
        />
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-3 text-center">
        <h3 className="font-serif text-2xl text-[#2A1B12]">{venue.name}</h3>
        <p className="font-sans text-sm text-[#6B5A4E]">{venue.line1}</p>
        <p className="font-sans text-sm text-[#6B5A4E]">{venue.line2}</p>
        <a
          href={venue.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C08A3E] px-6 py-3 font-sans text-xs uppercase tracking-[0.25em] text-[#7C2233] transition-colors hover:bg-[#C08A3E] hover:text-[#FFFDF9]"
        >
          Get Directions
        </a>
        <p className="mt-6 max-w-md font-sans text-[13px] italic leading-relaxed text-[#7A5C48]">
          {venue.note}
        </p>
      </Reveal>

      <Reveal delay={0.25} className="mx-auto mt-12 max-w-3xl">
        <div
          className="h-56 overflow-hidden rounded-sm border border-[#E4D2B4] sm:h-80"
          style={{ boxShadow: '0 12px 28px rgba(60,40,20,0.08)' }}
        >
          <iframe
            title="Venue map"
            src={mapEmbedSrc}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'sepia(12%) saturate(85%)' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
    </section>
  )
}
