// app/dashboard/client/page.tsx
export default function ClientHomePage() {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">¡Bienvenido de nuevo!</h1>
        <p className="text-gray-600">
          Aquí puedes buscar estilistas, agendar citas, revisar tu historial y más.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow">📅 Próxima cita: (placeholder)</div>
          <div className="bg-white p-4 rounded-xl shadow">💬 Última reseña: (placeholder)</div>
        </div>
      </div>
    )
  }
  