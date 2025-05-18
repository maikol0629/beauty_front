'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { log } from 'console'

export default function RegisterClient() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone:'' })
  const router = useRouter()
  const base_url = process.env.NEXT_PUBLIC_API_URL
  const handleSubmit = async () => {
    try {
      console.log(base_url)
    const res = await fetch('http://localhost:8080/api/auth/register/stylist', {
      method: 'POST',
      body: JSON.stringify({ ...form, role: 'STYLIST' }),
      headers: { 'Content-Type': 'application/json' },
    })
    if (res.ok) { 
      const data = await res.json()
      router.push(`/dashboard/stylist/${data.user?.id}`)
    }
    else alert('Error al registrarse')
    console.log(form)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Registro Estilista</h2>

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

      <button className="bg-primary text-black w-full py-2 rounded" onClick={handleSubmit}>
        Registrarse
      </button>
    </div>
  )
}
