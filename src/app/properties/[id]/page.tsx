'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Property } from '@/lib/supabase'

export default function PropertyDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/properties/${id}`)
        const data = await response.json()

        if (response.ok) {
          setProperty(data.property)
        } else {
          setError(data.error || 'Failed to fetch property')
        }
      } catch (err) {
        setError('Failed to connect to server')
        console.error('Error fetching property:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormSuccess(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      setTimeout(() => setFormSuccess(false), 5000)
    } catch (err) {
      console.error('Error submitting form:', err)
    } finally {
      setFormSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="bg-white text-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-600">Loading property...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (error || !property) {
    return (
      <main className="bg-white text-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || 'Property not found'}</p>
            <Link 
              href="/properties"
              className="inline-block px-6 py-2 bg-orange-500 text-white text-xs uppercase font-bold tracking-wider hover:bg-orange-600 transition-colors"
            >
              Back to Properties
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-28 pb-6 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-orange-500 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-slate-900">{property.title}</span>
          </div>
        </div>
      </section>

      {/* Property Header */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0">
          <Image
            src={property.images[0] || '/placeholder.jpg'}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-900/70"></div>
        <div className="relative mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="space-y-6">
              <div className="inline-flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] backdrop-blur">
                  {property.type}
                </span>
                <span
                  className={`rounded-full border border-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.4em] backdrop-blur ${
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
              <h1 className="text-4xl font-black uppercase leading-tight md:text-5xl">
                {property.title}
              </h1>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-orange-200">
                {property.location}
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-8 text-right backdrop-blur">
              <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-orange-100">Price</span>
              <p className="mt-2 text-4xl font-black text-white">
                GHS {property.price.toLocaleString()}
              </p>
              <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.35em] text-orange-100">Plot Size</span>
              <p className="mt-1 text-base font-semibold text-orange-50">
                {property.area_sq_m.toLocaleString()} sqm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="relative -mt-12 pb-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="rounded-3xl border border-slate-200/60 bg-white/90 p-4 shadow-[0_40px_90px_-45px_rgba(15,23,42,0.55)] backdrop-blur">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative h-80 overflow-hidden rounded-2xl md:col-span-2 md:h-[500px]">
                <Image
                  src={property.images[0] || '/placeholder.jpg'}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid gap-4">
                {property.images.slice(1, 3).map((image, index) => (
                  <div key={index} className="relative h-40 overflow-hidden rounded-2xl md:h-60">
                    <Image
                      src={image || '/placeholder.jpg'}
                      alt={`${property.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {property.images.length < 2 && (
                  <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-slate-400 md:h-60">
                    No additional images
                  </div>
                )}
                {property.images.length < 3 && property.images.length >= 2 && (
                  <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100 text-slate-400 md:h-60">
                    No additional images
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-slate-100 py-16">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-10">
              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.55)]">
                <h2 className="text-2xl font-bold uppercase tracking-[0.25em] text-slate-900">
                  Property Description
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  {property.description}
                </p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.45)]">
                  <h2 className="text-2xl font-bold uppercase tracking-[0.25em] text-slate-900">
                    Key Features
                  </h2>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="rounded-2xl border border-orange-200/60 bg-orange-50/60 px-5 py-4 text-slate-800">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Feature</span>
                        <p className="mt-2 text-sm font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_30px_70px_-50px_rgba(15,23,42,0.45)]">
                <h2 className="text-2xl font-bold uppercase tracking-[0.25em] text-slate-900">
                  Property Information
                </h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Property Type</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{property.type}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Status</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{property.status}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Area</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{property.area_sq_m.toLocaleString()} sqm</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Location</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div>
              <div className="sticky top-28 rounded-3xl border border-slate-900/10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-[0_40px_80px_-45px_rgba(15,23,42,0.65)]">
                <h3 className="text-3xl font-bold uppercase tracking-[0.25em]">
                  Inquire Now
                </h3>

                {formSuccess ? (
                  <div className="mt-6 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 p-5">
                    <p className="text-sm font-bold text-emerald-200">Thank you for your inquiry!</p>
                    <p className="mt-1 text-xs text-emerald-100">We will contact you shortly.</p>
                  </div>
                ) : null}

                <form onSubmit={handleFormSubmit} className="mt-8 space-y-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition focus:border-orange-300/60 focus:bg-white/15"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition focus:border-orange-300/60 focus:bg-white/15"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition focus:border-orange-300/60 focus:bg-white/15"
                      placeholder="+233 XX XXX XXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="h-32 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition focus:border-orange-300/60 focus:bg-white/15"
                      placeholder="I am interested in this property..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="w-full rounded-xl bg-orange-500 px-6 py-4 text-xs font-bold uppercase tracking-[0.4em] text-white transition hover:bg-orange-400 focus:bg-orange-400 disabled:cursor-not-allowed disabled:bg-slate-500/50"
                  >
                    {formSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>
                <div className="mt-8 border-t border-white/10 pt-6 text-sm">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-orange-200">
                    Prefer direct contact?
                  </p>
                  <a href="tel:+233248212624" className="block text-sm font-semibold text-orange-200 transition hover:text-orange-100">
                    +233 24 821 2624
                  </a>
                  <a href="mailto:solanigloballtd@yahoo.com" className="mt-2 block text-sm font-semibold text-orange-200 transition hover:text-orange-100">
                    solanigloballtd@yahoo.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Listings */}
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-8 text-center">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 rounded-full border border-orange-400/70 px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-orange-500 transition hover:bg-orange-500 hover:text-white"
          >
            ← Back to All Properties
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
