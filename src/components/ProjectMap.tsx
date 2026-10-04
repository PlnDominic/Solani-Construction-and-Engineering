'use client'

import { Space_Mono } from 'next/font/google'
import { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { LatLngExpression } from 'leaflet'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'] })

type Project = {
  id: string
  name: string
  location: string
  type: string
  year: string
  image: string
  coordinates: LatLngExpression
}

const PROJECTS: Project[] = [
  {
    id: 'project-solani-office',
    name: 'Solani Global Office Complex',
    location: 'Bibiani, Adyekyen',
    type: '3-storey Office Complex',
    year: 'Client: Solani Global Limited',
    image: '/project10.jpg',
    coordinates: [6.462097044636618, -2.296229213347191],
  },
  {
    id: 'project-montessori-school',
    name: 'Solani Montessori School',
    location: 'Bibiani Estate',
    type: '3 Storey Academic block with Ancilliary facilities',
    year: 'Client: Solani Montessori School',
    image: '/School.jpg',
    coordinates: [6.450526329113391, -2.3084902025536276],
  },
  {
    id: 'project-subiri-nkwanta-chps',
    name: 'Subiri Nkwanta CHPS Compound',
    location: 'Subiri Nkwanta',
    type: 'Construction of 1No. CHPS Compound & 1No. 2-Bedroom Accommodation Facility',
    year: 'Client: Bibiani-Anhwiaso-Bekwai Municipal Assembly',
    image: '/chps-subiri-nkwanta.jpg',
    coordinates: [6.302895894525432, -2.2503988746247066],
  },
]

const MapComponent = dynamic(
  () => import('./InteractiveMap'),
  { 
    ssr: false, 
    loading: () => <div className="flex h-[500px] items-center justify-center bg-slate-100">Loading map...</div> 
  }
)

export default function ProjectMap() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section className="relative w-full bg-white px-6 py-24 text-slate-900">
      <div className={`mx-auto w-full max-w-7xl ${spaceMono.className}`}>
        <div className="mb-16 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.6em] text-slate-400">
            Our Reach
          </p>
          <h2 className="text-2xl uppercase tracking-[0.35em] text-[#111111] md:text-4xl">
            Flagship Delivery in Western North Region
          </h2>
          <p className="mt-4 text-sm text-slate-600">
            Western North Region, Ghana
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Map Container */}
          <div className="relative flex-1">
            <div className="relative w-full overflow-hidden rounded-lg shadow-xl" style={{ height: '500px' }}>
              <MapComponent 
                selectedProject={selectedProject} 
                onMarkerClick={setSelectedProject}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="w-full lg:w-[400px]">
            {selectedProject ? (
              <div className="flex flex-col gap-6">
                <div className="relative h-[280px] w-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-[0.6em] text-slate-400">
                      {selectedProject.location}
                    </p>
                    <h3 className="text-xl font-bold uppercase tracking-wide">
                      {selectedProject.name}
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.35em]">
                    <div>
                      <p className="mb-1 text-slate-500">Scope</p>
                      <p className="text-slate-700">{selectedProject.type}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-slate-500">Details</p>
                      <p className="text-slate-700">{selectedProject.year}</p>
                    </div>
                  </div>
                  <button className="mt-4 inline-flex border-b-2 border-orange-500 pb-1 text-sm font-bold uppercase tracking-[0.4em] text-orange-500 transition-colors hover:border-orange-600 hover:text-orange-600">
                    Request Project Brief
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center">
                <div className="space-y-4 px-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                    <svg
                      className="h-8 w-8 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-600">
                    Click on any marker to view project details
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
