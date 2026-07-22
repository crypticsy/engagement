interface MandalaProps {
  /** Tailwind classes — must include sizing (w-, h-) and any opacity/position utilities. */
  className?: string
  color?: string
  petals?: number
}

/**
 * Hand-built radial mandala motif (no source asset exists for this — the
 * reference folders only ship temple/mandap/wave art — so it's generated as
 * layered SVG rings instead of a raster import). Sized purely through
 * `className` (w-, h- utilities) rather than px props so it scales
 * responsively instead of overflowing small viewports.
 */
export default function Mandala({ className = '', color = '#C08A3E', petals = 16 }: MandalaProps) {
  const petalArray = Array.from({ length: petals })
  const innerPetalArray = Array.from({ length: petals / 2 })

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden
    >
      <g fill="none" stroke={color}>
        {/* Outer ring of petals */}
        {petalArray.map((_, i) => (
          <path
            key={`outer-${i}`}
            d="M100 18 C 112 40, 112 60, 100 76 C 88 60, 88 40, 100 18 Z"
            strokeWidth={0.6}
            opacity={0.55}
            transform={`rotate(${(360 / petals) * i} 100 100)`}
          />
        ))}

        {/* Inner ring of petals, offset and smaller */}
        {innerPetalArray.map((_, i) => (
          <path
            key={`inner-${i}`}
            d="M100 46 C 108 58, 108 70, 100 80 C 92 70, 92 58, 100 46 Z"
            strokeWidth={0.6}
            opacity={0.7}
            transform={`rotate(${(360 / (petals / 2)) * i + 360 / petals} 100 100)`}
          />
        ))}

        {/* Concentric rings */}
        <circle cx="100" cy="100" r="88" strokeWidth={0.4} opacity={0.35} />
        <circle cx="100" cy="100" r="76" strokeWidth={0.5} opacity={0.45} />
        <circle cx="100" cy="100" r="46" strokeWidth={0.5} opacity={0.5} />
        <circle cx="100" cy="100" r="18" strokeWidth={0.8} opacity={0.7} />

        {/* Radial ticks between rings */}
        {petalArray.map((_, i) => (
          <line
            key={`tick-${i}`}
            x1="100"
            y1="12"
            x2="100"
            y2="20"
            strokeWidth={0.5}
            opacity={0.4}
            transform={`rotate(${(360 / petals) * i} 100 100)`}
          />
        ))}

        {/* Center bindu */}
        <circle cx="100" cy="100" r="4" fill={color} opacity={0.8} />
      </g>
    </svg>
  )
}
