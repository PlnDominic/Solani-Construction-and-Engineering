'use client'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import type { Property } from '@/lib/supabase'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)
  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    price: 0,
    type: 'Land',
    status: 'Available',
    location: '',
    area_sq_m: 0,
    images: [],
    features: [],
    latitude: undefined,
    longitude: undefined,
  })
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchProperties()
    }
  }, [isAuthenticated])
  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    setIsAuthenticated(!!session)
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setLoginError(error.message)
      } else if (data.session) {
        setIsAuthenticated(true)
      }
    } catch (err) {
      setLoginError('An error occurred during login')
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
  }
  const fetchProperties = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/properties')
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (err) {
      console.error('Error fetching properties:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: (() => {
        if (name === 'price' || name === 'area_sq_m') {
          if (value === '') return 0
          return parseFloat(value) || 0
        }

        if (name === 'latitude' || name === 'longitude') {
          if (value === '') return undefined
          return parseFloat(value)
        }

        return value
      })(),
    }))
  }

  const handleFeaturesChange = (value: string) => {
    const array = value.split('\n').filter((item) => item.trim())
    setFormData((prev) => ({ ...prev, features: array }))
  }

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setUploadError('')
    setUploadingImages(true)

    try {
      const uploads: string[] = []
      for (const file of Array.from(files)) {
        const extension = file.name.split('.').pop() || 'png'
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`
        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          })

        if (uploadError) {
          throw uploadError
        }

        const { data } = supabase.storage
          .from('property-images')
          .getPublicUrl(fileName)

        if (data?.publicUrl) {
          uploads.push(data.publicUrl)
        }
      }

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploads],
      }))
    } catch (error) {
      console.error('Image upload error:', error)
      setUploadError('Unable to upload images. Confirm the "property-images" bucket exists and allows public access.')
    } finally {
      setUploadingImages(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, imageIndex) => imageIndex !== index),
    }))
  }

  const triggerImageDialog = () => {
    fileInputRef.current?.click()
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setUploadError('')

    if (!formData.images || formData.images.length === 0) {
      setUploadError('Please upload at least one image before saving this property.')
      return
    }

    setLoading(true)

    try {
      // Get the user's session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setUploadError('Your session has expired. Please log in again.')
        setLoading(false)
        return
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      }

      if (editingProperty) {
        const response = await fetch(`/api/properties/${editingProperty.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await fetchProperties()
          resetForm()
        }
      } else {
        const response = await fetch('/api/properties', {
          method: 'POST',
          headers,
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          await fetchProperties()
          resetForm()
        }
      }
    } catch (err) {
      console.error('Error saving property:', err)
    } finally {
      setLoading(false)
    }
  }
  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setFormData(property)
    setShowForm(true)
    setUploadError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    setLoading(true)
    try {
      // Get the user's session token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        alert('Your session has expired. Please log in again.')
        setLoading(false)
        return
      }

      const response = await fetch(`/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (response.ok) {
        await fetchProperties()
      }
    } catch (err) {
      console.error('Error deleting property:', err)
    } finally {
      setLoading(false)
    }
  }
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: 0,
      type: 'Land',
      status: 'Available',
      location: '',
      area_sq_m: 0,
      images: [],
      features: [],
      latitude: undefined,
      longitude: undefined,
    })
    setEditingProperty(null)
    setShowForm(false)
    setUploadError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const statusStyles: Record<Property['status'], string> = {
    Available: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    'Under Offer': 'border-amber-200 bg-amber-50 text-amber-700',
    Sold: 'border-slate-200 bg-slate-100 text-slate-700',
  }

  const propertyCountLabel = properties.length === 1 ? 'asset' : 'assets'
  const propertyCountValue = properties.length.toLocaleString()
  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950">
        <div className="absolute -top-40 left-[-20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-orange-500/30 via-amber-400/20 to-transparent blur-3xl" />
        <div className="absolute top-40 right-[-20%] h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-slate-800/50 via-slate-900/40 to-transparent blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-[20rem] w-[70%] -translate-x-1/2 bg-gradient-to-t from-orange-500/10 via-transparent to-transparent blur-3xl" />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
          <div className="grid w-full max-w-6xl items-center gap-12 rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:grid-cols-[1.15fr_1fr] md:p-14">
            <div className="hidden h-full flex-col justify-between rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-12 shadow-[0_45px_90px_-45px_rgba(8,15,30,0.85)] md:flex">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
                  Solani Construction
                </p>
                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
                  Property Management Command Suite
                </h1>
                <p className="mt-6 text-base leading-relaxed text-white/70">
                  Securely manage development portfolios with precision workflows, intelligent insights, and enterprise-grade oversight designed for market-leading teams.
                </p>
              </div>
            </div>
            <div className="rounded-[1.5rem] bg-white p-10 shadow-[0_40px_80px_-40px_rgba(15,23,42,0.45)]">
              <div className="mb-8 flex justify-center">
                <div className="relative h-16 w-48">
                  <Image
                    src="/logo.png"
                    alt="Solani Construction"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Authorised Access
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  Sign in to the Admin Console
                </h2>
                <p className="mt-3 text-sm text-slate-500">
                  Enter your corporate credentials to access the property management system.
                </p>
              </div>

              {loginError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 px-5 py-4">
                  <p className="text-sm font-medium text-red-600">{loginError}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
                    placeholder="name@solani-enterprise.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
                >
                  Access Dashboard
                </button>
              </form>

              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="text-xs text-slate-400">
                  Need assistance? Contact your Solani system administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-orange-200 bg-white">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">
                Solani Property Command
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Admin Dashboard</h1>
              <p className="mt-2 text-sm text-slate-600">
                Oversee acquisitions, sales, and operations within a unified control centre.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center border border-slate-900 bg-orange-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 focus:ring-offset-white"
            >
              Sign Out
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-16">
          <section className="mt-12 space-y-10">
            <div className="flex flex-col justify-between gap-6 border border-slate-200 bg-white px-8 py-7 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-500">
                  Portfolio Overview
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Property Management</h2>
                <p className="mt-3 text-sm text-slate-600">
                  {propertyCountValue} {propertyCountLabel} currently catalogued in the system.
                </p>
              </div>
              {!showForm && (
                <button
                  onClick={() => {
                    setShowForm(true)
                    setUploadError('')
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="inline-flex items-center justify-center bg-orange-500 px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <span aria-hidden className="mr-3 text-base leading-none">+</span>
                  New Property
                </button>
              )}
            </div>
            {showForm && (
              <div className="border border-slate-200 bg-white px-8 py-10 text-slate-900 md:px-12 md:py-12">
                <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      Property Form
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                      {editingProperty ? 'Edit Property' : 'Create New Property'}
                    </h3>
                    <p className="mt-3 text-sm text-slate-500">
                      Complete the fields below to {editingProperty ? 'update this asset record.' : 'register a new asset in the portfolio.'}
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center border border-slate-400 text-slate-500 transition hover:border-slate-900 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    title="Close form"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-10 space-y-10">
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Section 01</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">Basic Information</h4>
                      </div>
                      <p className="text-xs text-slate-500 md:max-w-sm">
                        Provide core identifiers used throughout reporting and presentation layers.
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleFormChange}
                          className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="Prime Commercial Land - Bibiani"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleFormChange}
                          className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          required
                        >
                          <option value="Land">Land</option>
                          <option value="Residential">Residential</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Industrial">Industrial</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Status <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleFormChange}
                          className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          required
                        >
                          <option value="Available">Available</option>
                          <option value="Under Offer">Under Offer</option>
                          <option value="Sold">Sold</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleFormChange}
                          className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="Bibiani, Western North Region"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Price (GHS) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            GHS
                          </span>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleFormChange}
                            className="w-full border border-slate-300 bg-white pl-20 pr-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="250000"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Area (sqm) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="area_sq_m"
                            value={formData.area_sq_m}
                            onChange={handleFormChange}
                            className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                            placeholder="1500"
                            required
                          />
                          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                            SQM
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Latitude <span className="text-slate-400">(Optional)</span>
                        </label>
                        <input
                          type="number"
                          step="any"
                          name="latitude"
                          value={formData.latitude || ''}
                          onChange={handleFormChange}
                          className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="6.4600"
                        />
                        <p className="text-xs text-slate-500">Used for geospatial mapping layers.</p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                          Longitude <span className="text-slate-400">(Optional)</span>
                        </label>
                        <input
                          type="number"
                          step="any"
                          name="longitude"
                          value={formData.longitude || ''}
                          onChange={handleFormChange}
                          className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                          placeholder="-2.3200"
                        />
                        <p className="text-xs text-slate-500">Ensure accuracy for precise map placement.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Section 02</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">Property Details</h4>
                      </div>
                      <p className="text-xs text-slate-500 md:max-w-sm">
                        Craft a compelling narrative highlighting value, accessibility, and opportunity.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className="min-h-[10rem] w-full border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="Detail the strategic advantages, surrounding infrastructure, and development potential."
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Section 03</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">Property Images</h4>
                      </div>
                      <p className="text-xs text-slate-500 md:max-w-sm">
                        Upload imagery directly from your device. Files are stored in the Solani property media library for reuse.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Property Images <span className="text-red-500">*</span>
                      </label>
                      <p className="text-xs text-slate-500">
                        Upload photos directly from your device. The first uploaded file becomes the featured image.
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={triggerImageDialog}
                          disabled={uploadingImages}
                          className="bg-orange-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:bg-orange-300"
                        >
                          {uploadingImages ? 'Uploading...' : 'Upload Images'}
                        </button>
                        <span className="text-xs text-slate-500">
                          {formData.images?.length || 0} file{formData.images && formData.images.length === 1 ? '' : 's'} ready.
                        </span>
                      </div>
                      {uploadError && (
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600">
                          {uploadError}
                        </p>
                      )}
                      <div className="space-y-3">
                        {(formData.images || []).length === 0 ? (
                          <div className="border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                            No images uploaded yet.
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {(formData.images || []).map((image, index) => (
                              <li
                                key={`${image}-${index}`}
                                className="flex items-center justify-between border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="relative h-14 w-20 overflow-hidden border border-slate-200">
                                    <Image src={image} alt={`Property ${index + 1}`} fill className="object-cover" />
                                  </div>
                                  <span className="max-w-xs break-all text-xs text-slate-500">{image}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(index)}
                                  className="border border-slate-400 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 transition hover:border-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Section 04</p>
                        <h4 className="mt-2 text-lg font-semibold text-slate-900">Property Features</h4>
                      </div>
                      <p className="text-xs text-slate-500 md:max-w-sm">
                        Outline differentiators, amenities, and infrastructure advantages per line.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                        Features <span className="text-slate-400">(Optional)</span>
                      </label>
                      <div className="border border-slate-200 bg-slate-50 px-5 py-4 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700">Recommended entries</p>
                        <div className="mt-3 grid gap-x-6 gap-y-2 md:grid-cols-2">
                          <span>Main road frontage</span>
                          <span>Utilities pre-installed</span>
                          <span>24/7 security perimeter</span>
                          <span>Proximity to transit corridors</span>
                          <span>Commercial zoning approval</span>
                          <span>Potable water access</span>
                        </div>
                      </div>
                      <textarea
                        value={formData.features?.join('\n') || ''}
                        onChange={(e) => handleFeaturesChange(e.target.value)}
                        className="min-h-[8rem] w-full border border-slate-300 bg-white px-4 py-4 text-sm text-slate-900 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
                        placeholder="Main road frontage\nUtilities pre-installed\nPerimeter fencing completed"
                      />
                      <p className="text-xs text-slate-500">
                        {formData.features?.length || 0} feature{formData.features && formData.features.length === 1 ? '' : 's'} documented.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 md:flex-row">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-orange-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300 disabled:bg-orange-300"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Saving...
                        </span>
                      ) : (
                        <span>{editingProperty ? 'Update Property' : 'Create Property'}</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="border border-slate-900 px-8 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            <div className="border border-slate-200 bg-white text-slate-900">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px]">
                    <thead>
                      <tr className="bg-orange-500 text-left text-xs font-semibold uppercase tracking-[0.3em] text-white">
                        <th className="px-6 py-5">Property</th>
                        <th className="px-6 py-5">Type</th>
                        <th className="px-6 py-5">Location</th>
                        <th className="px-6 py-5">Price</th>
                        <th className="px-6 py-5">Status</th>
                        <th className="px-6 py-5">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {loading && properties.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center justify-center gap-4">
                              <svg className="h-12 w-12 animate-spin text-slate-900" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <p className="text-sm font-medium text-slate-600">Loading property records...</p>
                            </div>
                          </td>
                        </tr>
                      ) : properties.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-24 text-center">
                            <div className="mx-auto max-w-md space-y-4">
                              <p className="text-lg font-semibold text-slate-900">No properties available yet</p>
                              <p className="text-sm text-slate-500">
                                Add your first property to populate the management workspace.
                              </p>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        properties.map((property) => (
                          <tr key={property.id} className="transition hover:bg-orange-50">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-5">
                                <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden border border-slate-200">
                                  <Image
                                    src={property.images[0] || '/placeholder.jpg'}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">{property.title}</p>
                                  <div className="mt-2 text-xs text-slate-500">
                                    <span className="font-semibold uppercase tracking-[0.25em] text-slate-400">Floor Area</span>
                                    <span className="ml-3 text-slate-600">{property.area_sq_m.toLocaleString()} sqm</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="inline-flex items-center border border-slate-300 bg-slate-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                                {property.type}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="space-y-1 text-sm text-slate-600">
                                <p className="font-semibold text-slate-900">{property.location}</p>
                                <p className="text-xs text-slate-500">Geocoded: {property.latitude ?? 'N/A'}, {property.longitude ?? 'N/A'}</p>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <p className="text-lg font-semibold text-slate-900">
                                GHS {property.price.toLocaleString()}
                              </p>
                            </td>
                            <td className="px-6 py-5">
                              <span className={`inline-flex items-center border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] ${statusStyles[property.status]}`}>
                                {property.status}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleEdit(property)}
                                  className="inline-flex items-center justify-center border border-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-900 transition hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(property.id)}
                                  className="inline-flex items-center justify-center border border-red-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-600 transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-200"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
