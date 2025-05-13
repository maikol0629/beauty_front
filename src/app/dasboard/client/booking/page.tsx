// src/app/dashboard/client/booking/page.tsx
'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Service {
  id: string
  name: string
  duration: number
  price: number
}

interface Stylist {
  id: string
  name: string
  avatarUrl: string
  services: Service[]
  availableSlots: string[]
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const stylistId = searchParams.get('stylistId')
  const serviceId = searchParams.get('serviceId')

  const [stylist, setStylist] = useState<Stylist | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  useEffect(() => {
    // Simulación de fetch
    const fetchData = async () => {
      const dummy: Stylist = {
        id: stylistId!,
        name: 'Ana López',
        avatarUrl: '/placeholder/avatar1.png',
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

    if (stylistId) fetchData()
  }, [stylistId])

  const selectedService = stylist?.services.find((s) => s.id === serviceId)

  const handleConfirm = async () => {
    if (!selectedSlot || !stylistId || !serviceId) return

    // Aquí deberías hacer POST al backend para crear la cita
    console.log('Agendando cita:', {
      stylistId,
      serviceId,
      slot: selectedSlot,
    })

    // Simular éxito
    alert('¡Cita agendada con éxito!')
    router.push('/dashboard/client/bookings')
  }

  if (!stylist || !selectedService) return <p>Cargando...</p>

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Agendar cita</h2>

      <div className="flex items-center space-x-4">
        <img src={stylist.avatarUrl} alt={stylist.name} className="w-16 h-16 rounded-full" />
        <div>
          <p className="text-lg font-bold">{stylist.name}</p>
          <p className="text-gray-600">{selectedService.name} · {selectedService.duration} min · ${selectedService.price}</p>
        </div>
      </div>

      <div>
        <h3 className="font-medium">Selecciona un horario disponible</h3>
        <div className="grid md:grid-cols-3 gap-2 mt-2">
          {stylist.availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`p-2 rounded border ${
                selectedSlot === slot ? 'bg-primary text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {new Date(slot).toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <button
        disabled={!selectedSlot}
        onClick={handleConfirm}
        className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Confirmar cita
      </button>
    </div>
  )
}
