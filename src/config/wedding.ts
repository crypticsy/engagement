// ─── Wedding content config ───────────────────────────────────────────────
// Every piece of copy on the site is driven from here. Edit this file to
// re-skin the invite for a different couple/venue without touching markup.

export const couple = {
  bride: 'Diksha',
  groom: 'Rahul',
  brideFull: 'Diksha Sharma',
  groomFull: 'Rahul Rao',
  hashtag: '#RahulAndDikshaGetEngaged',
  kannadaLine: 'ನಿಶ್ಚಿತಾರ್ಥದ ಆಹ್ವಾನ',
} as const

export const weddingDate = {
  // South Indian ceremonies are timed to an auspicious muhurtham
  iso: '2027-02-14T06:30:00+05:30',
  display: '14th February 2027',
  day: 'Sunday',
  muhurtham: '6:30 – 7:15 AM',
} as const

export const venue = {
  name: 'Shree Kadri Kalyana Mantapa',
  line1: 'Kadri Temple Road',
  line2: 'Mangalore, Karnataka 575002',
  mapsQuery: 'Kadri Kalyana Mantapa, Mangalore, Karnataka',
  mapsUrl: 'https://maps.google.com/?q=Kadri+Kalyana+Mantapa+Mangalore+Karnataka',
  note: 'Parking is available on-site. Valets will be stationed at the main gate from 5:30 AM.',
} as const

export interface WeddingEvent {
  id: string
  title: string
  kannada?: string
  date: string
  time: string
  place: string
  description: string
}

export const events: WeddingEvent[] = [
  {
    id: 'mehendi',
    title: 'Mehendi & Sangeet',
    kannada: 'ಗೋರಂಟಿ',
    date: 'Friday, 12th February',
    time: '5:00 PM onwards',
    place: 'Ocean Pearl Resort, Someshwara Beach, Mangalore',
    description:
      'An evening of henna, music and mischief — come in your brightest colours and be ready to dance.',
  },
  {
    id: 'nischayathartham',
    title: 'Nischayathartham',
    kannada: 'ನಿಶ್ಚಿತಾರ್ಥ',
    date: 'Sunday, 14th February',
    time: '6:30 – 7:15 AM',
    place: 'Shree Kadri Kalyana Mantapa',
    description:
      'Rings are exchanged at the auspicious hour beneath the mandapam, guided by our family purohit.',
  },
  {
    id: 'reception',
    title: 'Reception',
    kannada: 'ಸ್ವಾಗತ ಸಮಾರಂಭ',
    date: 'Sunday, 14th February',
    time: '7:00 – 10:00 PM',
    place: 'Shree Kadri Kalyana Mantapa — Banquet Lawn',
    description:
      'Join us for dinner under the stars as we celebrate the beginning of our story together.',
  },
]

export const hosts = {
  brideParents: 'Mr. & Mrs. Sharma',
  groomParents: 'Mr. & Mrs. Rao',
} as const

export const contacts = [
  { name: 'Deepa (Bride\'s side)', phone: '+91 98765 43210' },
  { name: 'Karthik (Groom\'s side)', phone: '+91 91234 56789' },
]

// Google Apps Script Web App URL — deploy scripts/google-apps-script.gs to a
// Google Sheet, then paste the /exec URL here or into a .env file as
// VITE_RSVP_SCRIPT_URL. See README.md for the full setup walkthrough.
export const rsvpEndpoint = import.meta.env.VITE_RSVP_SCRIPT_URL ?? ''

export const theme = {
  // Palette lifted from the "from-me-to-you" reference: warm cream paper,
  // near-black ink, muted accents — re-toned toward marigold gold + kumkum
  // maroon for a South Indian engagement ceremony.
  paper: '#FBF3E7',
  paperSoft: '#F5E9D8',
  ink: '#2A1B12',
  inkSoft: '#7A5C48',
  gold: '#C08A3E',
  goldSoft: '#E3B872',
  maroon: '#7C2233',
  maroonSoft: '#A8455A',
} as const
