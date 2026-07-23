import Hero from '@/components/sections/Hero'
import OurEngagement from '@/components/sections/OurEngagement'
import Venue from '@/components/sections/Venue'
import Closing from '@/components/sections/Closing'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-[#FBF3E7]">
      <Hero />
      <OurEngagement />
      <Venue />
      <Closing />
      <Footer />
    </main>
  )
}
