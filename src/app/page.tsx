import Link from 'next/link';
import { ScissorsIcon, UserIcon, CalendarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import '@/app/globals.css';
import Navbar from './components/Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar*/}
      <Navbar/>

      {/* Hero Section */}
      <section className="flex-grow flex items-center bg-[var(--color-light)]">
        <div className="container hero-section">
          <h1 className="hero-heading">
            Transforma tu experiencia de belleza
          </h1>
          <p className="hero-text">
            Conectamos estilistas profesionales con clientes que buscan servicios de calidad
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <Link href="/auth/register/stylist" className="button button-primary text-sm sm:text-base">
              <ScissorsIcon className="h-5 w-5 mr-2" />
              Soy Estilista
            </Link>
            <Link href="/auth/register/client" className="button button-secondary text-sm sm:text-base">
              <UserIcon className="h-5 w-5 mr-2" />
              Soy Cliente
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="container">
        <div className="benefits-grid">
          {/* Estilistas */}
          <div className="benefit-card">
            <h2 className="benefit-title">
              <SparklesIcon className="icon-purple h-6 w-6 mr-2" />
              Para Profesionales
            </h2>
            <ul className="space-y-4">
              <BenefitItem icon={CalendarIcon} title="Gestión de Citas">
                Organiza y controla tu agenda de manera eficiente.
              </BenefitItem>
              <BenefitItem icon={UserIcon} title="Clientes Frecuentes">
                Crea tu cartera de clientes y fidelízalos fácilmente.
              </BenefitItem>
            </ul>
          </div>

          {/* Clientes */}
          <div className="benefit-card">
            <h2 className="benefit-title">
              <SparklesIcon className="icon-pink h-6 w-6 mr-2" />
              Para Clientes
            </h2>
            <ul className="space-y-4">
              <BenefitItem icon={CalendarIcon} title="Reserva Rápida">
                Encuentra disponibilidad inmediata con tu estilista ideal.
              </BenefitItem>
              <BenefitItem icon={ScissorsIcon} title="Variedad de Servicios">
                Elige entre cortes, color, peinados y mucho más.
              </BenefitItem>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} StyleConnect. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}

function BenefitItem({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <li className="benefit-item">
      <div className="benefit-icon">
        <Icon className="h-6 w-6 text-[var(--color-primary)]" />
      </div>
      <div className="benefit-content">
        <h3 className="benefit-item-title">{title}</h3>
        <p className="benefit-item-text">{children}</p>
      </div>
    </li>
  );
}
