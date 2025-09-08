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

// Componente individual de Card
const CreditCard = ({ title, description, image, icon, index, details, onMoreInfo }) => {
    const cardRef = useRef(null);

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
                scale: 1.01,
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

    // Determinar si la imagen va a la izquierda (índices pares) o derecha (índices impares)
    const isImageLeft = index % 2 === 0;

    return (
        <div
            ref={cardRef}
            className={`bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-300 cursor-pointer h-full flex flex-col ${isImageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} w-full max-w-6xl`}
        >
            {/* Contenido de información */}
            <div className={`flex-1 flex flex-col justify-between ${isImageLeft ? 'pl-0 md:pl-8' : 'pr-0 md:pr-8'} mb-6 md:mb-0`}>
                {/* Título */}
                <div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        {title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed mb-6 flex-grow">
                        {description}
                    </p>
                </div>

                {/* Botón de acción - siempre al fondo */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onMoreInfo && onMoreInfo({ title, description, image, details });
                    }}
                    className="w-full md:w-auto bg-[#0045ac] text-white py-4 px-8 rounded-full text-base md:text-lg font-semibold hover:bg-[#003a8c] transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                    Más información
                </button>
            </div>

            {/* Imagen */}
            <div className="relative w-full md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
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
        </div>
    );
};

// Componente principal
const CreditCards = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleMoreInfo = (cardData) => {
        // Guardar posición actual del scroll
        setScrollPosition(window.pageYOffset);
        setSelectedCard(cardData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCard(null);
        document.body.style.overflow = 'unset';
        document.body.style.position = 'static';
        document.body.style.top = 'auto';
        document.body.style.width = 'auto';
        // Reanudar animaciones GSAP
        gsap.globalTimeline.resume();
        ScrollTrigger.refresh();
        // Restaurar posición del scroll
        window.scrollTo(0, scrollPosition);
    };

    // Manejar tecla ESC y bloqueo de scroll
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
            // Pausar todas las animaciones GSAP
            gsap.globalTimeline.pause();
            ScrollTrigger.refresh();
            // Bloquear scroll del body manteniendo la posición
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'static';
            document.body.style.top = 'auto';
            document.body.style.width = 'auto';
            // Reanudar animaciones GSAP
            gsap.globalTimeline.resume();
            ScrollTrigger.refresh();
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
            document.body.style.position = 'static';
            document.body.style.top = 'auto';
            document.body.style.width = 'auto';
            // Asegurar que las animaciones se reanuden
            gsap.globalTimeline.resume();
            ScrollTrigger.refresh();
        };
    }, [isModalOpen]);

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
                <div className="flex flex-col gap-8 lg:gap-12 items-center">
                    {creditCardsData.map((card, index) => (
                        <CreditCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            image={card.image}
                            icon={card.icon}
                            details={card.details}
                            index={index}
                            onMoreInfo={handleMoreInfo}
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

            {/* Modal Completamente Nuevo */}
            {isModalOpen && selectedCard && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
                    style={{ touchAction: 'none' }}
                >
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={closeModal}
                    ></div>

                    {/* Modal Container */}
                    <div className="relative bg-white rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col shadow-2xl">
                        {/* Header Fijo */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={selectedCard.image}
                                    alt={selectedCard.title}
                                    className="w-16 h-16 object-cover rounded-xl"
                                />
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedCard.title}</h2>
                                    <p className="text-gray-600">Información detallada</p>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Contenido Scrolleable */}
                        <div
                            className="flex-1 overflow-y-auto p-6"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            {/* Descripción */}
                            <div className="mb-8">
                                <p className="text-gray-700 leading-relaxed text-lg">{selectedCard.description}</p>
                            </div>

                            {/* Detalles específicos */}
                            {selectedCard.details && (
                                <div className="space-y-8">
                                    {/* Características */}
                                    {selectedCard.details.caracteristicas && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">✨</span>
                                                Características
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.caracteristicas.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">•</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Beneficios */}
                                    {selectedCard.details.beneficios && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">🎯</span>
                                                Beneficios
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.beneficios.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-green-500 mt-1">✓</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Documentos */}
                                    {selectedCard.details.documentos && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">📄</span>
                                                Documentos Requeridos
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.documentos.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">📋</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Proceso */}
                                    {selectedCard.details.proceso && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">🔄</span>
                                                Proceso
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.proceso.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">{index + 1}.</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Requisitos */}
                                    {selectedCard.details.requisitos && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">📝</span>
                                                Requisitos
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.requisitos.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">•</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Descripción adicional */}
                                    {selectedCard.details.descripcion && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">ℹ️</span>
                                                Descripción
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed">{selectedCard.details.descripcion}</p>
                                        </div>
                                    )}

                                    {/* Cobertura */}
                                    {selectedCard.details.cobertura && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">🌎</span>
                                                Cobertura
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.cobertura.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">•</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Introducción PYME */}
                                    {selectedCard.details.introduccion && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">🏭</span>
                                                ¿Cómo obtener un crédito para PYMES?
                                            </h3>
                                            <p className="text-gray-700 leading-relaxed">{selectedCard.details.introduccion}</p>
                                        </div>
                                    )}

                                    {/* Requisitos Generales */}
                                    {selectedCard.details.requisitosGenerales && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">📋</span>
                                                Requisitos Generales
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.requisitosGenerales.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">•</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Persona Física */}
                                    {selectedCard.details.personaFisica && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">👤</span>
                                                Si eres Persona Física con Actividad Empresarial
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.personaFisica.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-green-500 mt-1">✓</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Persona Moral */}
                                    {selectedCard.details.personaMoral && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">🏢</span>
                                                Si eres Persona Moral
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.personaMoral.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-green-500 mt-1">✓</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Documentos Financieros */}
                                    {selectedCard.details.documentosFinancieros && (
                                        <div>
                                            <h3 className="text-xl font-semibold text-[#0045ac] mb-4 flex items-center">
                                                <span className="mr-2">💰</span>
                                                Documentos Financieros
                                            </h3>
                                            <ul className="space-y-3">
                                                {selectedCard.details.documentosFinancieros.map((item, index) => (
                                                    <li key={index} className="flex items-start space-x-3">
                                                        <span className="text-[#0045ac] mt-1">📊</span>
                                                        <span className="text-gray-700">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer Fijo con Botón */}
                        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={() => {
                                    closeModal();
                                    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="w-full bg-[#0045ac] text-white py-4 px-6 rounded-full text-lg font-semibold hover:bg-[#003a8c] transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Solicitar este crédito
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CreditCards;
