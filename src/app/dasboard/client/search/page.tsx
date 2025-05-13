// app/dashboard/client/search/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Stylist {
  id: string
  name: string
  specialties: string[]
  avatarUrl: string
}

export default function SearchStylistsPage() {
  const [query, setQuery] = useState('')
  const [stylists, setStylists] = useState<Stylist[]>([])

  useEffect(() => {
    // Simulación: reemplaza por fetch a tu backend
    const fetchStylists = async () => {
      const dummyStylists: Stylist[] = [
        {
          id: '1',
          name: 'Ana López',
          specialties: ['Color', 'Corte'],
          avatarUrl: '/placeholder/avatar1.png',
        },
        {
          id: '2',
          name: 'Carlos Gómez',
          specialties: ['Barbería', 'Corte'],
          avatarUrl: '/placeholder/avatar2.png',
        },
      ]
      setStylists(dummyStylists)
    }

    fetchStylists()
  }, [])

  const filtered = stylists.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Buscar estilistas</h2>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((stylist) => (
          <Link
            href={`/dashboard/client/stylist/${stylist.id}`}
            key={stylist.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <img
                src={stylist.avatarUrl}
                alt={stylist.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold">{stylist.name}</h3>
                <p className="text-sm text-gray-500">
                  {stylist.specialties.join(', ')}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
