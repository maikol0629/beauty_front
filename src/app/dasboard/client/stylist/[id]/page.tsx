// app/dashboard/client/stylist/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  duration: number // en minutos
  price: number
}

interface Stylist {
  id: string
  name: string
  bio: string
  avatarUrl: string
  specialties: string[]
  services: Service[]
  availableSlots: string[] // ISO strings
}

export default function StylistProfilePage() {
  const { id } = useParams()
  const [stylist, setStylist] = useState<Stylist | null>(null)

  useEffect(() => {
    // Simulación de fetch (deberías usar fetch(`/api/stylists/${id}`) en producción)
    const fetchStylist = async () => {
      const dummy: Stylist = {
        id: id as string,
        name: 'Ana López',
        bio: 'Especialista en color y corte moderno. Más de 10 años de experiencia.',
        avatarUrl: '/placeholder/avatar1.png',
        specialties: ['Color', 'Corte'],
        services: [
          { id: 's1', name: 'Corte básico', duration: 30, price: 200 },
          { id: 's2', name: 'Color completo', duration: 90, price: 600 },
        ],
        availableSlots: [
          '2025-05-08T10:00:00Z',
          '2025-05-08T11:00:00Z',
          '2025-05-08T15:00:00Z',
        ],
      }
      setStylist(dummy)
    }

    fetchStylist()
  }, [id])

  if (!stylist) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={stylist.avatarUrl}
          alt={stylist.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{stylist.name}</h1>
          <p className="text-gray-600">{stylist.bio}</p>
          <p className="text-sm text-gray-500">
            Especialidades: {stylist.specialties.join(', ')}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Servicios ofrecidos</h2>
        <ul className="space-y-2">
          {stylist.services.map((service) => (
            <li key={service.id} className="p-3 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{service.name}</h3>
                  <p className="text-sm text-gray-500">
                    {service.duration} min · ${service.price}
                  </p>
                </div>
                <Link
                  href={{
                    pathname: '/dashboard/client/bookings/new',
                    query: { stylistId: stylist.id, serviceId: service.id },
                  }}
                  className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90"
                >
                  Agendar
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Horarios disponibles</h2>
        <div className="grid md:grid-cols-3 gap-2">
          {stylist.availableSlots.map((slot) => (
            <div key={slot} className="bg-white rounded p-2 shadow text-sm">
              {new Date(slot).toLocaleString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
