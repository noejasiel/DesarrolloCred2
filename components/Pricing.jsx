'use client';

import { useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

const features = [
  "Transferencias ilimitadas 24 horas 7 días a la semana",
  "Recibe rendimiento del 4% anual. Sin saldo mínimo ni plazos forzosos",
  "Tarjetas de débito virtuales ilimitadas",
  "Soporte y atención personalizada en todo momento",
  "Multi-usuarios ilimitados con control de roles y permisos",
  "Dispersión masiva de pagos para una operación más eficaz",
  "Acceso a beneficios de alianzas exclusivas",
];

export const PricingCard = () => {
  const [tab, setTab] = useState('Profesionales');
  const [expanded, setExpanded] = useState(true);
  const contentRef = useRef(null);
  const cardRef = useRef(null); // Referencia al wrapper principal

  const toggleExpanded = () => {
    if (!contentRef.current) return;

    const el = contentRef.current;
    const isExpanding = !expanded;

    if (isExpanding && el.style.height === 'auto') {
      el.style.height = `${el.scrollHeight}px`;
    }

    gsap.killTweensOf(el);

    gsap.to(el, {
      height: isExpanding ? el.scrollHeight : 0,
      duration: 0.25,
      ease: 'power2.inOut',
      onComplete: () => {
        if (isExpanding) {
          el.style.height = 'auto';
        }

        // Centrar siempre después de animar
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      },
    });

    setExpanded(isExpanding);
  };

  useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.overflow = 'hidden';
      contentRef.current.style.height = 'auto';
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center bg-[#f8f8f8] min-h-screen py-20">
      <div
        ref={cardRef}
        className="w-[90%] xl:w-[70%] min-h-[400px] p-6 bg-white rounded-2xl shadow-md transition-all"
      >
        <h2 className="text-3xl md:text-5xl font-semibold text-center">Sin cobros sorpresa</h2>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Un costo único mensual para cada tipo de negocio
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-6 gap-2">
          {['Empresas', 'Profesionales'].map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                tab === option ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
              }`}
              onClick={() => setTab(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Precio */}
        <div className="text-right text-lg font-semibold text-gray-800 mb-4">
          $349 <span className="text-sm font-normal text-gray-500">+ IVA / mes</span>
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2">Para empresas en crecimiento</h3>
        <hr className="mb-4 border-gray-300" />

        {/* Contenido animado */}
        <div ref={contentRef}>
          <ul className="divide-y divide-gray-300">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center justify-between py-3 text-sm text-gray-800">
                {feature}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
            Prueba 1 mes gratis
          </button>
          <button
            className="text-sm font-medium text-gray-800 hover:underline  hidden md:block"
            onClick={toggleExpanded}
          >
            {expanded ? 'Mostrar menos ↑' : 'Más información ↓'}
          </button>
        </div>
      </div>
    </div>
  );
};
