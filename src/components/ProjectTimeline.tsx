'use client'

import Image from 'next/image'
import { Space_Mono } from 'next/font/google'
import { useRef, useState, MouseEvent, useEffect } from 'react'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

type TimelineItem = {
  id: string
  yearTag: string
  imageSrc: string
  imageAlt: string
  description: string
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'timeline-2013',
    yearTag: '2013',
    imageSrc: '/project%203.jpg',
    imageAlt: 'Founding of Solani Global Limited',
    description:
      'Incorporated in Bibiani with a mandate to integrate construction, mining support, and industrial supply services across Ghana.',
  },
  {
    id: 'timeline-2016',
    yearTag: '2016',
    imageSrc: '/2.jpg',
    imageAlt: 'Mining support logistics in operation',
    description:
      'Scaled supply chain capabilities for leading mining clients, providing equipment logistics, safety gear, and field procurement support.',
  },
  {
    id: 'timeline-2019',
    yearTag: '2019',
    imageSrc: '/project%208.jpg',
    imageAlt: 'Municipal infrastructure delivery',
    description:
      'Delivered municipal sanitation, water systems, and public facilities for Bibiani-Anhwiaso-Bekwai Assembly and the National Health Insurance Authority.',
  },
  {
    id: 'timeline-2020',
    yearTag: '2020',
    imageSrc: '/sch.jpg',
    imageAlt: 'Solani Montessori School Academic Block',
    description:
      'Completed 3-storey academic block with ancillary facilities at Bibiani Estate for Solani Montessori School, expanding educational infrastructure in the region.',
  },
  {
    id: 'timeline-2022',
    yearTag: '2022',
    imageSrc: '/project%207.jpg',
    imageAlt: 'Institutional buildings under construction',
    description:
      'Completed multi-storey education facilities and support infrastructure for regional training colleges, reinforcing our civil engineering credentials.',
  },
  {
    id: 'timeline-2024',
    yearTag: '2024',
    imageSrc: '/7.jpg',
    imageAlt: 'Award-winning project delivery',
    description:
      'Recognized for industry excellence, safety leadership, and sustainable construction practices while expanding to large-scale housing initiatives.',
  },
]

export default function ProjectTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const autoScroll = () => {
      if (!isDragging && !isHovered && !isTouching && container) {
        container.scrollLeft += 0.5
        
        // Loop back to start when reaching the end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0
        }
      }
      animationRef.current = requestAnimationFrame(autoScroll)
    }

    animationRef.current = requestAnimationFrame(autoScroll)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, isHovered, isTouching])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsHovered(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleTouchStart = () => {
    setIsTouching(true)
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
  }

  return (
    <section
      id="project-timeline"
      className="relative w-full bg-white px-6 py-24 text-slate-900"
    >
      <div className={`mx-auto flex w-full max-w-7xl flex-col items-center text-center ${spaceMono.className}`}>
        <p className="mb-2 text-xs uppercase tracking-[0.6em] text-slate-400">
          Feature Sequence
        </p>
        <h2 className="mb-12 text-2xl uppercase tracking-[0.35em] text-[#111111] md:text-4xl">
          Projects Timeline
        </h2>
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex w-full gap-8 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          {TIMELINE_ITEMS.map((item) => (
            <article key={item.id} className="flex-shrink-0 w-[340px] md:w-[400px]">
              <div className="group relative h-full overflow-hidden bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                <span className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.4em] text-white z-10">
                  {item.yearTag}
                </span>
                <div className="h-[320px] md:h-[420px] w-full overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    width={1280}
                    height={720}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <p className="px-6 pb-10 pt-8 text-left text-xs uppercase leading-relaxed tracking-[0.28em] text-[#111111]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
