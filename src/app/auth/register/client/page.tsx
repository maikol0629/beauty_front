'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterClient() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const router = useRouter()
const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
  const handleSubmit = async () => {
    const res = await fetch(`${baseUrl}/app/auth/register/client`, {
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

      <button className="bg-primary text-white w-full py-2 rounded" onClick={handleSubmit}>
        Registrarse
      </button>
    </div>
  )
}
