interface SectionLabelProps {
  eyebrow: string
  title: string
  tamil?: string
  className?: string
}

export default function SectionLabel({ eyebrow, title, tamil, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#A8455A]">{eyebrow}</span>
      <h2 className="font-serif text-4xl text-[#2A1B12] sm:text-5xl">{title}</h2>
      {tamil && <span className="font-tamil text-lg text-[#7A5C48]">{tamil}</span>}
      <span className="mt-1 h-[1px] w-16 bg-[#C08A3E]/50" />
    </div>
  )
}
