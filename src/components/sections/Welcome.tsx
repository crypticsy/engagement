import Reveal from '@/components/ui/Reveal'
import Mandala from '@/components/scene/Mandala'
import { couple, hosts, weddingDate } from '@/config/wedding'

/**
 * The invitation letter itself — styled after the cream "paper sheet" card
 * in reference/from-me-to-you (ruled lines, ink text, soft drop shadow)
 * rather than a hard-edged panel.
 */
export default function Welcome() {
  return (
    <section className="relative overflow-hidden bg-[#FBF3E7] px-6 py-24 sm:px-6 sm:py-28 lg:py-32">
      <Mandala
        color="#C08A3E"
        className="pointer-events-none absolute -right-24 -top-24 w-64 h-64 sm:-right-40 sm:-top-40 sm:w-[520px] sm:h-[520px] opacity-[0.08]"
      />
      <Mandala
        color="#7C2233"
        className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 sm:-bottom-32 sm:-left-32 sm:w-[420px] sm:h-[420px] opacity-[0.06]"
      />

      <Reveal className="relative mx-auto max-w-xl">
        <div
          className="relative flex flex-col overflow-hidden rounded-sm border border-[#E4D2B4] bg-[#FFFDF9] px-6 py-12 sm:px-14 sm:py-16"
          style={{ boxShadow: '0 2px 6px rgba(60,40,20,0.06), 0 18px 40px rgba(60,40,20,0.10), 5px 6px 0 #EADFC8' }}
        >
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#C08A3E] via-[#E3B872] to-[#7C2233]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent, transparent 34px, #EFE2CC 34px, #EFE2CC 35px)',
              backgroundPositionY: '92px',
            }}
          />

          <div className="relative flex flex-col items-center gap-7 text-center">
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#A8455A]">
              With hearts full of joy
            </span>

            <p className="font-serif text-xl italic leading-relaxed text-[#3A2617] sm:text-2xl">
              {hosts.brideParents} &amp; {hosts.groomParents}
              <br />
              request the honour of your presence
              <br />
              at the engagement of their children
            </p>

            <h3 className="font-serif text-4xl text-[#2A1B12] sm:text-5xl">
              {couple.bride} <span className="text-[#C08A3E]">&amp;</span> {couple.groom}
            </h3>

            <p className="max-w-sm font-sans text-[15px] leading-relaxed text-[#6B5A4E]">
              We would be delighted to have you join us as we exchange rings beneath the
              mandapam, surrounded by family, tradition, and the blessings of our elders.
            </p>

            <div className="mt-2 flex flex-col items-center gap-1">
              <span className="font-serif text-lg text-[#2A1B12]">{weddingDate.display}</span>
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#A8455A]">
                Nischayathartham {weddingDate.muhurtham}
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
