import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import together from '@/assets/together.png'
import brassUrli from '@/assets/brass-urli.png'
import { couple, events } from '@/config/wedding'

export default function Events() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center bg-[#F5E9D8] px-6 py-24 sm:px-6 sm:py-28 lg:py-32">
      <div className="w-full">
        <SectionLabel eyebrow="Save the date" title="The Celebrations" kannada="ಕಾರ್ಯಕ್ರಮಗಳು" />

        <div className="mx-auto mt-6 flex justify-center">
          <img
            src={together}
            alt={`${couple.groom} and ${couple.bride}`}
            draggable={false}
            className="h-40 w-auto object-contain sm:h-56 lg:h-64"
          />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-16 sm:mt-12 sm:grid-cols-3 sm:gap-8">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.12} className="relative">
              <div
                className="flex h-full flex-col gap-4 rounded-sm border border-[#E4D2B4] bg-[#FFFDF9] px-6 pb-16 pt-9 text-center sm:px-7 sm:pb-20"
                style={{ boxShadow: '0 12px 28px rgba(60,40,20,0.08)' }}
              >
                <span className="font-kannada text-base text-[#A8455A]">{event.kannada}</span>
                <h3 className="font-serif text-2xl text-[#2A1B12]">{event.title}</h3>
                <span className="h-[1px] w-10 self-center bg-[#C08A3E]/50" />
                <p className="font-sans text-sm uppercase tracking-[0.15em] text-[#7A5C48]">
                  {event.date}
                </p>
                <p className="font-serif text-lg text-[#3A2617]">{event.time}</p>
                <p className="font-sans text-sm text-[#7A5C48]">{event.place}</p>
                <p className="mt-1 font-sans text-[13px] leading-relaxed text-[#6B5A4E]">
                  {event.description}
                </p>
              </div>
              <img
                src={brassUrli}
                alt=""
                draggable={false}
                className="pointer-events-none absolute -bottom-10 left-1/2 z-10 h-20 w-20 -translate-x-1/2 object-contain sm:h-24 sm:w-24"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
