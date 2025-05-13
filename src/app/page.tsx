// LandingPage.tsx (versión modificada)
import Link from 'next/link';
import { ScissorsIcon, UserIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/login" className="text-gray-600 hover:text-purple-600">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container">
        <div className="hero-section">
          <h1 className="hero-heading">Transforma tu experiencia de belleza</h1>
          <p className="hero-text">
            Conectamos estilistas profesionales con clientes que buscan servicios de calidad
          </p>
          
          <div className="flex justify-center gap-6 mb-16">
            <Link
              href="/auth/register/stylist"
              className="button button-primary"
            >
              <ScissorsIcon className="icon-white h-5 w-5 mr-2" />
              Soy Estilista
            </Link>
            <Link
              href="/auth/register/client"
              className="button button-secondary"
            >
              <UserIcon className="icon-white h-5 w-5 mr-2" />
              Soy Cliente
            </Link>
          </div>
        </div>

        {/* Beneficios */}
        <div className="benefits-grid">
          {/* Para Estilistas */}
          <div className="benefit-card">
            <h2 className="benefit-title">
              <SparklesIcon className="icon-purple h-6 w-6 mr-2" />
              Para Profesionales
            </h2>
            <ul className="space-y-4">
              <BenefitItem icon={CalendarIcon} title="Gestión de Citas">
                Organiza y controla tu agenda de manera eficiente
              </BenefitItem>
              {/* ... otros items */}
            </ul>
          </div>

          {/* Para Clientes */}
          <div className="benefit-card">
            <h2 className="benefit-title">
              <SparklesIcon className="icon-pink h-6 w-6 mr-2" />
              Para Clientes
            </h2>
            <ul className="space-y-4">
              {/* ... items */}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} StyleConnect. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

// BenefitItem component manteniendo la lógica pero usando las nuevas clases
function BenefitItem({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <li className="benefit-item">
      <div className="benefit-icon">
        <Icon className="icon-purple" />
      </div>
      <div className="benefit-content">
        <h3 className="benefit-item-title">{title}</h3>
        <p className="benefit-item-text">{children}</p>
      </div>
    </li>
  );
}