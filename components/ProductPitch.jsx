'use client'

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function ProductPitch() {
    const benefitsRef = useRef(null);
    const benefitItems = useRef([]);
    const tlRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Crear una timeline para coordinar las animaciones
        tlRef.current = gsap.timeline({
            paused: true,
            onReverseComplete: () => tlRef.current.progress(0)
        }); 
        
        // Añadir cada beneficio a la timeline con stagger
        benefitItems.current.forEach((item, index) => {
            tlRef.current.fromTo(item,
                {  
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    stagger: 0.2
                    
                },
                index * 0.2 // Posición absoluta en la timeline para cada elemento
            );
        });
        
        // Crear el ScrollTrigger que controla la timeline
        ScrollTrigger.create({
            trigger: benefitsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => tlRef.current.play(),
            onLeave: () => tlRef.current.reverse(),
            onEnterBack: () => tlRef.current.play(),
            onLeaveBack: () => tlRef.current.reverse()
        });
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tlRef.current.kill();
        };
    }, []);

    return (
        <section className="px-6 py-20 md:py-32 text-black bg-white font-inter  ">
            <div className="w-[100%] mx-auto md:w-[90%]">
                {/* Título */}
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Potencia tu empresa con <span className="text-[#0045ac]"> - DESARROLLO CREDITICIO EMPRESARIAL</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10">
                        Obtenemos el mejor crédito para tu empresa.
                    </p>
                    <a className="bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition duration-300 text-lg font-semibold shadow-xl inline-flex items-center" href="#">
                        Quieres saber más?
                    </a>
                </div>

                {/* Beneficios */}
                <div ref={benefitsRef} className="mt-24 md:mt-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div ref={el => benefitItems.current[0] = el} className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-200 ease-out hover:shadow-xl hover:scale-[1.02]">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-blue-100 text-blue-600 mb-6 transition-transform duration-200 ease-out group-hover:scale-110">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Crédito en Cuenta Corriente</h3>
                            <p className="text-gray-600">Con fianza, aval y deuda solidaria. Crédito simple y accesible para tu empresa.</p>
                        </div>
                        <div ref={el => benefitItems.current[1] = el} className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-200 ease-out hover:shadow-xl hover:scale-[1.02]">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-green-100 text-green-600 mb-6 transition-transform duration-200 ease-out group-hover:scale-110">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Rango de Financiamiento</h3>
                            <p className="text-gray-600">Desde $70 mil pesos hasta $15 millones de pesos para cubrir todas tus necesidades empresariales.</p>
                        </div>
                        <div ref={el => benefitItems.current[2] = el} className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-200 ease-out hover:shadow-xl hover:scale-[1.02]">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-purple-100 text-purple-600 mb-6 transition-transform duration-200 ease-out group-hover:scale-110">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Asesoría Profesional</h3>
                            <p className="text-gray-600">Nuestros servicios se basan en profundo conocimiento del mercado y experiencia de profesionales altamente capacitados.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
