'use client';

import { useEffect, useRef } from 'react';


export default function FeaturesBanner() {
 

  return (
    <section className="relative bg-[#0141a5] text-white py-20 px-6 md:px-20 overflow-hidden">
      <h2 className="text-4xl md:text-6xl font-bold mb-16">
        Tu tranquilidad financiera es nuestro compromiso
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <div>
          <div className="text-3xl mb-2">🏦</div>
          <p className="text-lg">Asesoría crediticia especializada </p>
        </div>
        <div>
          <div className="text-3xl mb-2">📊</div>
          <p className="text-lg">
            Análisis personalizado de tu perfil crediticio para obtener las mejores condiciones
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">🤝</div>
          <p className="text-lg">
            Acompañamiento completo durante todo el proceso de solicitud y aprobación
          </p>
        </div>
      </div>
      </section>

  );
}
