'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollStackItemProps {
  children: ReactNode
  index?: number
}

export function ScrollStackItem({ children, index = 0 }: ScrollStackItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const item = itemRef.current
    if (!item) return

    const handleScroll = () => {
      const rect = item.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight))
      
      const scale = 0.9 + scrollProgress * 0.1
      const translateX = (1 - scrollProgress) * 300
      
      item.style.transform = `translateX(${translateX}px) scale(${scale})`
      item.style.opacity = '1'
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={itemRef}
      className="sticky mb-8 transition-all duration-300 ease-out"
      style={{
        top: `${80 + index * 40}px`,
      }}
    >
      {children}
    </div>
  )
}

interface ScrollStackProps {
  children: ReactNode
}

export default function ScrollStack({ children }: ScrollStackProps) {
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className="relative">
      {childrenArray.map((child, index) => (
        <ScrollStackItem key={index} index={index}>
          {child}
        </ScrollStackItem>
      ))}
    </div>
  )
}
