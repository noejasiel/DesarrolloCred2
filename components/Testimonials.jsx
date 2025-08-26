'use client'

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function Testimonials() {
    const testimonialsRef = useRef(null);
    const testimonialCards = useRef([]);
    const carouselRef = useRef(null);
    const tlRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef(null); // Para controlar la animación

    const testimonials = [
        {
            name: "María González",
            role: "Empresaria",
            company: "Restaurante El Sabor",
            content: "Gracias a su asesoría, logré obtener un crédito de $2 millones para expandir mi restaurante. El proceso fue transparente y rápido. Ahora puedo atender a más clientes y mi negocio crece día a día.",
            rating: 5,
            avatar: "👩‍💼"
        },
        {
            name: "Carlos Mendoza",
            role: "Profesional Independiente",
            company: "Consultoría Financiera",
            content: "Como consultor independiente, necesitaba capital de trabajo para proyectos grandes. Ellos me ayudaron a conseguir un crédito en cuenta corriente que me permitió tomar contratos más importantes.",
            rating: 5,
            avatar: "👨‍💻"
        },
        {
            name: "Ana Rodríguez",
            role: "Dueña de Negocio",
            company: "Boutique Moda Elegante",
            content: "Tenía deudas acumuladas y no sabía cómo salir adelante. Su equipo me orientó perfectamente y logré consolidar mis deudas en un solo crédito con mejores condiciones. Mi boutique ahora es rentable.",
            rating: 5,
            avatar: "👗"
        },
        {
            name: "Roberto Silva",
            role: "Emprendedor",
            company: "Taller Mecánico",
            content: "Necesitaba $500 mil para comprar equipos nuevos. Su proceso fue súper ágil y en menos de una semana ya tenía el dinero en mi cuenta. Ahora mi taller puede atender más autos y generar más ingresos.",
            rating: 5,
            avatar: "🔧"
        },
        {
            name: "Patricia López",
            role: "Médica",
            company: "Clínica Dental",
            content: "Como profesional de la salud, necesitaba financiamiento para modernizar mi clínica. Ellos entendieron perfectamente mi situación y me ofrecieron la mejor opción crediticia. Altamente recomendados.",
            rating: 5,
            avatar: "🦷"
        },
        {
            name: "Miguel Torres",
            role: "Constructor",
            company: "Constructora Torres",
            content: "En la construcción necesitamos capital constante para materiales y mano de obra. Su crédito en cuenta corriente me da la flexibilidad que necesito para completar proyectos sin interrupciones.",
            rating: 5,
            avatar: "🏗️"
        },
        {
            name: "Laura Martínez",
            role: "Diseñadora Gráfica",
            company: "Estudio Creativo",
            content: "Para comprar mi primera MacBook Pro y software profesional, necesitaba $150 mil. Su crédito personal fue la solución perfecta. Ahora puedo ofrecer servicios de alta calidad a mis clientes.",
            rating: 5,
            avatar: "🎨"
        },
        {
            name: "Fernando Ruiz",
            role: "Ingeniero",
            company: "Empresa de Software",
            content: "Necesitaba $800 mil para desarrollar una aplicación móvil. Su asesoría me permitió obtener un crédito empresarial con excelentes condiciones. El proyecto ya está generando ingresos.",
            rating: 5,
            avatar: "💻"
        },
        {
            name: "Carmen Vega",
            role: "Farmacéutica",
            company: "Farmacia San José",
            content: "Para renovar el inventario de mi farmacia, necesitaba $1.2 millones. Su proceso fue súper eficiente y en 5 días ya tenía el dinero. Mi farmacia ahora tiene productos de última generación.",
            rating: 5,
            avatar: "💊"
        },
        {
            name: "Diego Herrera",
            role: "Chef Ejecutivo",
            company: "Catering Gourmet",
            content: "Para comprar equipos de cocina profesional y un vehículo de reparto, necesitaba $1.5 millones. Su crédito me permitió expandir mi negocio de catering. Ahora atiendo eventos corporativos importantes.",
            rating: 5,
            avatar: "👨‍🍳"
        },
        {
            name: "Sofía Jiménez",
            role: "Arquitecta",
            company: "Estudio de Arquitectura",
            content: "Para comprar computadoras y software de diseño 3D, necesitaba $300 mil. Su crédito personal fue la solución ideal. Ahora puedo competir con estudios más grandes y ganar proyectos importantes.",
            rating: 5,
            avatar: "🏠"
        },
        {
            name: "Ricardo Morales",
            role: "Abogado",
            company: "Bufete Jurídico",
            content: "Para renovar mi oficina y contratar personal administrativo, necesitaba $600 mil. Su crédito empresarial me permitió modernizar mi bufete. Ahora tengo más clientes y mejor infraestructura.",
            rating: 5,
            avatar: "⚖️"
        }
    ];

    // Duplicar testimonios para carrusel infinito
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        // Crear una timeline para coordinar las animaciones
        tlRef.current = gsap.timeline({
            paused: true,
            onReverseComplete: () => tlRef.current.progress(0)
        });
        
        // Añadir cada testimonio a la timeline con stagger
        testimonialCards.current.forEach((card, index) => {
            tlRef.current.fromTo(card,
                {
                    opacity: 0,
                    y: 60,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.2
                },
                index * 0.15
            );
        });
        
        // Crear el ScrollTrigger que controla la timeline
        ScrollTrigger.create({
            trigger: testimonialsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => tlRef.current.play(),
            onLeave: () => tlRef.current.reverse(),
            onEnterBack: () => tlRef.current.play(),
            onLeaveBack: () => tlRef.current.reverse()
        });

        // Carrusel infinito con control de pausa mejorado
        const carousel = carouselRef.current;
        if (carousel) {
            let currentPosition = 0;
            const speed = 0.5;
            const cardWidth = 382;
            const totalOriginalWidth = cardWidth * testimonials.length;
            
            const animate = () => {
                // Solo continuar si no está pausado
                if (!isPaused) {
                    currentPosition -= speed;
                    
                    // Reinicio imperceptible
                    if (currentPosition <= -totalOriginalWidth) {
                        currentPosition = 0;
                    }
                    
                    gsap.set(carousel, {
                        x: currentPosition
                    });
                }
                
                // Continuar la animación independientemente del estado de pausa
                animationRef.current = requestAnimationFrame(animate);
            };
            
            // Iniciar la animación
            animationRef.current = requestAnimationFrame(animate);
        }
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tlRef.current.kill();
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []); // Remover isPaused de las dependencias

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <section className="px-6 py-20 md:py-32 bg-[#f8f8f8] font-inter">
            <div className="w-[100%] mx-auto md:w-[90%] py-10" >
                {/* Título */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Lo que dicen nuestros <span className="text-[#0045ac]">clientes</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Descubre cómo hemos ayudado a personas y empresas a alcanzar sus metas financieras
                    </p>
                </div>

                {/* Carrusel infinito de Testimonios */}
                <div className="relative overflow-x-clip mb-16">
                    <div 
                        ref={carouselRef}
                        className="flex gap-8 transition-transform duration-300 ease-out"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <div
                                key={`${testimonial.name}-${index}`}
                                className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] border border-gray-100 min-w-[350px] max-w-[350px] flex-shrink-0"
                            >
                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {renderStars(testimonial.rating)}
                                    <span className="ml-2 text-sm text-gray-500">({testimonial.rating}.0)</span>
                                </div>

                                {/* Contenido */}
                                <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                                    "{testimonial.content}"
                                </p>

                                {/* Footer */}
                                <div className="flex items-center">
                                    <div className="text-3xl mr-4">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-600 text-xs">
                                            {testimonial.role} en {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <p className="text-gray-600 mb-6 text-lg">
                        ¿Listo para transformar tu situación financiera?
                    </p>
                    <a 
                        href="#contact" 
                        className="bg-[#0045ac] text-white px-8 py-4 rounded-full hover:bg-[#003a8c] transition duration-300 text-lg font-semibold shadow-lg inline-flex items-center"
                    >
                        Solicita tu consulta gratuita
                    </a>
                </div>
            </div>
        </section>
    );
} 