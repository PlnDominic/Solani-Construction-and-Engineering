import type { Metadata } from 'next'
import Image from 'next/image'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Us | Solani Construction Limited',
  description: 'Learn about Solani Construction Limited - Ghana\'s premier construction specialists delivering resilient infrastructure. Founded in 2013, trusted by public and private sector clients.',
  keywords: ['about', 'construction company', 'Ghana', 'infrastructure', 'Bibiani', 'engineering'],
  alternates: {
    canonical: 'https://solaniconstruction.com/about',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solaniconstruction.com/about',
    siteName: 'Solani Construction Limited',
    title: 'About Solani Construction Limited',
    description: 'Learn about Ghana\'s premier construction specialists delivering resilient infrastructure since 2013.',
    images: [
      {
        url: 'https://solaniconstruction.com/ceo.jpg',
        width: 1200,
        height: 630,
        alt: 'Solani Construction Leadership',
      },
    ],
  },
}

const valueItems = [
  'Integrity',
  'Quality',
  'Safety',
  'Innovation',
  'Sustainability',
  'Customer Priority & Satisfaction',
  'Solution Focused Delivery',
]

const serviceItems = [
  {
    title: 'Asankragwa Midwifery Hostel',
    description:
      'Purpose-built accommodation delivering dignified, secure housing for midwifery trainees with resilient utilities and accessible communal spaces.',
    image: '/project 5.jpg',
  },
  {
    title: 'Sefwi Wiawso Training Facilities',
    description:
      'A modern vocational campus outfitted with instructional blocks and support amenities that empower skill development across the Western North Region.',
    image: '/project 7.jpg',
  },
  {
    title: 'Chirano Water System',
    description:
      'Community-scale water infrastructure integrating treatment, storage, and distribution systems to deliver reliable potable supply for local households.',
    image: '/project 8.jpg',
  },
]

const expertiseItems = [
  'Road construction and maintenance',
  'Bridge design and delivery',
  'Water and wastewater treatment systems',
  'Urban regeneration and development',
  'Renewable energy infrastructure rollouts',
  'Procurement of mining equipment and consumables',
]

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      {/* Company Overview */}
      <section className="pt-28 pb-16 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-6 border-l-4 border-orange-500 pl-6">
                Who We Are
              </h2>
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                Founded in 2013, Solani Construction & Engineering is a wholly Ghanaian-owned construction, mining support, and
                industrial supply company headquartered in Bibiani, Western North Region.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Our multidisciplinary teams deliver turnkey civil works, logistics, and procurement services that empower public and private sector
                clients to scale with confidence.
              </p>
            </div>
            <div className="bg-slate-50 p-8 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold uppercase mb-6 text-slate-900">Our Commitment</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-orange-500 font-bold">01</span>
                  <span className="text-slate-700">Quality construction that stands the test of time</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-500 font-bold">02</span>
                  <span className="text-slate-700">Sustainable practices for environmental responsibility</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-orange-500 font-bold">03</span>
                  <span className="text-slate-700">Community impact and social development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="border-l-4 border-orange-500 pl-6">
                <h2 className="text-3xl font-black uppercase mb-4">Vision</h2>
                <p className="text-slate-300 leading-relaxed">
                  To become the premier one-stop partner for mining products, industrial consumables, and construction
                  solutions throughout Ghana and the wider West African region.
                </p>
              </div>
              <div className="border-l-4 border-orange-500 pl-6">
                <h2 className="text-3xl font-black uppercase mb-4">Mission</h2>
                <p className="text-slate-300 leading-relaxed">
                  We deliver sustainable infrastructure that elevates communities today while preserving opportunity for
                  future generations. Every engagement is executed with environmental responsibility, social impact, and
                  economic value at its core—powered by meticulous logistics and on-time delivery.
                </p>
              </div>
            </div>
            <div className="bg-orange-500 p-10">
              <h3 className="text-2xl font-black uppercase mb-8 text-white">Core Values</h3>
              <ul className="space-y-5">
                {valueItems.map((item, index) => (
                  <li key={item} className="flex items-start gap-4 text-white">
                    <span className="text-2xl font-black">{String(index + 1).padStart(2, '0')}</span>
                    <span className="pt-1 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Gallery - Construction Collage with Orange Accent */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="relative">
            {/* Orange rectangle visible behind rows */}
            <div className="absolute left-0 right-0 top-12 h-[800px] md:h-[900px] lg:h-[1000px] bg-orange-500"></div>
            
            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {/* First Row - 4 images */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/project 1.jpg" alt="Infrastructure" fill className="object-cover" />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/project 2.jpg" alt="Modern Building" fill className="object-cover" />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/9.jpg" alt="Construction Project" fill className="object-cover" />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/10.jpg" alt="Building Works" fill className="object-cover" />
              </div>
              
              {/* Second Row - Large feature image + 2 regular */}
              <div className="col-span-2 row-span-2 relative overflow-hidden">
                <Image 
                  src="/School.jpg" 
                  alt="Flagship Project" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/team.jpg" alt="Professional Team" fill className="object-cover" />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/11.jpg" alt="Construction Excellence" fill className="object-cover" />
              </div>
              
              {/* Third Row - Completing the large image span + 2 images */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/project 3.jpg" alt="Infrastructure Development" fill className="object-cover" />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/12.jpg" alt="Quality Construction" fill className="object-cover" />
              </div>
              
              {/* Fourth Row - 4 images */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/project 5.jpg" alt="Construction Site" fill className="object-cover" />
              </div>
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image src="/13.jpg" alt="Project Delivery" fill className="object-cover" />
              </div>
              <div className="col-span-2 relative h-48 md:h-64 overflow-hidden">
                <Image src="/ceo.jpg" alt="Leadership" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership - Inspired by Screenshot Design */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        {/* Orange Geometric Accent */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500" style={{clipPath: 'polygon(0 0, 100% 0, 0 100%)'}}></div>
        
        <div className="relative mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="grid gap-0 lg:grid-cols-2 items-center">
            {/* Left Side - CEO Image */}
            <div className="relative h-[500px] lg:h-[600px]">
              <Image
                src="/ceo.jpg"
                alt="Solani Construction & Engineering CEO Solomon Aniah"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
            
            {/* Right Side - White Text Panel */}
            <div className="bg-white p-10 md:p-16 lg:-ml-20 relative z-10">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-6 block">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-slate-900">
                Trusted Leadership Driving Construction Excellence
              </h2>
              <p className="text-base text-slate-700 leading-relaxed mb-6">
                Solomon Aniah, Founder and Chief Executive Officer, leads Solani Construction & Engineering with more than a decade of
                hands-on experience in construction management, supply chain logistics, and mining operations.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Under his stewardship, the company continues to expand its regional footprint while maintaining disciplined
                project governance and client-focused service delivery across Ghana and West Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
