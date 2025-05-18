'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const base_url = process.env.NEXT_PLUBLIC_API_URL
  const handleLogin = async () => {
    setError('')
    try {
      const res = await fetch(base_url+'/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) throw new Error('Credenciales inválidas')
      const data = await res.json()

      // Simular almacenamiento del JWT
      localStorage.setItem('token', data.token)

      // Redirigir según el rol
      if (data.role === 'CLIENT') router.push('/dashboard/client')
      else if (data.role === 'STYLIST') router.push('/dashboard/stylist')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Iniciar sesión</h2>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full border p-2 mb-3"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <button className="bg-primary text-white w-full py-2 rounded" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  )
}
