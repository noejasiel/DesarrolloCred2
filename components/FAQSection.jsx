'use client'
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const faqs = [
  {
    question: "¿Qué tipos de créditos pueden ayudarme a obtener?",
    answer: "Ofrecemos asesoría para obtener créditos personales, empresariales, hipotecarios, agrícolas y de negocio. Te ofrecemos las condiciones más favorables según tu perfil."
  },
  {
    question: "¿Qué documentos necesito para solicitar un crédito?",
    answer: "Los documentos varían según el tipo de crédito, pero generalmente necesitas: identificación oficial, comprobantes de ingresos, estados de cuenta bancarios, comprobante de domicilio y RFC. Te guiaremos paso a paso con los requisitos específicos."
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de aprobación?",
    answer: "El tiempo de aprobación depende del tipo de crédito y la institución financiera. Los créditos personales pueden aprobarse en 24-48 horas, mientras que los hipotecarios pueden tardar de 7 a 15 días hábiles. Te mantendremos informado durante todo el proceso."
  },
  {
    question: "¿Qué ventajas tengo al usar sus servicios?",
    answer: "Nuestro equipo especializado analiza tu perfil crediticio, compara opciones de múltiples bancos, negocia las mejores condiciones y te acompaña durante todo el proceso. Esto te ahorra tiempo y te garantiza obtener las tasas más competitivas del mercado."
  },
  {
    question: "¿Cobran comisiones por sus servicios?",
    answer: "Nuestros honorarios son transparentes y se basan en el éxito de la gestión. Solo cobramos cuando logramos que se apruebe tu crédito con las condiciones acordadas. No hay costos ocultos ni sorpresas."
  },
  {
    question: "¿Pueden ayudarme si tengo mal historial crediticio?",
    answer: "Sí, especializamos en ayudar a personas con deudas a encontrar soluciones efectivas. Analizamos tu situación particular y trabajamos con instituciones que ofrecen opciones de rehabilitación crediticia y segundas oportunidades."
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);

  useEffect(() => {
    answerRefs.current.forEach(ref => {
      if (ref) {
        gsap.set(ref, {
          height: 0,
          opacity: 0,
          display: 'none',
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0
        });
      }
    });
  }, []);

  const toggleAnswer = (index) => {
    answerRefs.current.forEach((ref, i) => {
      if (!ref) return;
      if (i === index) {
        if (openIndex === i) {
          // Colapsar
          gsap.to(ref, {
            height: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginBottom: 0,
            duration: 0.55,
            ease: 'power3.out',
            onComplete: () => gsap.set(ref, { display: 'none' })
          });
          setOpenIndex(null);
        } else {
          // Expandir
          gsap.set(ref, { display: 'block' });
          gsap.fromTo(
            ref,
            {
              height: 0,
              opacity: 0,
              paddingTop: 0,
              paddingBottom: 0,
              marginBottom: 0,
            },
            {
              height: ref.scrollHeight + 5,
              opacity: 1,
              paddingTop: 8,
              paddingBottom: 8,
              marginBottom: 8,
              duration: 0.55,
              ease: 'power3.out'
            }
          );
          setOpenIndex(i);
        }
      } else {
        // Colapsar otras
        gsap.to(ref, {
          height: 0,
          opacity: 0,
          paddingTop: 0,
          paddingBottom: 0,
          marginBottom: 0,
          duration: 0.45,
          ease: 'power3.out',
          onComplete: () => gsap.set(ref, { display: 'none' })
        });
      }
    });
  };

  return (
    <section id="faq-section" className="bg-gradient-to-br from-[#f8f8f8] to-white py-16 px-4 md:px-12 lg:px-24">
      <h2 className="font-semibold text-[#0045ac] mb-12 text-2xl md:text-6xl sm:text-6xl lg:text-6xl xl:text-[64px]">
        Preguntas frecuentes
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#0045ac]/20 pb-4 bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <button
              className="w-full flex justify-between items-center text-left text-[#0045ac] text-lg md:text-xl font-semibold focus:outline-none hover:text-[#003a8c] transition-colors duration-300"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 text-[#0045ac] ${
                  openIndex === index ? 'rotate-45' : ''
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <div
              ref={(el) => (answerRefs.current[index] = el)}
              className="overflow-hidden text-gray-700 text-base md:text-lg leading-relaxed"
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

     {/*  <div className="mt-10 text-center">
        <a href="#" className="text-[#0045ac] hover:text-[#003a8c] underline text-lg font-semibold transition-colors duration-300">
          Ver todas las preguntas →
        </a>
      </div> */}
    </section>
  );
}
