'use client'
import React, { useState, useEffect } from "react";

export default function MainPrestamos({
  rightBgUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuAzJLX0YJoh_7prcqaygKfiZDyP0Jf72IxvQPBmZje4XE4OXOk0WRcMoOpUscBk-gLNKjDM2U9QpQSf2KZGkxblLaJj6gFeS_mQhV3wc0voOA4s7lEmOB_fgYgnOAcbyR92nSnn9wRxDYbDYPIMSHF7lTOu1vjRw9LnbNw4yb-fQmj-E07qKE67xUmYmXw0prng4c-_9ClR6C8XUMwvDsR6j38s1KprIMONqdj5pSN3RGfWazNpVQnag29w2QvjsqJa6WEFEL8wA7O4",
}) {
  const [monto, setMonto] = useState(20000);
  const [años, setAños] = useState(1);
  const [pagoMensual, setPagoMensual] = useState(1916.66);

  useEffect(() => {
    const meses = años * 12;
    const comision = monto * 0.15;
    const total = monto + comision;
    const pago = total / meses;
    setPagoMensual(pago);
  }, [monto, años]);

  const formatoMoneda = (cantidad) => {
    return `$${cantidad.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleMontoChange = (e) => {
    setMonto(parseInt(e.target.value));
  };

  const handleAñosChange = (e) => {
    setAños(parseInt(e.target.value));
  };

  return (
    <main className="relative z-20 pt-28 md:pt-0 flex items-center min-h-screen bg-white overflow-hidden">
    

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-16 relative">
        {/* Columna de texto (lado blanco) */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Financiamiento para{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r bg-[#0045ac] ">
                hacer crecer
              </span>
            </span>{" "}
            tu negocio.
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
            Obtén el capital que necesitas para llevar tu empresa al siguiente
            nivel. Préstamos rápidos, flexibles y diseñados para emprendedores
            como tú.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <button className="bg-gradient-to-r from-[#0389f7] via-[#0046ae] to-[#bf48e1] text-white font-bold py-4 px-10 rounded-full inline-flex items-center space-x-3 shadow-2xl shadow-blue-500/40 hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1">
              <span>Solicitar Préstamo</span>
            </button>

           
          </div>
        </div>

        {/* Columna visual (calculadora con glass + halo animado) */}
        <div className="w-[100%] lg:w-1/2 flex justify-center floating">
          <div className="relative w-full max-w-md">
            {/* Halo animado detrás de la calculadora */}
            <div className="absolute -inset-8 bg-gradient-to-br from-[#0389f7] via-[#0046ae] to-[#bf48e1] rounded-full opacity-40 blur-3xl animate-pulse-slow" />

            <div className="relative glass-effect p-8 rounded-3xl text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Calcula tu préstamo
              </h3>
              
              {/* Sección de monto */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Monto requerido: <span className="font-bold text-[#0389f7]" id="cantidad">{formatoMoneda(monto)}</span>
                </p>
                <input 
                  type="range" 
                  id="rango" 
                  min="20000" 
                  max="6000000" 
                  step="10000" 
                  value={monto}
                  onChange={handleMontoChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <hr className="border-gray-300 my-6" />

              {/* Sección de plazo */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">
                  Plazo para pagar: <span className="font-bold text-[#0389f7]" id="year">{años} año{años > 1 ? 's' : ''}</span>
                </p>
                <input 
                  type="range" 
                  id="rango_year" 
                  min="1" 
                  max="20" 
                  step="1" 
                  value={años}
                  onChange={handleAñosChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <hr className="border-gray-300 my-6" />

              {/* Sección de pago mensual */}
              <div className="mb-6">
                <p className="text-gray-700 mb-2">Pago mensual:</p>
                <p className="text-3xl font-bold text-[#009dfc]" id="payment">{formatoMoneda(pagoMensual)}</p>
              </div>

              <button className="w-full bg-[#009dfc] text-white font-bold py-3 rounded-full hover:bg-[#0389f7] transition-colors transform hover:scale-105">
                Aplica Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos mínimos necesarios para este main */}
      <style>{`
        .glass-effect {
          background: #ffffff82;  
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-radius: 20px;
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-16px)} 100%{transform:translateY(0)} }
        .floating { animation: float 6s ease-in-out infinite; }
        @keyframes pulse-slow { 50% { opacity: 0.75; transform: scale(1.05); } }
        .animate-pulse-slow { animation: pulse-slow 5s cubic-bezier(0.4,0,0.6,1) infinite; }
        
        /* Estilos personalizados para los sliders */
        .slider {
          -webkit-appearance: none;
          appearance: none;
          background: #e5e7eb;
          border-radius: 8px;
          outline: none;
          transition: background 0.3s;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: #0389f7;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(3, 137, 247, 0.4);
          transition: all 0.3s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #0046ae;
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(3, 137, 247, 0.6);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #0389f7;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(3, 137, 247, 0.4);
          transition: all 0.3s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          background: #0046ae;
          transform: scale(1.1);
        }
        
        .slider:focus {
          background: #d1d5db;
        }
      `}</style>
    </main>
  );
}
