import Hero from '@/components/sections/Hero'
import Welcome from '@/components/sections/Welcome'
import Events from '@/components/sections/Events'
import Venue from '@/components/sections/Venue'
import MandalaDivider from '@/components/sections/MandalaDivider'
import Rsvp from '@/components/sections/Rsvp'
import Footer from '@/components/sections/Footer'
import WaveDivider from '@/components/scene/WaveDivider'

export default function Home() {
  return (
    <main className="bg-[#FBF3E7]">
      <Hero />
      <WaveDivider className="-mt-1 h-16 bg-[#DCEEF7] sm:h-24" />
      <Welcome />
      <Events />
      <Venue />
      <Rsvp />
      <Footer />
      <MandalaDivider />
    </main>
  )
}
