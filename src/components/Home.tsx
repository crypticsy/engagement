import Hero from '@/components/sections/Hero'
import Welcome from '@/components/sections/Welcome'
import Events from '@/components/sections/Events'
import Venue from '@/components/sections/Venue'
import MandalaDivider from '@/components/sections/MandalaDivider'
import Rsvp from '@/components/sections/Rsvp'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-[#FBF3E7]">
      <Hero />
      <Welcome />
      <Events />
      <Venue />
      <Rsvp />
      <Footer />
      <MandalaDivider />
    </main>
  )
}
