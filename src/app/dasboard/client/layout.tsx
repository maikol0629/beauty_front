// app/dashboard/client/layout.tsx
import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import { ReactNode } from 'react'

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-gray-900">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar role="CLIENT"> {children}</Sidebar> 
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  )
}
