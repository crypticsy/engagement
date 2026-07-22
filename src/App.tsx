import { useState, useCallback } from 'react'
import IntroVideo from '@/components/intro/IntroVideo'
import PaperTransition from '@/components/intro/PaperTransition'
import Home from '@/components/Home'
import { useLenis } from '@/lib/useLenis'
import { theme } from '@/config/wedding'

type Phase = 'intro' | 'home'

export default function App() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [transitioning, setTransitioning] = useState(false)

  // Smooth scroll only matters once the home page is live.
  useLenis(phase === 'home')

  const handleIntroFinished = useCallback(() => setTransitioning(true), [])
  const handleMidpoint = useCallback(() => setPhase('home'), [])
  const handleComplete = useCallback(() => setTransitioning(false), [])

  return (
    <>
      {phase === 'intro' && <IntroVideo onFinished={handleIntroFinished} />}
      {phase === 'home' && <Home />}

      <PaperTransition
        active={transitioning}
        paperColor={theme.paper}
        onMidpoint={handleMidpoint}
        onComplete={handleComplete}
      />
    </>
  )
}
