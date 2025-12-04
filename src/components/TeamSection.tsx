'use client'

import { Space_Mono } from 'next/font/google'
import Image from 'next/image'
import ScrollStack from './ScrollStack'
import { useEffect, useRef, useState } from 'react'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Solomon Aniah',
    role: 'Founder & Chief Executive Officer',
    bio: 'Professional surveyor with over a decade of experience guiding multi-disciplinary construction, mining support, and supply chain operations throughout Ghana and West Africa.',
    image: '/ceo.jpg',
    linkedin: 'https://www.linkedin.com/in/solomon-aniah-593008203/?originalSubdomain=gh',
  },
  {
    name: 'Leadership Team',
    role: 'General Management & Project Controls',
    bio: 'Our management office synchronises logistics, procurement, finance, and stakeholder engagement to keep complex municipal and mining projects on schedule and within budget.',
    image: '/team.jpg',
  },
  {
    name: 'Technical Unit',
    role: 'Engineering & Site Supervision',
    bio: 'Civil engineers, surveyors, and safety officers oversee quality control on every structure, from reinforced culverts and water systems to multi-storey educational facilities.',
    image: '/8.jpg',
  },
  {
    name: 'Field Workforce',
    role: '500+ Skilled Craftspeople',
    bio: 'Masons, carpenters, steel benders, and equipment operators deliver workmanship that meets our strict safety and quality benchmarks across Western North communities.',
    image: '/project 4.jpg',
  },
]

function ParallaxTeamCard({ member }: { member: TeamMember }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current || !imageRef.current) return

      const card = cardRef.current
      const image = imageRef.current
      const rect = card.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate parallax offset based on scroll position
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
      const parallaxOffset = (scrollProgress - 0.5) * 100

      // Apply parallax transform to image
      image.style.transform = `translateY(${parallaxOffset}px) scale(1.1)`
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative mb-6 overflow-hidden"
      style={{ minHeight: '500px' }}
    >
      {/* Parallax Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
      >
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative flex h-full min-h-[500px] flex-col justify-end p-6 text-white">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.4em] text-orange-400">
            {member.role}
          </p>
          <h3 className="text-2xl font-bold uppercase tracking-wide">
            {member.name}
          </h3>
          <p className="text-sm leading-relaxed text-white/90">
            {member.bio}
          </p>
          <div className="flex gap-4 pt-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-orange-400"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
            <a
              href="#"
              className="text-white/70 transition-colors hover:text-orange-400"
              aria-label="Email"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative w-full bg-white px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className={`mx-auto w-full max-w-7xl ${spaceMono.className}`}>
        <div className="mb-12 text-center sm:mb-16 md:mb-20">
          <p className="mb-2 text-[10px] uppercase tracking-[0.5em] text-slate-400 sm:text-xs sm:tracking-[0.6em]">
            Our Team
          </p>
          <h2 className="text-xl uppercase tracking-[0.3em] text-[#111111] sm:text-2xl sm:tracking-[0.35em] md:text-4xl">
            Meet the Leaders
          </h2>
          <p className="mt-4 text-xs tracking-wide text-slate-600 sm:mt-6 sm:text-sm">
            Experienced professionals dedicated to building excellence
          </p>
        </div>

        {/* Mobile View - Parallax Cards */}
        {isMobile ? (
          <div className="space-y-0">
            {TEAM_MEMBERS.map((member) => (
              <ParallaxTeamCard key={member.name} member={member} />
            ))}
          </div>
        ) : (
          /* Desktop View - ScrollStack */
          <ScrollStack>
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="mx-auto w-full max-w-6xl overflow-hidden bg-white shadow-lg md:shadow-2xl"
            >
              <div className="grid gap-0 md:grid-cols-2 md:gap-8">
                <div className="relative h-[300px] sm:h-[400px] md:h-[600px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center space-y-4 p-6 sm:space-y-6 sm:p-8 md:p-12">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-orange-500 sm:text-xs sm:tracking-[0.5em]">
                      {member.role}
                    </p>
                    <h3 className="text-xl font-bold uppercase tracking-wide text-slate-900 sm:text-2xl md:text-3xl">
                      {member.name}
                    </h3>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {member.bio}
                  </p>
                  <div className="flex gap-4 pt-2 sm:pt-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 transition-colors hover:text-orange-500"
                        aria-label="LinkedIn"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                    )}
                    <a
                      href="#"
                      className="text-slate-400 transition-colors hover:text-orange-500"
                      aria-label="Email"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollStack>
        )}
      </div>
    </section>
  )
}
