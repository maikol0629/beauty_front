"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, User, LogOut } from "lucide-react"
import Button from "./Button"

interface NavbarProps {
  isAuthenticated?: boolean
  userName?: string
  userRole?: "CLIENT" | "STYLIST"
}

export default function Navbar({ isAuthenticated = false, userName = "", userRole }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">StyleConnect</span>
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href={`/dashboard/${userRole?.toLowerCase()}`}
                  className="text-gray-600 hover:text-primary px-3 py-2"
                >
                  Dashboard
                </Link>
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-700 mr-2">{userName}</span>
                    <Link href="/profile" className="p-1 rounded-full text-gray-500 hover:text-primary">
                      <User size={20} />
                    </Link>
                    <Link href="/logout" className="p-1 rounded-full text-gray-500 hover:text-primary">
                      <LogOut size={20} />
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/about" className="text-gray-600 hover:text-primary px-3 py-2">
                  Acerca de
                </Link>
                <Link href="/services" className="text-gray-600 hover:text-primary px-3 py-2">
                  Servicios
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-primary px-3 py-2">
                  Contacto
                </Link>
                <Button href="/login" variant="outline" size="sm">
                  Iniciar Sesión
                </Button>
                <Button href="/register" variant="primary" size="sm">
                  Registrarse
                </Button>
              </>
            )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Abrir menú</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              <>
                <Link
                  href={`/dashboard/${userRole?.toLowerCase()}`}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Perfil
                </Link>
                <Link
                  href="/logout"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Cerrar Sesión
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/about"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Acerca de
                </Link>
                <Link
                  href="/services"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Servicios
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                >
                  Contacto
                </Link>
                <div className="mt-4 px-3 space-y-2">
                  <Button href="/login" variant="outline" className="w-full">
                    Iniciar Sesión
                  </Button>
                  <Button href="/register" variant="primary" className="w-full">
                    Registrarse
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
