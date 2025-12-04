import type { Metadata } from 'next'
import HeroSection from '@/components/HeroSection'
import Navbar from '@/components/Navbar'
import FullImageSection from '@/components/FullImageSection'
import FullImageSection2 from '@/components/FullImageSection2'
import ProjectShowcase from '@/components/ProjectShowcase'
import ProjectTimeline from '@/components/ProjectTimeline'
import ProjectMap from '@/components/ProjectMap'
import TeamSection from '@/components/TeamSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Solani Construction Limited | Premium Construction Services Ghana',
  description: 'Premier construction specialists delivering resilient infrastructure across Ghana. Expert in residential, commercial, and industrial projects.',
  keywords: ['construction', 'Ghana', 'infrastructure', 'building', 'contractors', 'construction company'],
  authors: [{ name: 'Solani Construction Limited' }],
  creator: 'Solani Construction Limited',
  publisher: 'Solani Construction Limited',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://solaniconstruction.com',
    siteName: 'Solani Construction Limited',
    title: 'Solani Construction Limited | Premium Construction Services',
    description: 'Premier construction specialists delivering resilient infrastructure across Ghana.',
    images: [
      {
        url: 'https://solaniconstruction.com/logo.png',
        width: 1200,
        height: 630,
        alt: 'Solani Construction Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solani Construction Limited',
    description: 'Premier construction specialists delivering resilient infrastructure across Ghana.',
    images: ['https://solaniconstruction.com/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://solaniconstruction.com',
  },
}

export default function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <HeroSection />

      <FullImageSection />
      <ProjectShowcase />
      <FullImageSection2 />
      <ProjectTimeline />
      <TeamSection />
      <ProjectMap />
      <Footer />
    </main>
  )
}
