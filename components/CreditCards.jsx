'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Estilos para la animación del fondo con colores más tenues
const animatedBackgroundStyles = `
  @keyframes gradient-flow {
    0% {
      background: linear-gradient(45deg, #f8fafc, #f1f5f9, #f0f4f8, #f8fafc);
      background-size: 400% 400%;
      background-position: 0% 50%;
    }
    25% {
      background: linear-gradient(45deg, #f1f5f9, #f0f4f8, #f8fafc, #f1f5f9);
      background-size: 400% 400%;
      background-position: 100% 50%;
    }
    50% {
      background: linear-gradient(45deg, #f0f4f8, #f8fafc, #f1f5f9, #f0f4f8);
      background-size: 400% 400%;
      background-position: 0% 50%;
    }
    75% {
      background: linear-gradient(45deg, #f8fafc, #f1f5f9, #f0f4f8, #f8fafc);
      background-size: 400% 400%;
      background-position: 100% 50%;
    }
    100% {
      background: linear-gradient(45deg, #f8fafc, #f1f5f9, #f0f4f8, #f8fafc);
      background-size: 400% 400%;
      background-position: 0% 50%;
    }
  }
  
  .animate-gradient-shift {
    animation: gradient-flow 15s ease-in-out infinite;
  }
`;

// Inyectar estilos en el head
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animatedBackgroundStyles;
    document.head.appendChild(styleSheet);
}

