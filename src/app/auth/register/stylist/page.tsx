'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone } from 'lucide-react'

export default function RegisterClient() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone:'' })
  const router = useRouter()

  const handleSubmit = async () => {
    const res = await fetch('localhohost:8080/api/auth/register/client', {
      method: 'POST',
      body: JSON.stringify({ ...form, role: 'CLIENT' }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) router.push('/auth/login')
    else alert('Error al registrarse')
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Registro Cliente</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Nombre"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="w-full border p-2 mb-3"
        placeholder="Correo"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full border p-2 mb-3"
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        type="number"
        placeholder="Teléfono"
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <button className="bg-primary text-white w-full py-2 rounded" onClick={handleSubmit}>
        Registrarse
      </button>
    </div>
  )
}
