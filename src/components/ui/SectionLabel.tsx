interface SectionLabelProps {
  eyebrow: string
  title: string
  kannada?: string
  className?: string
}

export default function SectionLabel({ eyebrow, title, kannada, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      <span className="font-sans text-xs uppercase tracking-[0.4em] text-[#A8455A] sm:text-sm">{eyebrow}</span>
      <h2 className="font-serif text-5xl text-[#2A1B12] sm:text-6xl">{title}</h2>
      {kannada && <span className="font-kannada text-xl text-[#7A5C48] sm:text-2xl">{kannada}</span>}
      <span className="mt-1 h-[1px] w-16 bg-[#C08A3E]/50" />
    </div>
  )
}
