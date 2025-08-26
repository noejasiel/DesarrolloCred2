'use client';

import { useEffect, useRef } from 'react';


export default function FeaturesBanner() {
 

  return (
    <section className="relative bg-[#0141a5] text-white py-20 px-6 md:px-20 overflow-hidden">
      <h2 className="text-4xl md:text-6xl font-bold mb-16">
        La seguridad de tu dinero es nuestra prioridad
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        <div>
          <div className="text-3xl mb-2">🛡️</div>
          <p className="text-lg">Entidad financiera autorizada y supervisada por la CNBV</p>
        </div>
        <div>
          <div className="text-3xl mb-2">🔒</div>
          <p className="text-lg">
            Producto asegurado por el Fondo de Protección hasta por 25 mil UDIS
          </p>
        </div>
        <div>
          <div className="text-3xl mb-2">****</div>
          <p className="text-lg">
            Doble factor de autenticación para operaciones más seguras
          </p>
        </div>
      </div>
      </section>

  );
}
