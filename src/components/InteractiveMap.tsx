'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import L from 'leaflet'

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
    id: 'project-nhia-office',
    name: 'National Health Insurance Authority Office',
    location: 'Sampa',
    type: 'Construction of Jaman North NHIA Office',
    year: 'Client: National Health Insurance Authority',
    image: '/NHIA.jpg',
    coordinates: [7.950775559341811, -2.6949210637812264],
  },
  {
    id: 'project-ssnit-office',
    name: 'SSNIT Office',
    location: 'Nkawkaw',
    type: 'Rehabilation and Extension of Nkawkaw Branch Office',
    year: 'Client: SSNIT',
    image: '/SSNIT.jpg',
    coordinates: [6.555018308821689, -0.7717310312227154],
  },
  {
    id: 'project-solani-office',
    name: 'Solani Global Office Complex',
    location: 'Bibiani, Adzekyen',
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
    id: 'project-bibiani-sanitation',
    name: 'Municipal Sanitation Programme',
    location: 'Bibiani',
    type: '20-Seater W/C Facility & Mechanized Borehole',
    year: 'Client: Bibiani-Anhwiaso-Bekwai MA',
    image: '/project%204.jpg',
    coordinates: [6.4698, -2.3194],
  },
  {
    id: 'project-kwawkrom',
    name: 'Kwawkrom Community Toilets',
    location: 'Kwawkrom',
    type: '12-Seater Pour Flush Facility',
    year: 'Client: Kinross Chirano Gold Mines',
    image: '/project%209.jpg',
    coordinates: [6.405, -2.25],
  },
  {
    id: 'project-chirano-water',
    name: 'Chirano Water System',
    location: 'Chirano',
    type: 'Small Town Water Supply Infrastructure',
    year: 'Client: Kinross Chirano Gold Mines',
    image: '/project%208.jpg',
    coordinates: [6.273, -2.333],
  },
  {
    id: 'project-wiawso-campus',
    name: 'Sefwi Wiawso Training Facilities',
    location: 'Sefwi Wiawso',
    type: '2-Storey Academic Block with Ancillary Works',
    year: 'Client: Nursing Training College',
    image: '/project%207.jpg',
    coordinates: [6.2006, -2.491],
  },
  {
    id: 'project-asankragwa-hostel',
    name: 'Asankragwa Midwifery Hostel',
    location: 'Asankragwa',
    type: '2-Storey Student Accommodation',
    year: 'Client: Nursing & Midwifery Training College',
    image: '/project%205.jpg',
    coordinates: [5.9397, -2.261],
  },
]

function MapController() {
  const map = useMap()
  useEffect(() => {
    map.setView([6.3, -2.35], 8)
  }, [map])
  return null
}

interface InteractiveMapProps {
  selectedProject: Project | null
  onMarkerClick: (project: Project) => void
}

export default function InteractiveMap({ selectedProject, onMarkerClick }: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    try {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })
    } catch (error) {
      console.error('Error initializing map icons:', error)
      setMapError(true)
    }
  }, [])

  if (!isClient) {
    return <div className="flex h-full items-center justify-center">Loading map...</div>
  }

  if (mapError) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-100 text-center p-8">
        <div>
          <p className="text-sm text-slate-600 mb-2">Map initialization error</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-orange-500 underline text-sm"
          >
            Refresh page
          </button>
        </div>
      </div>
    )
  }

  const createCustomIcon = (isSelected: boolean) => {
    return new L.DivIcon({
      className: 'custom-marker',
      html: `<div class="relative">
        <div class="${isSelected ? 'h-10 w-10' : 'h-8 w-8'} rounded-full border-4 border-white bg-orange-500 shadow-lg transition-all hover:bg-orange-600 hover:scale-110 ${isSelected ? 'ring-4 ring-orange-300' : ''}"></div>
        ${isSelected ? '<div class="absolute -inset-2 animate-ping rounded-full bg-orange-400 opacity-75"></div>' : ''}
      </div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    })
  }

  return (
    <MapContainer
      center={[6.3, -2.35]}
      zoom={8}
      className="h-full w-full"
      style={{ minHeight: '500px' }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <MapController />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        eventHandlers={{
          tileerror: (error) => {
            console.warn('Tile loading error:', error)
          },
        }}
      />
      {PROJECTS.map((project) => (
        <Marker
          key={project.id}
          position={project.coordinates}
          icon={createCustomIcon(selectedProject?.id === project.id)}
          eventHandlers={{
            click: () => onMarkerClick(project),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{project.name}</p>
              <p className="text-xs text-slate-600">{project.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
