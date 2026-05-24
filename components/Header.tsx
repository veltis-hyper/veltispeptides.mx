'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-black/80 backdrop-blur-md z-50 border-b border-purple-500/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left Side: Logo & Main Navigation Right Next To It */}
        <div className="flex items-center gap-10">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-lg shadow-[0_0_15px_rgba(168,85,247,0.5)] transition duration-300 group-hover:scale-105">
              V
            </span>
            <span className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 transition duration-300 group-hover:from-purple-300 group-hover:to-pink-500">
              VELTIS
            </span>
          </Link>

          {/* Desktop Navigation - Placed Immediately to the Right of the Logo */}
          <nav className="hidden lg:flex items-center gap-6 pl-4 border-l border-purple-500/20">
            <Link
              href="/"
              className="text-purple-200 hover:text-white transition font-semibold text-xs uppercase tracking-[0.15em]"
            >
              Blog
            </Link>
            <Link
              href="/calculadora"
              className="text-purple-300 hover:text-white transition font-medium text-xs uppercase tracking-[0.15em]"
            >
              Calculadora
            </Link>
            <Link
              href="/protocolos"
              className="text-purple-300 hover:text-white transition font-medium text-xs uppercase tracking-[0.15em]"
            >
              Protocolos
            </Link>
            <Link
              href="/afiliados"
              className="text-purple-300 hover:text-white transition font-medium text-xs uppercase tracking-[0.15em]"
            >
              Embajadores
            </Link>
            <Link
              href="https://www.veltispeptides.mx/productos"
              className="text-purple-300 hover:text-white transition font-medium text-xs uppercase tracking-[0.15em]"
            >
              Productos
            </Link>
            <Link
              href="https://www.veltispeptides.mx/coa"
              className="text-purple-300 hover:text-white transition font-medium text-xs uppercase tracking-[0.15em]"
            >
              Lotes HPLC
            </Link>
            <Link
              href="https://www.veltispeptides.mx/distribuidores"
              className="text-purple-300 hover:text-white transition font-medium text-xs uppercase tracking-[0.15em]"
            >
              Distribuidores
            </Link>
          </nav>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="https://www.veltispeptides.mx/productos"
            className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] transition duration-300 transform hover:scale-105"
          >
            Adquirir Moléculas
          </Link>

           {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-purple-300 hover:text-white transition p-2 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-purple-500/20 px-6 py-4 space-y-4 animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-200 hover:text-white transition font-semibold text-sm uppercase tracking-wider"
            >
              Blog
            </Link>
            <Link
              href="/calculadora"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:text-white transition font-medium text-sm uppercase tracking-wider"
            >
              Calculadora
            </Link>
            <Link
              href="/protocolos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:text-white transition font-medium text-sm uppercase tracking-wider"
            >
              Protocolos
            </Link>
            <Link
              href="/afiliados"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:text-white transition font-medium text-sm uppercase tracking-wider"
            >
              Embajadores
            </Link>
            <Link
              href="https://www.veltispeptides.mx/productos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:text-white transition font-medium text-sm uppercase tracking-wider"
            >
              Productos
            </Link>
            <Link
              href="https://www.veltispeptides.mx/coa"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:text-white transition font-medium text-sm uppercase tracking-wider"
            >
              Lotes HPLC
            </Link>
            <Link
              href="https://www.veltispeptides.mx/distribuidores"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:text-white transition font-medium text-sm uppercase tracking-wider"
            >
              Distribuidores
            </Link>
            <Link
              href="https://www.veltispeptides.mx/productos"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-center text-xs uppercase tracking-wider py-3 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            >
              Adquirir Moléculas
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
