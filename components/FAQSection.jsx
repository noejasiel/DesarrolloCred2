'use client'
import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const faqs = [
  {
    question: "¿Quién puede abrir una cuenta FONDEA | Empresarial?",
    answer: "Cualquier empresa legalmente constituida en México puede abrir una cuenta empresarial."
  },
  {
    question: "¿Qué documentos necesito para abrir mi cuenta?",
    answer: "Necesitas tu RFC, acta constitutiva, identificación oficial del representante legal y comprobante de domicilio."
  },
  {
    question: "¿Cualquier persona de la empresa puede abrir una cuenta?",
    answer: "No, se requiere que la persona que abra la cuenta tenga los poderes legales necesarios para realizar actos administrativos que le permitan aperturar una cuenta bancaria."+
    "No, se requiere que la persona que abra la cuenta tenga los poderes legales necesarios para realizar actos administrativos que le permitan aperturar una cuenta bancaria." +
    "No, se requiere que la persona que abra la cuenta tenga los poderes legales necesarios para realizar actos administrativos que le permitan aperturar una cuenta bancaria." +
    "No, se requiere que la persona que abra la cuenta tenga los poderes legales necesarios para realizar actos administrativos que le permitan aperturar una cuenta bancaria."
  },
  {
    question: "¿Cuánto tiempo tardan en abrirme una cuenta?",
    answer: "Menos de 48 horas hábiles después de enviar todos los documentos."
  },
  {
    question: "¿Puedo tener más de una cuenta?",
    answer: "Sí, puedes tener cuentas múltiples para diferentes usos empresariales."
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
    <section className="bg-white py-16 px-4 md:px-12 lg:px-24">
      <h2 className="font-semibold text-black mb-12 text-2xl md:text-6xl sm:text-6xl lg:text-6xl xl:text-[64px]">
        Preguntas frecuentes
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 pb-4">
            <button
              className="w-full flex justify-between items-center text-left text-black text-lg md:text-xl font-medium focus:outline-none"
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${
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
              className="overflow-hidden text-gray-600 text-base md:text-lg"
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a href="#" className="text-black underline text-lg font-medium">
          Ver todas las preguntas →
        </a>
      </div>
    </section>
  );
}
