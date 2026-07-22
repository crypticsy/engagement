import waves from '@/assets/waves.png'

interface WaveDividerProps {
  flip?: boolean
  className?: string
}

/**
 * waves.png as a full-bleed section seam. Flips vertically so the
 * same asset can close a section from above or introduce one from below.
 */
export default function WaveDivider({ flip = false, className = '' }: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none relative w-full select-none overflow-hidden ${className}`}
      aria-hidden
    >
      <img
        src={waves}
        alt=""
        draggable={false}
        className="h-full w-full object-cover"
        style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      />
    </div>
  )
}
