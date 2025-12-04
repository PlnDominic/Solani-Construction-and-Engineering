'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white text-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Solani Global Limited"
            width={60}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden gap-10 text-xs uppercase tracking-[0.25em] md:flex">
          <li>
            <Link href="/" className="transition-colors hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="transition-colors hover:text-orange-500">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/properties" className="transition-colors hover:text-orange-500">
              Properties
            </Link>
          </li>
          <li>
            <Link href="/rentals" className="transition-colors hover:text-orange-500">
              Rentals
            </Link>
          </li>
          <li>
            <Link href="/csr" className="transition-colors hover:text-orange-500">
              CSR
            </Link>
          </li>
          <li>
            <Link href="/careers" className="transition-colors hover:text-orange-500">
              Careers
            </Link>
          </li>
        </ul>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`h-0.5 w-6 bg-slate-900 transition-all duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 w-full border-b border-slate-200 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? 'top-full opacity-100' : 'top-[-400px] opacity-0'
        }`}
      >
        <ul className="flex flex-col px-6 py-4 text-xs uppercase tracking-[0.25em]">
          <li className="border-b border-slate-100">
            <Link
              href="/"
              onClick={closeMenu}
              className="block py-4 transition-colors hover:text-orange-500"
            >
              Home
            </Link>
          </li>
          <li className="border-b border-slate-100">
            <Link
              href="/about"
              onClick={closeMenu}
              className="block py-4 transition-colors hover:text-orange-500"
            >
              About Us
            </Link>
          </li>
          <li className="border-b border-slate-100">
            <Link
              href="/properties"
              onClick={closeMenu}
              className="block py-4 transition-colors hover:text-orange-500"
            >
              Properties
            </Link>
          </li>
          <li className="border-b border-slate-100">
            <Link
              href="/rentals"
              onClick={closeMenu}
              className="block py-4 transition-colors hover:text-orange-500"
            >
              Rentals
            </Link>
          </li>
          <li className="border-b border-slate-100">
            <Link
              href="/csr"
              onClick={closeMenu}
              className="block py-4 transition-colors hover:text-orange-500"
            >
              CSR
            </Link>
          </li>
          <li>
            <Link
              href="/careers"
              onClick={closeMenu}
              className="block py-4 transition-colors hover:text-orange-500"
            >
              Careers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
