import type { Metadata } from 'next'
import Image from 'next/image'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Corporate Social Responsibility | Solani Construction Limited',
  description: 'Solani Construction Limited is committed to building communities and sustaining futures through responsible construction practices, education, environmental stewardship, and local empowerment across Ghana.',
  keywords: ['CSR', 'corporate social responsibility', 'community development', 'Ghana', 'sustainability', 'education', 'environment'],
  alternates: {
    canonical: 'https://solaniconstruction.com/csr',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solaniconstruction.com/csr',
    siteName: 'Solani Construction Limited',
    title: 'Corporate Social Responsibility at Solani Construction',
    description: 'Building communities and sustaining futures through responsible construction and social impact initiatives.',
    images: [
      {
        url: 'https://solaniconstruction.com/social1.jpg',
        width: 1200,
        height: 630,
        alt: 'Solani Construction CSR Initiatives',
      },
    ],
  },
}

const impactStats = [
  {
    number: '50+',
    label: 'Local Jobs Created',
  },
  {
    number: '5+',
    label: 'Community Projects',
  },
  {
    number: '10+',
    label: 'Communities Served',
  },
  {
    number: '100+',
    label: 'Widows Supported',
  },
]

const featuredProjects = [
  {
    title: 'Community Water Infrastructure',
    image: '/social1.jpg',
  },
  {
    title: 'Educational Facilities Construction',
    image: '/social2.jpg',
  },
  {
    title: 'Healthcare Infrastructure',
    image: '/social3.jpg',
  },
  {
    title: 'Youth Skills Development',
    image: '/social4.jpg',
  },
  {
    title: 'Sustainable Building Practices',
    image: '/social5.jpg',
  },
  {
    title: 'Local Workforce Development',
    image: '/social6.jpg',
  },
  {
    title: 'Community Empowerment',
    image: '/social9.jpg',
  },
  {
    title: 'Social Development',
    image: '/social10.jpg',
  },
]

export default function CSRPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/social7.jpg"
            alt="Solani Construction CSR"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 mb-6 block">
            Corporate Social Responsibility
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight">
            Building Communities, Sustaining Futures
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            At Solani Construction, we believe that building infrastructure means building stronger communities. 
            Our commitment extends beyond construction to creating lasting positive impact across Ghana.
          </p>
        </div>
      </section>

      {/* CSR Overview */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold uppercase mb-6 border-l-4 border-orange-500 pl-6">
                Our Commitment to Social Responsibility
              </h2>
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                Social responsibility is embedded in everything we do at Solani Construction. We recognize that 
                our work impacts not just the built environment, but the lives of people and communities across Ghana.
              </p>
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                From prioritizing local employment to implementing sustainable building practices, we are committed 
                to creating value that extends far beyond our construction projects. Every project is an opportunity 
                to invest in people, protect the environment, and contribute to Ghana&apos;s development goals.
              </p>
              <p className="text-base text-slate-700 leading-relaxed">
                Our CSR initiatives align with our core values of integrity, sustainability, and community impact, 
                ensuring that our growth as a company translates into growth for the communities we serve.
              </p>
            </div>
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/social8.jpg"
                alt="Community Impact"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4">
              Our Impact by the Numbers
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Measurable results from our commitment to community development and social responsibility.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl md:text-6xl font-black text-orange-500 mb-3">
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-wider text-slate-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured CSR Projects */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold uppercase mb-4 border-b-4 border-orange-500 inline-block pb-2">
              Featured CSR Initiatives
            </h2>
            <p className="text-slate-700 mt-6">
              Highlighting projects where construction meets community development and social impact.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <div key={index} className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={project.image}
                    alt={`CSR Initiative ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Engagement */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">
            Partner with Us for Social Impact
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Whether you represent a community organization, NGO, or government agency, we welcome 
            opportunities to collaborate on projects that create positive social and environmental impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:solanigloballtd@yahoo.com?subject=CSR Partnership Inquiry"
              className="px-8 py-4 bg-orange-500 text-white font-bold uppercase text-sm tracking-wider hover:bg-orange-600 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="tel:+233248212624"
              className="px-8 py-4 border-2 border-white text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-slate-900 transition-colors"
            >
              Call: +233 24 821 2624
            </a>
          </div>

          <p className="text-xs text-slate-400 mt-8 uppercase tracking-wider">
            Email: solanigloballtd@yahoo.com
          </p>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-20 bg-white">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8">
          <div className="border-l-4 border-orange-500 pl-8 py-6 bg-slate-50">
            <p className="text-xl text-slate-900 font-bold leading-relaxed mb-4">
              We believe that responsible business practices and community development are inseparable. 
              As we continue to grow as a construction company, we remain committed to being a force for 
              positive change in every community we serve.
            </p>
            <p className="text-sm text-slate-600 font-medium uppercase tracking-wider">
              Solani Construction Limited - Building Communities, Sustaining Futures
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
