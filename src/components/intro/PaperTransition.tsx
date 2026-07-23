// ─── Paper Distortion Transition ──────────────────────────────────────────
// WebGL scene-change effect styled after a sheet of paper tearing away,
// centre-out, to reveal the page underneath. Structurally mirrors the
// "burn" transition pattern from reference/betweenPages (same shader-driven
// wipe + onMidpoint/onComplete lifecycle) but re-skinned: fire → torn paper
// with a lit deckle edge and a soft under-curl shadow instead of flame.

import { useEffect, useRef } from 'react'

const VERT = `
  attribute vec2 a_pos;
  void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`

const FRAG = `
  precision mediump float;
  uniform vec2  u_res;
  uniform float u_progress;
  uniform float u_time;
  uniform vec3  u_paperColor;   // destination page background color
  uniform vec3  u_edgeShadow;   // shadow under the curling/torn edge
  uniform vec3  u_edgeLight;    // lit ivory rim where the tear catches light

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),                  hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.15; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_res;

    // Aspect-corrected, centred coordinates so both the radial sweep and
    // the noise sampled from it stay circular/isotropic instead of
    // stretching into an ellipse on tall/wide viewports.
    float aspect = u_res.x / u_res.y;
    vec2 centered = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    float maxDist = length(vec2(aspect * 0.5, 0.5));
    float dist = length(centered) / maxDist;

    // Deckled, irregular edge — layered noise sampled isotropically (equal
    // frequency in x/y) so the ragged tear reads as random all the way
    // around the growing circle, not just rippling along one axis.
    vec2 nUv = centered + vec2(0.5);
    float n1 = fbm(nUv * 3.4 + vec2(u_time * 0.05, u_time * 0.035));
    float n2 = fbm(nUv * 8.0 - vec2(u_time * 0.04, u_time * 0.06));
    float tear = n1 * 0.65 + n2 * 0.35;

    // Bias the sweep centre → out: the tear starts at the middle of the
    // screen and spreads toward the edges, corners last.
    float bias = dist * 0.55;
    float combined = clamp(tear * 0.6 + bias, 0.0, 1.0);

    float thr   = u_progress * 1.5 - 0.25;
    float edgeW = 0.05;

    if (combined < thr - edgeW) {
      // Fully torn away → destination page color, with faint paper grain
      float grain = fbm(uv * 40.0) * 0.035 - 0.0175;
      gl_FragColor = vec4(u_paperColor + grain, 1.0);

    } else if (combined < thr) {
      // Torn edge — lit deckle rim fading into an under-curl shadow, then
      // settling into the destination paper color.
      float t = (combined - (thr - edgeW)) / edgeW; // 0 = inner, 1 = outer
      vec3 rim = mix(u_edgeLight, u_edgeShadow, smoothstep(0.0, 0.45, t));
      vec3 col = mix(rim, u_paperColor, pow(t, 2.2));

      // Fine fiber flecks along the torn edge
      float fleck = step(0.93, fbm(uv * 90.0 + u_time * 0.1));
      col = mix(col, u_edgeShadow, fleck * (1.0 - t) * 0.4);

      gl_FragColor = vec4(col, 1.0);

    } else {
      // Not yet reached — transparent, previous screen shows through
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
  }
`

const TEAR_MS = 1250
const HOLD_MS = 90

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ]
}

interface Props {
  active: boolean
  /** CSS hex color of the destination screen's page background */
  paperColor: string
  edgeShadow?: string
  edgeLight?: string
  /** Called once the screen is fully covered — swap the underlying screen here */
  onMidpoint: () => void
  /** Called when the transition has fully finished */
  onComplete: () => void
}

export default function PaperTransition({
  active,
  paperColor,
  edgeShadow = '#4A2E1E',
  edgeLight = '#FDEFD8',
  onMidpoint,
  onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onMidpointRef = useRef(onMidpoint)
  const onCompleteRef = useRef(onComplete)
  const rafRef = useRef<number>(0)

  onMidpointRef.current = onMidpoint
  onCompleteRef.current = onComplete

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) {
      onMidpointRef.current()
      onCompleteRef.current()
      return
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, -1, 1, 1, -1, 1]),
      gl.STATIC_DRAW,
    )
    const posLoc = gl.getAttribLocation(prog, 'a_pos')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const uRes = gl.getUniformLocation(prog, 'u_res')
    const uProgress = gl.getUniformLocation(prog, 'u_progress')
    const uTime = gl.getUniformLocation(prog, 'u_time')
    const uPaperColor = gl.getUniformLocation(prog, 'u_paperColor')
    const uEdgeShadow = gl.getUniformLocation(prog, 'u_edgeShadow')
    const uEdgeLight = gl.getUniformLocation(prog, 'u_edgeLight')

    gl.uniform3f(uPaperColor, ...hexToRgb(paperColor))
    gl.uniform3f(uEdgeShadow, ...hexToRgb(edgeShadow))
    gl.uniform3f(uEdgeLight, ...hexToRgb(edgeLight))

    const total = TEAR_MS + HOLD_MS
    const start = performance.now()
    let midFired = false

    canvas.style.opacity = '1'

    const tick = (now: number) => {
      const elapsed = now - start

      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform1f(uTime, elapsed * 0.001)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      if (elapsed < TEAR_MS) {
        gl.uniform1f(uProgress, elapsed / TEAR_MS)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
      } else if (elapsed < total) {
        gl.uniform1f(uProgress, 1.0)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
        if (!midFired) {
          midFired = true
          onMidpointRef.current()
        }
      } else {
        canvas.style.opacity = '0'
        onCompleteRef.current()
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [active, paperColor, edgeShadow, edgeLight])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  )
}
