import { couple, weddingDate } from '@/config/wedding'

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 border-t border-[#E4D2B4] bg-[#FBF3E7] px-6 py-14 text-center sm:py-16">
      <span className="font-serif text-2xl text-[#7C2233]">
        {couple.groom[0]} &amp; {couple.bride[0]}
      </span>
      <span className="font-sans text-[11px] uppercase tracking-[0.35em] text-[#7A5C48]">
        {weddingDate.display}
      </span>
      <span className="font-sans text-xs text-[#A8455A]">{couple.hashtag}</span>
    </footer>
  )
}
