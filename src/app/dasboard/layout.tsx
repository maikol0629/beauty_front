// app/dashboard/layout.tsx
import type { Metadata } from 'next'
import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import { verifyJWT, getUserFromToken } from '@/app/lib/auth' // debes implementar esto

export const metadata: Metadata = {
  title: 'Panel de Usuario',
  description: 'Panel personalizado para cada rol',
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Simulación (real: decodifica JWT desde cookie)
  const token = '' // Leer desde cookies con headers o next-auth
  const user = await getUserFromToken(token)

  if (!user) {
    // Redirección en servidor si no hay token válido
    return (
      <div className="p-4 text-center text-red-500">
        Acceso denegado. Inicia sesión.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-gray-900">
      <Navbar />
      <Sidebar role={null}>
        
        {children}
      </Sidebar>
    </div>
  )
}
