'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let hideTimer: NodeJS.Timeout

    const handleStart = () => {
      setIsLoading(true)
      // Auto-hide after 1.5s
      hideTimer = setTimeout(() => setIsLoading(false), 1500)
    }

    const handleEnd = () => {
      if (hideTimer) clearTimeout(hideTimer)
      setIsLoading(false)
    }

    // Listen to navigation events
    window.addEventListener('beforeunload', handleStart)
    
    // Handle back/forward navigation
    window.addEventListener('popstate', handleStart)

    // Intercept link clicks (client-side navigation)
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')
      
      if (link && !link.target && !link.hasAttribute('download')) {
        const href = link.getAttribute('href')
        if (href && !href.startsWith('#') && !href.startsWith('mailto:')) {
          handleStart()
        }
      }
    }

    document.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('beforeunload', handleStart)
      window.removeEventListener('popstate', handleStart)
      document.removeEventListener('click', handleLinkClick)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20">
      <div className="animate-spin-fast rounded-full border-4 border-white bg-white p-4" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        <Image
          src="/logo.png"
          alt="Loading..."
          width={60}
          height={60}
          priority
          className="object-contain"
        />
      </div>
    </div>
  )
}