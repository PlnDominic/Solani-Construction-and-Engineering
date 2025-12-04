import type { Metadata } from 'next'
import Image from 'next/image'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Machinery & Equipment Rentals | Solani Construction Limited',
  description: 'Rent heavy machinery and construction equipment from Solani Construction Limited. Wide range of excavators, bulldozers, compactors, and specialized equipment for your construction projects in Ghana.',
  keywords: ['equipment rental', 'machinery rental', 'Ghana', 'construction equipment', 'excavators', 'bulldozers', 'heavy machinery'],
  alternates: {
    canonical: 'https://solaniconstruction.com/rentals',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solaniconstruction.com/rentals',
    siteName: 'Solani Construction Limited',
    title: 'Machinery & Equipment Rentals | Solani Construction',
    description: 'Professional heavy machinery and construction equipment rentals. Reliable, well-maintained equipment for projects of any scale.',
    images: [
      {
        url: 'https://solaniconstruction.com/project 4.jpg',
        width: 1200,
        height: 630,
        alt: 'Construction Equipment',
      },
    ],
  },
}

const equipmentCategories = [
  {
    title: 'Hoisting Machines',
    quantity: 3,
    image: '/Hoisting Machines.jpg',
  },
  {
    title: 'Excavators',
    quantity: 2,
    image: '/Excavators.jpg',
  },
  {
    title: 'Dump Trucks',
    quantity: 5,
    image: '/Dump Trucks.jpg',
  },
  {
    title: 'Loaders',
    quantity: 2,
    image: '/Loaders.jpg',
  },
  {
    title: 'Grader',
    quantity: 1,
    image: '/Grader.jpg',
  },
  {
    title: 'Pickup Vehicles',
    quantity: 10,
    image: '/Pickup Vehicles.jpg',
  },
  {
    title: 'Buses',
    quantity: 2,
    image: '/Buses.jpg',
  },
  {
    title: 'Concrete Mixers',
    quantity: 4,
    image: '/Concrete Mixers.jpg',
  },
]

const rentalProcess = [
  {
    step: '01',
    title: 'Equipment Selection',
    description: 'Contact us with your project requirements. Our team will recommend the right equipment for your specific needs.',
  },
  {
    step: '02',
    title: 'Quote & Agreement',
    description: 'Receive a detailed quote outlining rental rates, terms, and delivery schedule. Review and sign rental agreement.',
  },
  {
    step: '03',
    title: 'Delivery & Setup',
    description: 'Equipment is delivered to your site, inspected, and made operational. Optional operator training provided.',
  },
  {
    step: '04',
    title: 'On-Site Support',
    description: 'Throughout the rental period, our team provides technical support and emergency maintenance if needed.',
  },
  {
    step: '05',
    title: 'Return & Settlement',
    description: 'Schedule equipment pickup at project completion. Final inspection and settlement of rental fees.',
  },
]

export default function RentalsPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/6.jpg"
            alt="Heavy Machinery"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 mb-6 block">
            Equipment Rentals
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight">
            Machinery & Equipment Rentals
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Professional-grade construction equipment and heavy machinery for projects of any scale. 
            Reliable, well-maintained fleet with flexible rental terms and expert support.
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-6 border-l-4 border-orange-500 pl-6">
                Equipment You Can Trust
              </h2>
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                Solani Construction offers a comprehensive fleet of modern construction machinery and equipment for 
                rent across Ghana. From small-scale residential projects to large infrastructure developments, 
                we provide the right tools to get the job done efficiently.
              </p>
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                Our equipment undergoes regular maintenance and safety inspections to ensure optimal performance 
                and reliability. We understand that downtime costs money, which is why we maintain our fleet to 
                the highest standards and provide rapid response technical support.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Whether you need equipment for a day, a week, or the duration of your entire project, 
                our flexible rental terms and competitive rates make it easy to access the machinery you need 
                without the burden of ownership costs.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/Excavators.jpg"
                alt="Construction Equipment Fleet"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 border-b-4 border-orange-500 inline-block pb-2">
              Available Equipment
            </h2>
            <p className="text-slate-700 mt-6 max-w-2xl mx-auto">
              Our fleet of well-maintained construction equipment and machinery available for rent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {equipmentCategories.map((category, index) => (
              <div key={index} className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold uppercase mb-2 text-slate-900">
                    {category.title}
                  </h3>
                  <p className="text-3xl font-black text-orange-500">
                    {category.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
              How It Works
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Simple, streamlined rental process from inquiry to equipment return.
            </p>
          </div>

          <div className="space-y-8">
            {rentalProcess.map((process, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-500 flex items-center justify-center">
                    <span className="text-2xl font-black text-white">{process.step}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-bold uppercase mb-2 text-white">
                    {process.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {process.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-orange-500 text-white">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">
            Ready to Rent Equipment?
          </h2>
          <p className="text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Get in touch with our equipment rental team for availability, pricing, and expert recommendations 
            tailored to your project requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:solanigloballtd@yahoo.com?subject=Equipment Rental Inquiry"
              className="px-8 py-4 bg-white text-orange-500 font-bold uppercase text-sm tracking-wider hover:bg-slate-100 transition-colors"
            >
              Request a Quote
            </a>
            <a
              href="tel:+233248212624"
              className="px-8 py-4 border-2 border-white text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-orange-500 transition-colors"
            >
              Call: +233 24 821 2624
            </a>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3 text-left">
            <div className="bg-white/10 p-6">
              <h3 className="font-bold uppercase text-sm mb-2 tracking-wider">Business Hours</h3>
              <p className="text-sm text-white/90">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-sm text-white/90">Saturday: 8:00 AM - 2:00 PM</p>
            </div>
            <div className="bg-white/10 p-6">
              <h3 className="font-bold uppercase text-sm mb-2 tracking-wider">Email</h3>
              <p className="text-sm text-white/90">solanigloballtd@yahoo.com</p>
            </div>
            <div className="bg-white/10 p-6">
              <h3 className="font-bold uppercase text-sm mb-2 tracking-wider">Location</h3>
              <p className="text-sm text-white/90">Bibiani, Western North Region, Ghana</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