// Datos de las cards de crédito
const creditCardsData = [
    {
        id: 1,
        title: "Crédito Personal",
        description: "Con un Crédito Personal podrás disponer de dinero en efectivo con un trámite ágil y de mínimos requisitos, para que lleves a cabo tus proyectos personales. Tú decides el plazo de tu crédito y tus mensualidades siempre serán fijas.",
        image: "/personal.jpeg",
        icon: "👤",
        details: {
            caracteristicas: [
                "Préstamo simple de $10,000 hasta $40,000",
                "Plazo desde 12 hasta 36 meses",
                "Pagos fijos mensuales",
                "Plazos fijos y Tasa de interés anual fija del 25% según el resultado de tu evaluación del préstamo",
                "Tasa se mantiene fija durante toda la vigencia del préstamo",
                "Cobertura geográfica en toda la República Mexicana"
            ],
            beneficios: [
                "Tasa de interés y pagos fijos antes de IVA durante la vigencia del crédito",
                "No recibes penalización por pagos anticipados",
                "Puedes contratar más de un préstamo personal, según tu capacidad de pago"
            ],
            documentos: [
                "Identificación oficial vigente",
                "Si eres extranjero debes presentar tu forma migratoria",
                "Comprobante de domicilio, no mayor a 3 meses de antigüedad (recibo de luz, agua, predial, teléfono fijo o estado de cuenta cualquier institución bancaria)"
            ]
        }
    },
    {
        id: 2,
        title: "Crédito a Negocio",
        description: "En patrimonio y sociedad crediticia acercamos a las personas y sus pymes a sus metas financieras de todos los días. Entendemos que la vida puede ser impredecible y que a veces necesitamos apoyo. Por eso, ofrecemos una solución simple y accesible que te permite obtener préstamos y atención las 24 horas, los 7 días de la semana.",
        image: "/2.jpeg",
        icon: "🏢",
        details: {
            caracteristicas: [
                "Por su importancia económica y generadora de ingresos en México, el crédito de inversión a negocio propio pueden acceder a múltiples apoyos de financiamiento",
                "El crédito va desde $50,000.00 hasta $2,000,000.00",
                "Ofrece asesorías personalizadas por expertos para dirigir el préstamo de forma estratégica y óptima para tu negocio",
                "Es muy sencillo obtenerlo"
            ],
            proceso: [
                "Registra la información que te solicita el simulador de crédito",
                "Calcula y solicita tu crédito"
            ],
            requisitos: [
                "Tener al menos 18 años",
                "Tu negocio debe contar con una antigüedad mínima de 1 año",
                "Tener a la mano tu IFE",
                "Estados de cuenta digitalizados de los últimos 2 meses"
            ]
        }
    },
    {
        id: 3,
        title: "Crédito Hipotecario",
        description: "Crédito Simple con interés y garantía hipotecaria destinado a la adquisición de una vivienda nueva o usada, ofrecemos esquemas y modalidades de crédito de acuerdo a tus necesidades, para que compres la casa de tus sueños.",
        image: "/3.jpeg",
        icon: "🏠"
    },
    {
        id: 4,
        title: "Crédito Empresarial",
        description: "Economía y desarrollo crediticio te ayuda a capitalizar tu empresa. De tal manera que tú puedes elegir el tiempo a pagar el crédito la tasa de interés anual fija y congelada es muy accesible y sobre todo competitiva. El monto que puedes elegir puede ser hasta 5 millones de pesos a pagar a 20 años. Pide una asesoría personalizada y con mucho gusto te la vamos a brindar.",
        image: "/4.jpeg",
        icon: "💼"
    },
    {
        id: 6,
        title: "Crédito PYME",
        description: "Las Pymes juegan un papel fundamental en la economía de México. Ofrecemos diversas opciones de créditos diseñados específicamente para pequeñas y medianas empresas, con condiciones flexibles y procesos simplificados para impulsar el crecimiento de tu negocio.",
        image: "/4.jpeg",
        icon: "🏭",
        details: {
            introduccion: "Las Pymes juegan un papel fundamental en la economía de México. Por esta razón, las oportunidades para acceder a créditos empresariales han aumentado en los últimos años. En el mercado, existen diversas opciones de créditos diseñados para Pymes, por lo que investigar detalladamente y con anticipación las condiciones de cada uno te permitirá seleccionar el préstamo que mejor se adapte a la situación económica de tu negocio.",
            proceso: [
                "Puedes solicitar un crédito para Pyme en línea, donde podrás utilizar un simulador de créditos",
                "Investiga detalladamente las condiciones de cada opción disponible",
                "Selecciona el préstamo que mejor se adapte a tu situación económica",
                "Cumple con los requisitos establecidos por las instituciones bancarias"
            ],
            requisitosGenerales: [
                "Antigüedad del negocio: Tu empresa deberá tener una antigüedad mínima en funcionamiento, el tiempo específico dependerá de la entidad y de si eres cliente de ella"
            ],
            personaFisica: [
                "Tener entre 25 y 70 años",
                "Identificación oficial vigente",
                "Actividad empresarial comprobable"
            ],
            personaMoral: [
                "Acta constitutiva de tu Pyme con sello de inscripción en Registro Público",
                "Poder notarial del representante legal de la empresa con sello de inscripción en Registro Público",
                "Identificación oficial vigente del representante legal"
            ],
            documentosFinancieros: [
                "Estados de cuenta de la entidad bancaria donde la empresa tenga su cuenta",
                "Para montos elevados: Estados financieros de los últimos ejercicios fiscales completos",
                "Un estado financiero parcial con antigüedad no superior a tres meses",
                "Constancia de situación fiscal que compruebe que el negocio está en norma ante la Secretaría de Hacienda y Crédito Público"
            ]
        }
    },
    {
        id: 5,
        title: "Crédito Agrícola",
        description: "Para esta organización, es fundamental facilitar el acceso al crédito para todos los agricultores, apicultores, ganaderos y demás actores del sector agropecuario. Actualmente, se ofrecen líneas de crédito con tasas preferenciales diseñadas especialmente para este sector. Para obtener más información y acceder a una asesoría personalizada, se invita a los interesados a ponerse en contacto con nosotros.",
        image: "/5.jpeg",
        icon: "🌾",
        details: {
            descripcion: "Financiamiento de corto a mediano plazo de apoyo al capital de trabajo; está condicionado a ser invertido únicamente en la compra de materias primas y materiales, pagos de salarios y gastos directos de explotación, indispensables para la operación de empresas con actividades de transformación y manufactura, principalmente en sectores como: industrial, agropecuario, forestal y pesquero nacional.",
            cobertura: [
                "Para el sector industrial, 80% del valor de los conceptos financiables",
                "Para los sectores agropecuario, forestal y pesquero: Recursos de hasta el 80% del valor de los conceptos financiables",
                "Recursos del Fideicomiso para la Agricultura FIRA, hasta el 90% de la actividad económica",
                "Recursos de otros fondos de fomento, de acuerdo a la política vigente de cada uno de ellos"
            ]
        }
    }
];

