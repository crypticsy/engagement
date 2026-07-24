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

export const hero = {
  headline: 'You Are Joyfully Invited',
  subheading: 'To the Engagement Ceremony of',
} as const

export const weddingDate = {
  iso: '2026-11-22T00:00:00+05:30',
  display: '22 November 2026',
} as const

export const engagement = {
  eyebrow: 'Our Engagement',
  title: 'Save the Date',
  text: 'Join us as we celebrate the beginning of our journey together. We would be delighted to have you with us as we mark this special occasion with our family and friends.',
} as const

export const venue = {
  title: 'Venue',
  name: 'Vanitha Achuth Pai Convention Centre',
  addressLines: ['Maryhill, Konchady, Mangalore'],
  note: 'Lunch will be served at the venue following the engagement ceremony.',
  mapsUrl: 'https://maps.google.com/?q=Vanitha+Achuth+Pai+Convention+Centre+Mangaluru',
  // Google's own "Share > Embed a map" snippet for the venue, rather than
  // the undocumented `google.com/maps?q=...&output=embed` trick — that one
  // has Google's server-side UA detection redirect mobile Chrome to an
  // `intent://` deep link into the Maps app, which can't be navigated to
  // inside an iframe and shows as "Webpage not available" on Android.
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62223.72642264039!2d74.83154361598469!3d12.908820399737037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35b574fdf7391%3A0xa9e157395c5ee84f!2sVanitha%20Achuth%20Pai%20Convention%20Centre!5e0!3m2!1sen!2suk!4v1784880844841!5m2!1sen!2suk',
} as const

export const closing = {
  title: 'We Look Forward to Celebrating With You',
  text: 'Your presence and blessings will make our engagement celebration truly memorable. We look forward to sharing this special day with you.',
} as const

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
