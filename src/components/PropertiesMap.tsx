'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import type { LatLngExpression } from 'leaflet'
import L from 'leaflet'
import type { Property } from '@/lib/supabase'

function MapController({ properties }: { properties: Property[] }) {
  const map = useMap()
  useEffect(() => {
    if (properties.length > 0) {
      const validCoords = properties.filter(p => p.latitude && p.longitude)
      if (validCoords.length > 0) {
        const bounds = validCoords.map(p => [p.latitude!, p.longitude!] as LatLngExpression)
        map.fitBounds(bounds as any, { padding: [50, 50] })
      } else {
        map.setView([6.3, -2.35], 8)
      }
    } else {
      map.setView([6.3, -2.35], 8)
    }
  }, [map, properties])
  return null
}

interface PropertiesMapProps {
  properties: Property[]
  selectedProperty: Property | null
  onMarkerClick: (property: Property) => void
}

export default function PropertiesMap({ properties, selectedProperty, onMarkerClick }: PropertiesMapProps) {
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

  const propertiesWithCoordinates = properties.filter(p => p.latitude && p.longitude)

  return (
    <MapContainer
      center={[6.3, -2.35]}
      zoom={8}
      className="h-full w-full"
      style={{ minHeight: '500px' }}
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <MapController properties={propertiesWithCoordinates} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        eventHandlers={{
          tileerror: (error) => {
            console.warn('Tile loading error:', error)
          },
        }}
      />
      {propertiesWithCoordinates.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude!, property.longitude!]}
          icon={createCustomIcon(selectedProperty?.id === property.id)}
          eventHandlers={{
            click: () => onMarkerClick(property),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{property.title}</p>
              <p className="text-xs text-slate-600">{property.location}</p>
              <p className="text-xs text-orange-500 font-bold mt-1">GHS {property.price.toLocaleString()}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
