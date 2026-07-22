import { rsvpEndpoint } from '@/config/wedding'

export interface RsvpPayload {
  name: string
  contact: string
  attending: 'yes' | 'no'
  guests: number
  events: string[]
  message: string
}

export type RsvpResult =
  | { ok: true }
  | { ok: false; reason: 'missing-endpoint' | 'invalid-endpoint' | 'network' }

/**
 * A real deployment always looks like https://script.google.com/macros/s/.../exec.
 * The most common misconfiguration is pasting the Sheet's own share URL
 * (docs.google.com/spreadsheets/.../edit) instead — that page doesn't
 * accept form submissions, but a no-cors POST to it won't throw either, so
 * it silently "succeeds" while writing nothing. Exported so the form can
 * warn about this before the guest ever submits, not just after.
 */
export function isValidRsvpEndpoint(url: string): boolean {
  return /^https:\/\/script\.google(usercontent)?\.com\//.test(url)
}

/**
 * Sends an RSVP to the Google Sheet behind `rsvpEndpoint`. That endpoint is
 * a Google Apps Script Web App (see scripts/google-apps-script.gs) — a
 * deployed script's /exec URL, NOT the Sheet's own docs.google.com link.
 */
export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResult> {
  if (!rsvpEndpoint) {
    return { ok: false, reason: 'missing-endpoint' }
  }

  if (!isValidRsvpEndpoint(rsvpEndpoint)) {
    return { ok: false, reason: 'invalid-endpoint' }
  }

  const body = new FormData()
  body.append('name', payload.name)
  body.append('contact', payload.contact)
  body.append('attending', payload.attending)
  body.append('guests', String(payload.guests))
  body.append('events', payload.events.join(', '))
  body.append('message', payload.message)
  body.append('submittedAt', new Date().toISOString())

  try {
    // Apps Script web apps don't reliably send CORS headers back, so the
    // request goes out in no-cors mode. The response is opaque to us, but
    // the row still lands in the sheet — a thrown fetch is the only signal
    // we can trust, so a caught error is the only case we report as failed.
    await fetch(rsvpEndpoint, { method: 'POST', mode: 'no-cors', body })
    return { ok: true }
  } catch {
    return { ok: false, reason: 'network' }
  }
}