// Componente individual de Card expandida
const CreditCard = ({ id, title, description, image, icon, index, details, isExpanded, onToggle }) => {
    const cardRef = useRef(null);
    const detailsRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        // Animación de entrada muy sutil
        gsap.set(card, {
            opacity: 0,
            y: 15
        });

        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: index * 0.05,
            ease: "power1.out",
            scrollTrigger: {
                trigger: card,
                start: "top 95%",
                toggleActions: "play none none reverse"
            }
        });

        // Animación hover muy discreta
        const handleMouseEnter = () => {
            gsap.to(card, {
                y: -3,
                scale: 1.005,
                duration: 0.2,
                ease: "power1.out"
            });
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.2,
                ease: "power1.out"
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === card) {
                    trigger.kill();
                }
            });
        };
    }, [index]);

    // Animación para el despliegue/colapso de detalles
    useEffect(() => {
        const details = detailsRef.current;
        if (!details) return;

        if (isExpanded) {
            // Prevenir scroll automático del navegador durante la animación
            const card = cardRef.current;
            const initialScrollTop = window.pageYOffset;
            
            // Animación de despliegue - efecto "desenrollado"
            gsap.fromTo(details, 
                { 
                    height: 0,
                    opacity: 0,
                    scaleY: 0,
                    transformOrigin: "top center"
                },
                { 
                    height: "auto",
                    opacity: 1,
                    scaleY: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    onUpdate: () => {
                        // Mantener la posición de scroll durante la animación inicial
                        if (Math.abs(window.pageYOffset - initialScrollTop) < 50) {
                            window.scrollTo(0, initialScrollTop);
                        }
                    }
                }
            );

            // Animación de los elementos internos con stagger
            gsap.fromTo(details.querySelectorAll('.detail-section'), 
                {
                    y: 20,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.4,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: "power1.out"
                }
            );
        } else {
            // Primero animar los elementos internos hacia abajo con stagger inverso
            const sections = details.querySelectorAll('.detail-section');
            gsap.to(sections, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                stagger: -0.08, // Stagger negativo para efecto inverso
                ease: "power1.in"
            });

            // Luego animar el contenedor - efecto "enrollado" mejorado
            gsap.to(details, {
                height: 0,
                opacity: 0,
                scaleY: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.inOut",
                transformOrigin: "top center"
            });
        }
    }, [isExpanded]);

    // Animación continua para la flecha cuando no está expandida
    useEffect(() => {
        const arrow = arrowRef.current;
        if (!arrow) return;

        if (!isExpanded) {
            // Animación de "rebote" sutil para llamar la atención
            const bounceAnimation = gsap.to(arrow, {
                y: 3,
                duration: 1,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: 2 // Empieza después de 2 segundos
            });

            return () => {
                bounceAnimation.kill();
            };
        }
    }, [isExpanded]);

    // Determinar si la imagen va a la izquierda (índices pares) o derecha (índices impares)
    const isImageLeft = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            data-card-id={id}
            className="bg-white rounded-3xl shadow-lg p-6 md:p-8 lg:p-10 transition-all duration-300 w-full max-w-7xl mx-auto overflow-hidden"
        >
            {/* Header con imagen, título y descripción */}
            <div className={`flex flex-col ${isImageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 mb-6`}>
                {/* Imagen */}
                <div className="relative w-full lg:w-80 xl:w-96 h-64 lg:h-80 xl:h-96 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    {/* Fallback cuando la imagen no carga */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl bg-gradient-to-br from-blue-50 to-indigo-100" style={{ display: 'none' }}>
                        {icon}
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 flex flex-col">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h3>
                    <p className="text-gray-700 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6">
                        {description}
                    </p>
                    
                    {/* Botón "Saber más" simplificado con flecha animada */}
                    {details && (
                        <button
                            onClick={onToggle}
                            className="flex items-center gap-2 text-[#0045ac] text-lg font-semibold hover:text-[#003a8c] transition-all duration-300 group mb-4 cursor-pointer"
                        >
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                                {isExpanded ? 'Ocultar información' : 'Saber más'}
                            </span>
                            <svg 
                                ref={arrowRef}
                                className={`w-5 h-5 transition-all duration-500 ease-out ${
                                    isExpanded ? 'rotate-180 scale-110' : 'rotate-0 scale-100'
                                } group-hover:scale-125 group-hover:translate-x-1`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2.5} 
                                    d="M19 9l-7 7-7-7"
                                    className="group-hover:stroke-[3]"
                                />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* Información detallada con animación */}
            {details && (
                <div 
                    ref={detailsRef}
                    className="space-y-6 mb-8 overflow-hidden"
                    style={{ height: isExpanded ? 'auto' : '0' }}
                >
                    {/* Introducción PYME - Mostrar primero y en ancho completo */}
                    {details.introduccion && (
                        <div className="detail-section bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">🏭</span>
                                ¿Cómo obtener un crédito para PYMES?
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{details.introduccion}</p>
                        </div>
                    )}

                    {/* Grid para el resto de secciones */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* Características */}
                    {details.caracteristicas && (
                        <div className="detail-section bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">✨</span>
                                Características
                            </h4>
                            <ul className="space-y-3">
                                {details.caracteristicas.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1 font-bold">•</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Beneficios */}
                    {details.beneficios && (
                        <div className="detail-section bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">🎯</span>
                                Beneficios
                            </h4>
                            <ul className="space-y-3">
                                {details.beneficios.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-green-500 mt-1 font-bold">✓</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Documentos */}
                    {details.documentos && (
                        <div className="detail-section bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">📄</span>
                                Documentos Requeridos
                            </h4>
                            <ul className="space-y-3">
                                {details.documentos.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1">📋</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Proceso */}
                    {details.proceso && (
                        <div className="detail-section bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">🔄</span>
                                Proceso
                            </h4>
                            <ul className="space-y-3">
                                {details.proceso.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1 font-bold">{idx + 1}.</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Requisitos */}
                    {details.requisitos && (
                        <div className="detail-section bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">📝</span>
                                Requisitos
                            </h4>
                            <ul className="space-y-3">
                                {details.requisitos.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1 font-bold">•</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Descripción adicional */}
                    {details.descripcion && (
                        <div className="detail-section bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 lg:col-span-2">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">ℹ️</span>
                                Descripción Detallada
                            </h4>
                            <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{details.descripcion}</p>
                        </div>
                    )}

                    {/* Cobertura */}
                    {details.cobertura && (
                        <div className="detail-section bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">🌎</span>
                                Cobertura
                            </h4>
                            <ul className="space-y-3">
                                {details.cobertura.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1 font-bold">•</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {/* Requisitos Generales */}
                    {details.requisitosGenerales && (
                        <div className="detail-section bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">📋</span>
                                Requisitos Generales
                            </h4>
                            <ul className="space-y-3">
                                {details.requisitosGenerales.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1 font-bold">•</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Persona Física */}
                    {details.personaFisica && (
                        <div className="detail-section bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">👤</span>
                                Persona Física con Actividad Empresarial
                            </h4>
                            <ul className="space-y-3">
                                {details.personaFisica.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-green-500 mt-1 font-bold">✓</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Persona Moral */}
                    {details.personaMoral && (
                        <div className="detail-section bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">🏢</span>
                                Persona Moral
                            </h4>
                            <ul className="space-y-3">
                                {details.personaMoral.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-green-500 mt-1 font-bold">✓</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Documentos Financieros */}
                    {details.documentosFinancieros && (
                        <div className="detail-section bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6">
                            <h4 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                <span className="mr-3 text-2xl">💰</span>
                                Documentos Financieros
                            </h4>
                            <ul className="space-y-3">
                                {details.documentosFinancieros.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                        <span className="text-[#0045ac] mt-1">📊</span>
                                        <span className="text-gray-700 text-sm lg:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    </div>
                </div>
            )}

            {/* Botón de acción - solo visible cuando está expandido */}
            {isExpanded && (
                <div className="text-center detail-section">
                    <button
                        onClick={() => {
                            const contactForm = document.getElementById('contact-form') || document.querySelector('[id*="contact"]');
                            if (contactForm) {
                                contactForm.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-gradient-to-r from-[#0045ac] to-[#0056d3] text-white py-4 px-12 rounded-full text-lg font-semibold hover:from-[#003a8c] hover:to-[#0045ac] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Solicitar este crédito
                    </button>
                </div>
            )}
        </div>
    );
};

// Componente principal
const CreditCards = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const [expandedCard, setExpandedCard] = useState(null);

    const handleToggleCard = (cardId) => {
        const wasExpanded = expandedCard === cardId;
        
        if (wasExpanded) {
            // Si se está cerrando, no hacer scroll
            setExpandedCard(null);
        } else {
            // Si se está abriendo una nueva tarjeta
            setExpandedCard(cardId);
            
            // Hacer scroll suave hacia la tarjeta después de un pequeño delay
            setTimeout(() => {
                const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
                if (cardElement) {
                    const rect = cardElement.getBoundingClientRect();
                    const scrollTop = window.pageYOffset;
                    const targetTop = scrollTop + rect.top - 100; // 100px de margen superior
                    
                    window.scrollTo({
                        top: targetTop,
                        behavior: 'smooth'
                    });
                }
            }, 300); // Delay para permitir que la animación de expansión comience
        }
    };

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;
        const cta = ctaRef.current;

        if (!section || !title || !subtitle || !cta) return;

        // Animación del título muy discreta
        gsap.set([title, subtitle], {
            opacity: 0,
            y: 10
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.out"
        })
            .to(subtitle, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power1.out"
            }, "-=0.3");

        // Animación del CTA muy sutil
        gsap.set(cta, {
            opacity: 0,
            y: 8
        });

        gsap.to(cta, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: cta,
                start: "top 98%",
                toggleActions: "play none none reverse"
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === section || trigger.trigger === cta) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <section id="credit-cards" ref={sectionRef} className="w-full py-20 relative overflow-hidden">
            {/* Fondo animado morado-azul */}
            <div className="absolute inset-0 animate-gradient-shift"></div>
            <div className="max-w-[100%] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Título de la sección */}
                <div className="text-center mb-16">
                    <h2 ref={titleRef} className="text-3xl md:text-5xl font-semibold text-gray-900 mb-4">
                        Nuestros Productos de <span className="text-[#0045ac]">Crédito</span>
                    </h2>
                    <p ref={subtitleRef} className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Descubre las opciones de financiamiento que tenemos para ti.
                        Desde <span className="text-[#0045ac] font-semibold">créditos personales</span> hasta soluciones <span className="text-[#0045ac] font-semibold">empresariales y agrícolas</span>.
                    </p>
                </div>

                {/* Grid de cards */}
                <div className="flex flex-col gap-12 lg:gap-16 xl:gap-20 items-center">
                    {creditCardsData.map((card, index) => (
                        <CreditCard
                            key={card.id}
                            id={card.id}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                            icon={card.icon}
                            details={card.details}
                            index={index}
                            isExpanded={expandedCard === card.id}
                            onToggle={() => handleToggleCard(card.id)}
                        />
                    ))}
                </div>

                {/* Call to action adicional */}
                <div className="text-center mt-16">
                    <button
                        ref={ctaRef}
                        onClick={() => {
                            const contactForm = document.getElementById('contact-form') || document.querySelector('[id*="contact"]');
                            if (contactForm) {
                                contactForm.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-[#0045ac] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#003a8c] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        Solicita tu crédito ahora
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CreditCards;
