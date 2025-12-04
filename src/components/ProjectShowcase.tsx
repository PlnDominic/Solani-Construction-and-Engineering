'use client'

import Image from 'next/image'
import { Space_Mono } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

type FadeInProps = {
  children: React.ReactNode
  delay?: number
}

function FadeIn({ children, delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const metadata = [
  { label: 'Founded', value: '2013' },
  { label: 'Headquarters', value: 'Bibiani, Western North Region' },
  { label: 'Experience', value: '500+ Completed Projects' },
  { label: 'Core Services', value: 'Construction · Mining Support · Supply Chain' },
  { label: 'Team', value: '70+ Direct Staff & 500+ Site Personnel' },
  { label: 'Coverage', value: 'Ghana & West Africa' },
]

export default function ProjectShowcase() {
  return (
    <section
      id="project-showcase"
      className="relative bg-white px-6 py-24 text-slate-900"
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-12 md:flex-row md:gap-12">
        <FadeIn delay={50}>
          <div className={`space-y-10 md:w-[380px] flex-shrink-0 ${spaceMono.className}`}>
            <div className="space-y-4">
              <span className="block text-xs uppercase tracking-[0.6em] text-slate-400">
                Company Snapshot
              </span>
              <h2 className="text-2xl font-bold leading-tight uppercase">
                Building Ghana&rsquo;s Future Infrastructure
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-y-4 text-xs uppercase tracking-[0.35em] text-slate-500 sm:grid-cols-2 sm:gap-x-6">
              {metadata.map(({ label, value }) => (
                <div key={label} className="col-span-1 space-y-1">
                  <p>{label}</p>
                  <p className="text-slate-700">{value}</p>
                </div>
              ))}
            </div>

            <p className="text-xs uppercase leading-relaxed tracking-[0.3em] text-slate-600">
              From mining supply chains to urban infrastructure, Solani Global Limited coordinates materials, logistics, and civil works with rigorous quality control, proactive stakeholder engagement, and on-time delivery.
            </p>

            <a
              href="mailto:solanigloballtd@yahoo.com"
              className="inline-flex border-b border-slate-900 pb-1 text-sm font-bold uppercase tracking-[0.4em] transition-colors hover:text-orange-500"
            >
              Request Our Profile
            </a>
          </div>
        </FadeIn>

        <div className="relative flex w-full flex-col gap-6 md:flex-1">
          <div className="absolute -right-6 top-0 hidden h-24 w-24 rotate-12 items-center justify-center rounded-full border border-slate-300 text-[10px] uppercase tracking-[0.4em] text-slate-500 lg:flex">
            solani<br />project<br />004
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <FadeIn delay={100}>
              <div className="relative h-[450px] md:h-[650px] overflow-hidden border border-slate-200 bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)] md:mt-0">
                <Image
                  src="/1.jpg"
                  alt="Architectural detail of the terrace"
                  width={1200}
                  height={1194}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="relative h-[450px] md:h-[650px] overflow-hidden border border-slate-200 bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)] md:mt-12">
                <Image
                  src="/3.jpg"
                  alt="Interior minimalist living space"
                  width={852}
                  height={1280}
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
