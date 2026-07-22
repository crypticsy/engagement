import { useState, type FormEvent } from 'react'
import Reveal from '@/components/ui/Reveal'
import SectionLabel from '@/components/ui/SectionLabel'
import Mandala from '@/components/scene/Mandala'
import { couple, events, rsvpEndpoint } from '@/config/wedding'
import { isValidRsvpEndpoint, submitRsvp } from '@/lib/submitRsvp'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const eventOptions = events.map((e) => e.title)
const endpointMisconfigured = import.meta.env.DEV && rsvpEndpoint !== '' && !isValidRsvpEndpoint(rsvpEndpoint)

export default function Rsvp() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [guests, setGuests] = useState(1)
  const [chosenEvents, setChosenEvents] = useState<string[]>(eventOptions)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorReason, setErrorReason] = useState<'invalid-endpoint' | 'other'>('other')

  const toggleEvent = (title: string) => {
    setChosenEvents((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !contact.trim()) return

    setStatus('submitting')
    const result = await submitRsvp({
      name: name.trim(),
      contact: contact.trim(),
      attending,
      guests: attending === 'yes' ? guests : 0,
      events: attending === 'yes' ? chosenEvents : [],
      message: message.trim(),
    })
    if (result.ok) {
      setStatus('success')
    } else {
      setErrorReason(result.reason === 'invalid-endpoint' ? 'invalid-endpoint' : 'other')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#FBF3E7] px-6 py-28 text-center sm:px-6 sm:py-32">
        <Mandala
          color="#C08A3E"
          className="pointer-events-none absolute w-72 h-72 opacity-15 sm:w-[420px] sm:h-[420px]"
        />
        <Reveal className="relative flex flex-col items-center gap-5">
          <span className="font-kannada text-2xl text-[#7C2233]">ಧನ್ಯವಾದಗಳು</span>
          <h2 className="font-serif text-3xl text-[#2A1B12] sm:text-4xl">Thank you, {name.split(' ')[0]}</h2>
          <p className="max-w-sm font-sans text-sm leading-relaxed text-[#6B5A4E]">
            {attending === 'yes'
              ? "Your RSVP has been received with joy — we can't wait to celebrate with you."
              : "We're sorry you can't make it, but thank you for letting us know. You'll be with us in spirit."}
          </p>
          <span className="mt-2 font-sans text-xs uppercase tracking-[0.3em] text-[#A8455A]">
            {couple.hashtag}
          </span>
        </Reveal>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden bg-[#FBF3E7] px-6 py-24 sm:px-6 sm:py-28 lg:py-32">
      <Mandala
        color="#C08A3E"
        className="pointer-events-none absolute -left-20 -top-16 w-56 h-56 opacity-10 sm:-left-32 sm:-top-24 sm:w-[480px] sm:h-[480px] sm:opacity-[0.12]"
      />

      <SectionLabel eyebrow="Kindly respond" title="Will You Join Us?" kannada="ಹಾಜರಾತಿ ಖಚಿತಪಡಿಸಿ" />

      <Reveal className="relative mx-auto mt-12 max-w-lg sm:mt-14">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 rounded-sm border border-[#E4D2B4] bg-[#FFFDF9] px-6 py-12 sm:px-10 sm:py-12"
          style={{ boxShadow: '0 12px 28px rgba(60,40,20,0.08)' }}
        >
          <label className="flex flex-col gap-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A8455A]">Full name</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="rounded-sm border border-[#E4D2B4] bg-[#FBF3E7] px-4 py-3 font-sans text-base text-[#2A1B12] outline-none placeholder:text-[#B79A87] focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E]/30 sm:text-sm"
            />
          </label>

          <label className="flex flex-col gap-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A8455A]">
              Email or phone
            </span>
            <input
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="So we can reach you"
              className="rounded-sm border border-[#E4D2B4] bg-[#FBF3E7] px-4 py-3 font-sans text-base text-[#2A1B12] outline-none placeholder:text-[#B79A87] focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E]/30 sm:text-sm"
            />
          </label>

          <div className="flex flex-col gap-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A8455A]">
              Will you attend?
            </span>
            <div className="grid grid-cols-2 gap-3">
              {(['yes', 'no'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAttending(option)}
                  className={`rounded-sm border px-3 py-3 font-sans text-xs uppercase tracking-[0.1em] transition-colors sm:text-sm sm:tracking-[0.15em] ${
                    attending === option
                      ? 'border-[#7C2233] bg-[#7C2233] text-[#FFFDF9]'
                      : 'border-[#E4D2B4] bg-transparent text-[#6B5A4E] hover:border-[#C08A3E]'
                  }`}
                >
                  {option === 'yes' ? 'Joyfully accept' : 'Regretfully decline'}
                </button>
              ))}
            </div>
          </div>

          {attending === 'yes' && (
            <>
              <label className="flex flex-col gap-2.5">
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A8455A]">
                  Number of guests (incl. you)
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={guests}
                  onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
                  className="rounded-sm border border-[#E4D2B4] bg-[#FBF3E7] px-4 py-3 font-sans text-base text-[#2A1B12] outline-none focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E]/30 sm:text-sm"
                />
              </label>

              <div className="flex flex-col gap-2.5">
                <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A8455A]">
                  Which celebrations?
                </span>
                <div className="flex flex-col gap-1">
                  {eventOptions.map((title) => (
                    <label
                      key={title}
                      className="flex items-center gap-3 py-1.5 font-sans text-sm text-[#3A2617]"
                    >
                      <input
                        type="checkbox"
                        checked={chosenEvents.includes(title)}
                        onChange={() => toggleEvent(title)}
                        className="h-5 w-5 accent-[#7C2233]"
                      />
                      {title}
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <label className="flex flex-col gap-2.5">
            <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#A8455A]">
              A note for us (optional)
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Song requests, dietary notes, well-wishes…"
              className="resize-none rounded-sm border border-[#E4D2B4] bg-[#FBF3E7] px-4 py-3 font-sans text-base text-[#2A1B12] outline-none placeholder:text-[#B79A87] focus:border-[#C08A3E] focus:ring-1 focus:ring-[#C08A3E]/30 sm:text-sm"
            />
          </label>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-2 rounded-full bg-[#7C2233] px-6 py-3.5 font-sans text-xs uppercase tracking-[0.3em] text-[#FFFDF9] transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {status === 'submitting' ? 'Sending…' : 'Send RSVP'}
          </button>

          {status === 'error' && errorReason === 'invalid-endpoint' && (
            <p className="text-center font-sans text-xs text-[#A8455A]">
              This form isn't connected to a Sheet yet — please reach us directly below instead.
            </p>
          )}

          {status === 'error' && errorReason === 'other' && (
            <p className="text-center font-sans text-xs text-[#A8455A]">
              Something went wrong sending that — please try again, or reach us directly below.
            </p>
          )}

          {import.meta.env.DEV && !rsvpEndpoint && (
            <p className="text-center font-sans text-[11px] text-[#7A5C48]/80">
              Dev note: set VITE_RSVP_SCRIPT_URL in .env to connect this form to your Google Sheet.
            </p>
          )}

          {endpointMisconfigured && (
            <p className="text-center font-sans text-[11px] text-[#A8455A]">
              Dev note: VITE_RSVP_SCRIPT_URL looks like the Sheet's own share link, not a deployed
              Apps Script /exec URL — submissions will silently go nowhere until that's fixed. See
              README.md.
            </p>
          )}
        </form>
      </Reveal>
    </section>
  )
}
