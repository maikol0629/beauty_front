"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"

interface SidebarLink {
  href: string
  label: string
  icon?: React.ReactNode
  subLinks?: SidebarLink[]
}

interface SidebarProps {
  role: "CLIENT" | "STYLIST" | null
  children: React.ReactNode
}

export default function Sidebar({ role, children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})
  const pathname = usePathname()

  const clientLinks: SidebarLink[] = [
    { href: "/dashboard/client", label: "Inicio" },
    { href: "/dashboard/client/search", label: "Buscar estilistas" },
    { href: "/dashboard/client/bookings", label: "Mis citas" },
    { href: "/dashboard/client/history", label: "Historial" },
    { href: "/dashboard/client/profile", label: "Perfil" },
  ]

  const stylistLinks: SidebarLink[] = [
    { href: "/dashboard/stylist", label: "Inicio" },
    {
      href: "#",
      label: "Agenda",
      subLinks: [
        { href: "/dashboard/stylist/appointments", label: "Citas" },
        { href: "/dashboard/stylist/calendar", label: "Calendario" },
      ],
    },
    { href: "/dashboard/stylist/services", label: "Servicios" },
    { href: "/dashboard/stylist/clients", label: "Clientes" },
    {
      href: "#",
      label: "Reportes",
      subLinks: [
        { href: "/dashboard/stylist/reports/sales", label: "Ventas" },
        { href: "/dashboard/stylist/reports/clients", label: "Clientes" },
      ],
    },
    { href: "/dashboard/stylist/profile", label: "Perfil" },
  ]

  const links = role === "CLIENT" ? clientLinks : stylistLinks

  const toggleGroup = (label: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const renderLink = (link: SidebarLink) => {
    const isActive = pathname === link.href
    const hasSubLinks = link.subLinks && link.subLinks.length > 0
    const isExpanded = expandedGroups[link.label]

    if (hasSubLinks) {
      return (
        <div key={link.label}>
          <button
            onClick={() => toggleGroup(link.label)}
            className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-100 rounded"
          >
            <span className="flex items-center">
              {link.icon && <span className="mr-2">{link.icon}</span>}
              {link.label}
            </span>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {link.subLinks?.map((subLink) => (
                <Link
                  key={subLink.href}
                  href={subLink.href}
                  className={`block p-2 text-sm hover:bg-gray-100 rounded ${
                    pathname === subLink.href ? "bg-primary/10 text-primary font-medium" : ""
                  }`}
                >
                  {subLink.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        className={`block p-2 hover:bg-gray-100 rounded flex items-center ${
          isActive ? "bg-primary/10 text-primary font-medium" : ""
        }`}
      >
        {link.icon && <span className="mr-2">{link.icon}</span>}
        {link.label}
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <button onClick={() => setIsOpen(!isOpen)} className="p-3 rounded-full bg-primary text-white shadow-lg">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white border-r border-gray-200 p-4 fixed inset-y-0 left-0 z-10 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">StyleConnect</h2>
            <button onClick={() => setIsOpen(false)} className="md:hidden p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <Link href="/logout" className="block p-2 hover:bg-gray-100 rounded text-red-600">
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isOpen ? "md:ml-64" : ""} md:ml-64`}>
        {children}
      </main>
    </div>
  )
}
