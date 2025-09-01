'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Datos de las cards de crédito
const creditCardsData = [
  {
    id: 1,
    title: "Crédito Personal",
    description: "Con un Crédito Personal podrás disponer de dinero en efectivo con un trámite ágil y de mínimos requisitos, para que lleves a cabo tus proyectos personales. Tú decides el plazo de tu crédito y tus mensualidades siempre serán fijas.",
    image: "/personal.jpeg",
    icon: "👤"
  },
  {
    id: 2,
    title: "Crédito a Negocio",
    description: "En patrimonio y sociedad crediticia acercamos a las personas y sus pymes a sus metas financieras de todos los días. Entendemos que la vida puede ser impredecible y que a veces necesitamos apoyo. Por eso, ofrecemos una solución simple y accesible que te permite obtener préstamos y atención las 24 horas, los 7 días de la semana.",
    image: "/2.jpeg",
    icon: "🏢"
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
    id: 5,
    title: "Crédito Agrícola",
    description: "Para esta organización, es fundamental facilitar el acceso al crédito para todos los agricultores, apicultores, ganaderos y demás actores del sector agropecuario. Actualmente, se ofrecen líneas de crédito con tasas preferenciales diseñadas especialmente para este sector. Para obtener más información y acceder a una asesoría personalizada, se invita a los interesados a ponerse en contacto con nosotros.",
    image: "/5.jpeg",
    icon: "🌾"
  }
];

// Componente individual de Card
const CreditCard = ({ title, description, image, icon, index }) => {
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

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-2xl shadow-md p-6 md:p-8 lg:p-6 transition-all duration-300 cursor-pointer h-full flex flex-col w-full max-w-sm md:max-w-lg lg:max-w-sm"
    >
      {/* Imagen */}
      <div className="relative w-full h-48 md:h-56 lg:h-48 mb-4 rounded-xl overflow-hidden bg-gray-100">
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
        <div className="absolute inset-0 flex items-center justify-center text-6xl bg-gradient-to-br from-blue-50 to-indigo-100" style={{display: 'none'}}>
          {icon}
        </div>
      </div>

      {/* Título */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Descripción */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      {/* Botón de acción - siempre al fondo */}
      <button className="w-full bg-[#0045ac] text-white py-3 px-4 rounded-full text-sm font-semibold hover:bg-[#003a8c] transition-colors duration-200 shadow-lg hover:shadow-xl mt-auto">
        Más información
      </button>
    </div>
  );
};

// Componente principal
const CreditCards = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

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
    <section ref={sectionRef} className="w-full bg-[#f8f8f8] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {creditCardsData.map((card, index) => (
            <CreditCard
              key={card.id}
              title={card.title}
              description={card.description}
              image={card.image}
              icon={card.icon}
              index={index}
            />
          ))}
        </div>

        {/* Call to action adicional */}
        <div className="text-center mt-16">
          <button 
            ref={ctaRef}
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
