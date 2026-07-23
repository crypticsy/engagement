import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// On Android, the very first downward swipe past Hero is also the swipe
// that collapses the browser's address bar, firing a resize event mid-
// gesture. Without this, ScrollTrigger reflexively refreshes and recalcs
// every scrub trigger's start/end at that instant, which desyncs its
// internal scroll progress from the touch that's still in flight — the
// page reads as stuck right at the Hero boundary. `ignoreMobileResize` is
// GSAP's documented fix: it ignores resize events caused only by mobile
// viewport/URL-bar changes (real orientation/layout changes still refresh).
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }
