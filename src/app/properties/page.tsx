'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Property } from '@/lib/supabase'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [filters, setFilters] = useState({
    type: 'all',
    status: '',
    location: '',
    minPrice: '',
    maxPrice: '',
  })
  const [priceBounds, setPriceBounds] = useState({ min: 5000, max: 1000000 })
  const sliderTrackRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{
    startX: number
    trackWidth: number
    rangeWidth: number
    startMin: number
    startMax: number
  } | null>(null)
  const [isDraggingRange, setIsDraggingRange] = useState(false)

  useEffect(() => {
    console.log('[PropertiesPage] Properties fetched:', properties.length)
  }, [properties])

  useEffect(() => {
    console.log('[PropertiesPage] Filtered properties snapshot:', filteredProperties.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      area: p.area_sq_m,
      hasImages: Array.isArray(p.images) && p.images.length > 0,
    })))
  }, [filteredProperties])

  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/properties')
      const data = await response.json()

      if (response.ok || response.status === 503) {
        const propertyList: Property[] = data.properties || []
        setProperties(propertyList)

        // Set price bounds but DON'T automatically apply them as filters
        setPriceBounds({ min: 5000, max: 1000000 })
        // Leave minPrice and maxPrice empty so all properties show initially
        setFilters((prev) => ({
          ...prev,
          minPrice: '',
          maxPrice: '',
        }))

        if (data.message) {
          setError(data.message)
        }
      } else {
        setError(data.error || 'Failed to fetch properties')
      }
    } catch (err) {
      setError('Failed to connect to server')
      console.error('Error fetching properties:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  useEffect(() => {
    let filtered = [...properties]

    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type)
    }

    if (filters.status) {
      filtered = filtered.filter(p => p.status === filters.status)
    }

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice))
    }

    setFilteredProperties(filtered)
  }, [filters, properties])

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      type: 'all',
      status: '',
      location: '',
      minPrice: priceBounds.min ? String(priceBounds.min) : '',
      maxPrice: priceBounds.max ? String(priceBounds.max) : '',
    })
  }

  const handlePriceRangeChange = (key: 'minPrice' | 'maxPrice', value: number) => {
    setFilters((prev) => {
      const sliderMin = priceBounds.min
      const sliderMax = priceBounds.max

      if (key === 'minPrice') {
        const normalized = Math.max(sliderMin, Math.min(value, sliderMax))
        const capped = Math.min(normalized, prev.maxPrice ? Number(prev.maxPrice) : sliderMax)
        return { ...prev, minPrice: String(Math.round(capped)) }
      }

      const normalized = Math.max(sliderMin, Math.min(value, sliderMax))
      const capped = Math.max(normalized, prev.minPrice ? Number(prev.minPrice) : sliderMin)
      return { ...prev, maxPrice: String(Math.round(capped)) }
    })
  }

  // When filters are empty, show the full range visually
  const minPriceValue = filters.minPrice ? Math.max(priceBounds.min, Number(filters.minPrice)) : priceBounds.min
  const maxPriceValue = filters.maxPrice ? Math.min(priceBounds.max, Number(filters.maxPrice)) : priceBounds.max
  const priceRangeSpan = Math.max(priceBounds.max - priceBounds.min, 1)
  const minPosition = priceBounds.max === priceBounds.min ? 0 : ((minPriceValue - priceBounds.min) / priceRangeSpan) * 100
  const maxPosition = priceBounds.max === priceBounds.min ? 100 : ((maxPriceValue - priceBounds.min) / priceRangeSpan) * 100

  useEffect(() => {
    if (!isDraggingRange) {
      return
    }

    const handlePointerMove = (event: PointerEvent) => {
      const state = dragStateRef.current
      if (!state || state.rangeWidth <= 0 || !sliderTrackRef.current) {
        return
      }

      const trackRect = sliderTrackRef.current.getBoundingClientRect()
      const trackWidth = state.trackWidth || trackRect.width
      if (!trackWidth) {
        return
      }

      const priceSpan = priceBounds.max - priceBounds.min
      if (priceSpan <= 0) {
        return
      }

      const deltaFraction = (event.clientX - state.startX) / trackWidth
      const deltaValue = deltaFraction * priceSpan
      let nextMin = state.startMin + deltaValue
      let nextMax = nextMin + state.rangeWidth

      if (nextMin < priceBounds.min) {
        nextMin = priceBounds.min
        nextMax = nextMin + state.rangeWidth
      }

      if (nextMax > priceBounds.max) {
        nextMax = priceBounds.max
        nextMin = nextMax - state.rangeWidth
      }

      nextMin = Math.max(priceBounds.min, Math.min(nextMin, priceBounds.max - state.rangeWidth))
      nextMax = Math.min(priceBounds.max, Math.max(nextMin + state.rangeWidth, priceBounds.min + state.rangeWidth))

      setFilters(prev => ({
        ...prev,
        minPrice: String(Math.round(nextMin)),
        maxPrice: String(Math.round(nextMax)),
      }))
    }

    const handlePointerUp = () => {
      setIsDraggingRange(false)
      dragStateRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [isDraggingRange, priceBounds.max, priceBounds.min])

  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/1.jpg"
            alt="Properties for Sale"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500" style={{clipPath: 'polygon(100% 0, 100% 100%, 0 0)'}}></div>
        
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-orange-500 mb-6 block">
            Property Listings
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight">
            Premium Properties Across Ghana
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Explore our exclusive selection of lands and properties for sale across Western North Region and beyond.
          </p>
        </div>
      </section>

      {/* Main Content - Filters + Properties */}
      <section className="py-12 bg-gradient-to-b from-slate-100 via-white to-slate-100">
        <div className="mx-auto w-full max-w-[1600px] px-6 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Panel - Left Side */}
            <aside className="lg:w-[380px] shrink-0">
              <div className="lg:sticky lg:top-8 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 backdrop-blur-xl shadow-[0_28px_60px_-35px_rgba(15,23,42,0.55)]">
                <div className="p-8 space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                <div className="space-y-6">
                  <label className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-[0_12px_35px_-28px_rgba(15,23,42,0.4)]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                      Status
                    </span>
                    <select
                      value={filters.status}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                    >
                      <option value="">All Status</option>
                      <option value="Available">Available</option>
                      <option value="Under Offer">Under Offer</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </label>

                  <label className="flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-5 shadow-[0_12px_35px_-28px_rgba(15,23,42,0.4)]">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
                      Location
                    </span>
                    <div className="relative">
                      <input
                        type="text"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}
                        placeholder="Search location..."
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-inner focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                      />
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-[0.35em] text-slate-300">
                        ↵
                      </span>
                    </div>
                  </label>

                  <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.6)]">
                    <div className="mb-5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-orange-500 block mb-3">
                        Price Range (GHS)
                      </span>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-700">
                          <span>Min: {filters.minPrice ? Number(filters.minPrice).toLocaleString() : priceBounds.min.toLocaleString()}</span>
                          <span>Max: {filters.maxPrice ? Number(filters.maxPrice).toLocaleString() : priceBounds.max.toLocaleString()}</span>
                        </div>
                        <p className="text-[9px] text-slate-500">
                          Drag handles to refine
                        </p>
                      </div>
                    </div>
                    <div className="relative mt-8 h-14 flex items-center">
                      <div
                        ref={sliderTrackRef}
                        className="absolute inset-x-4 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-slate-200"
                      >
                        <div
                          className={`absolute top-0 h-full rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 ${priceBounds.max === priceBounds.min ? 'pointer-events-none' : 'cursor-grab active:cursor-grabbing'}`}
                          onPointerDown={(event) => {
                            if (priceBounds.max === priceBounds.min) {
                              return
                            }
                            const rangeWidth = maxPriceValue - minPriceValue
                            if (rangeWidth <= 0) {
                              return
                            }
                            const trackRect = sliderTrackRef.current?.getBoundingClientRect()
                            if (!trackRect || !trackRect.width) {
                              return
                            }
                            dragStateRef.current = {
                              startX: event.clientX,
                              trackWidth: trackRect.width,
                              rangeWidth,
                              startMin: minPriceValue,
                              startMax: maxPriceValue,
                            }
                            setIsDraggingRange(true)
                          }}
                          style={{
                            left: priceBounds.max === priceBounds.min ? '0%' : `${minPosition}%`,
                            right: priceBounds.max === priceBounds.min ? '0%' : `${100 - maxPosition}%`,
                            opacity: priceBounds.max === priceBounds.min ? 0 : 1,
                          }}
                        ></div>
                      </div>
                      <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={minPriceValue}
                        onChange={(e) => handlePriceRangeChange('minPrice', Number(e.target.value))}
                        disabled={priceBounds.max === priceBounds.min}
                        className="relative z-20 w-full appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed"
                        style={{ accentColor: '#f97316' }}
                      />
                      <input
                        type="range"
                        min={priceBounds.min}
                        max={priceBounds.max}
                        value={maxPriceValue}
                        onChange={(e) => handlePriceRangeChange('maxPrice', Number(e.target.value))}
                        disabled={priceBounds.max === priceBounds.min}
                        className="absolute inset-0 z-30 w-full appearance-none bg-transparent focus:outline-none disabled:cursor-not-allowed"
                        style={{ accentColor: '#f97316' }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetFilters}
                  className="w-full rounded-xl px-4 py-3 bg-slate-900 text-white text-[10px] font-semibold uppercase tracking-[0.3em] hover:bg-orange-500 transition-colors shadow-[0_10px_25px_-15px_rgba(15,23,42,0.6)]"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </aside>

          {/* Properties Grid - Right Side */}
          <div className="flex-1 min-w-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-slate-600">Loading properties...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={fetchProperties}
                  className="px-6 py-2 bg-orange-500 text-white text-xs uppercase font-bold tracking-wider hover:bg-orange-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-slate-600 mb-4">No properties found matching your criteria.</p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-orange-500 text-white text-xs uppercase font-bold tracking-wider hover:bg-orange-600 transition-colors rounded-xl"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
              {filteredProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group relative block h-full overflow-hidden border border-slate-200/70 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.6)] transition-transform duration-500 hover:-translate-y-2"
                >
                  <div className="relative min-h-[36rem]">
                    <Image
                      src={property.images[0] || '/placeholder.jpg'}
                      alt={property.title}
                      fill
                      quality={100}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900/10 via-slate-950/45 to-slate-950/70"></div>
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-10 text-white">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/15 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.4em]">
                          {property.type}
                        </span>
                        <span
                          className={`inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.4em] ${
                            property.status === 'Available'
                              ? 'bg-emerald-400/30 text-emerald-100'
                              : property.status === 'Under Offer'
                                ? 'bg-amber-400/30 text-amber-100'
                                : 'bg-slate-500/40 text-slate-100'
                          }`}
                        >
                          {property.status}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.5em] text-orange-200/90">
                          {property.location}
                        </p>
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.35em] text-orange-100/80">
                          {property.title}
                        </span>
                        <div className="flex flex-wrap items-end justify-between gap-6">
                          <div>
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.4em] text-orange-100/70">Price</span>
                            <span className="block text-xl font-semibold text-white">
                              GHS {property.price.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.4em] text-orange-100/70">Plot Size</span>
                            <span className="block text-sm font-semibold text-orange-50">
                              {property.area_sq_m.toLocaleString()} sqm
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-end text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-100/80">
                          <span className="inline-flex items-center gap-2 text-orange-200">
                            View Details
                            <span className="text-sm leading-none">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          </div>
        </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="mx-auto w-full max-w-4xl px-6 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mb-6">
            Looking for Something Specific?
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Cannot find the perfect property? Contact our team and we will help you find land or property that matches your exact requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:solanigloballtd@yahoo.com?subject=Property Inquiry"
              className="px-8 py-4 bg-orange-500 text-white font-bold uppercase text-sm tracking-wider hover:bg-orange-600 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+233248212624"
              className="px-8 py-4 border-2 border-white text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-slate-900 transition-colors"
            >
              Call: +233 24 821 2624
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
