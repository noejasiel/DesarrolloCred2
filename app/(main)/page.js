// app/page.js
import Hero from '../sections/Hero'
import Features from '../sections/Features'
import Layers from '../sections/Layers'
import ProductPitch from '../../components/ProductPitch'
import { PricingCard } from '../../components/Pricing'
import FAQSection from '../../components/FAQSection'
import LayerLast from '../sections/LayerLast'
import Footer from '../sections/Footer'
import ContactForm from '../sections/Contact'
import Seguridad from '../../components/BannerSecurity'
import Testimonials from '../../components/Testimonials'
import CreditCards from '../../components/CreditCards'


export default function HomePage() {
  return (
    <main className='h-screen'>
      <Hero />
      <ProductPitch />
      <Layers />
      <CreditCards />
  {/*      <PricingCard />  */}
      <Seguridad />
      <Testimonials />
      <FAQSection />
      <ContactForm />
      <LayerLast />
      <Footer />

      
    </main>
  )
}
