import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import { events } from '@/config/wedding'

export default function Events() {
  return (
    <section className="relative bg-[#F5E9D8] px-6 py-24 sm:px-6 sm:py-28 lg:py-32">
      <SectionLabel eyebrow="Save the date" title="The Celebrations" tamil="நிகழ்ச்சிகள்" />

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:mt-16 sm:grid-cols-3 sm:gap-6">
        {events.map((event, i) => (
          <Reveal key={event.id} delay={i * 0.12}>
            <div
              className="flex h-full flex-col gap-4 rounded-sm border border-[#E4D2B4] bg-[#FFFDF9] px-6 py-9 text-center sm:px-7"
              style={{ boxShadow: '0 12px 28px rgba(60,40,20,0.08)' }}
            >
              <span className="font-tamil text-base text-[#A8455A]">{event.tamil}</span>
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
          </Reveal>
        ))}
      </div>
    </section>
  )
}
