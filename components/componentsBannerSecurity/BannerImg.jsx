import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BannerImg() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const scrollWordsRef = useRef([]);
  const scrollTextRef = useRef(null);


 

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    // ✨ ESTABLECER ESTADO INICIAL - AMBOS TEXTOS EMPIEZAN ABAJO
    gsap.set(image, { scale: 0.6, opacity: 0.1 });
    gsap.set(text1, { y: '100vh', opacity: 0 });
    gsap.set(text2, { y: '200vh', opacity: 0 });

    // 1. Animación principal de la sección (pin MÁS LARGO para acomodar ambas animaciones)
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 60px',
        end: '+=10000', // 🔥 DUPLICAMOS el espacio para más lentitud
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
      opacity: 0.9,
    });

    // 2. Escalado de la imagen
    gsap.fromTo(image,
      { scale: 0.6, opacity: 0.1 },
      {
        scale: 1.1,
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "center center",
          scrub: 1,
        },
        duration: 4,
        ease: "power2.out"
      }
    );

    // 3. ✨ PRIMER TEXTO - ULTRA LENTO 🐌
    gsap.fromTo(text1,
      { y: '100vh', opacity: 1 },
      {
        y: '-100vh',
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60px',
          end: '+=6000', // Primera mitad del scroll total
          scrub: (progress) => {
            // 🔥 VALORES EXTREMOS PARA LENTITUD BRUTAL
            if (progress >= 0.2 && progress <= 0.8) {
              return 200; // 🐌 ULTRA MEGA LENTO - scroll casi parado
            } else if (progress >= 0.1 && progress <= 0.9) {
              return 150; // Muy muy lento en transición
            } else {
              return 80; // Lento en extremos
            }
          },
        },
        ease: "none"
      }
    );

    // 4. ✨ SEGUNDO TEXTO - ULTRA LENTO 🐌
    gsap.fromTo(text2,
      { y: '200vh', opacity: 1 },
      {
        y: '-100vh',
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60px',
          end: '+=12000', // Todo el scroll
          scrub: (progress) => {
            // El segundo texto SOLO se activa en la segunda mitad (50% - 100%)
            if (progress < 0.5) {
              return false; // NO SE MUEVE en la primera mitad
            }

            // Convertir 50%-100% a 0%-100% para la lógica del segundo texto
            const secondProgress = (progress - 0.5) / 0.5;

            // 🔥 VALORES EXTREMOS PARA LENTITUD BRUTAL
            if (secondProgress >= 0.2 && secondProgress <= 0.8) {
              return 250; // 🐌 INCLUSO MÁS LENTO QUE EL PRIMERO
            } else if (secondProgress >= 0.1 && secondProgress <= 0.9) {
              return 180; // Extremadamente lento en transición
            } else {
              return 100; // Muy lento en extremos
            }
          },
          onUpdate: (self) => {
            const globalProgress = self.progress;

            if (globalProgress < 0.5) {
              // Primera mitad: Texto 2 está completamente inactivo
              gsap.set(text2, {
                y: '200vh', // 🔥 Más abajo para que tarde más en aparecer
                opacity: 0
              });
            }
          }
        },
        ease: "none"
      }
    );

    // Animación de escala adicional para la imagen - segunda fase
    gsap.fromTo(image,
      { scale: 1.1 },
      {
        scale: 1.4,
        scrollTrigger: {
          trigger: section,
          start: "center center",
          end: "bottom top",
          scrub: 1,
        },
        ease: "power1.inOut"
      }
    );

      // Animación del texto de scroll
      const scrollText = scrollTextRef.current;
      const words = scrollText.textContent.split(' ');
      scrollText.innerHTML = '';
  
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        span.style.marginRight = '0.5em';
        scrollText.appendChild(span);
        scrollWordsRef.current.push(span);
      });
  
      const scrollTextTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollText,
          start: 'top 100%',
          end: 'top 40%',
          scrub: 1,
        }
      });
  
      scrollWordsRef.current.forEach((word, index) => {
        scrollTextTimeline.to(word, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out'
        }, index * 0.3);
      });
  

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
    
    <div className="h-[80vh] flex items-center justify-center">
        <h1 ref={scrollTextRef} className=" font-bold   text-2xl md:text-6xl   sm:text-6xl  lg:text-6xl xl:text-[64px]">Scroll hacia abajo</h1>
      </div>

      <section
        ref={sectionRef}
        className="relative h-screen bg-[#0141a5] flex items-center justify-center overflow-hidden"
      >
        <img
          ref={imageRef}
          src="/imgBanner.png"
          alt="Banner"
          className="h-full object-contain"
        />

        {/* Contenedor de textos - ULTRA LENTO */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white font-bold pointer-events-none">
          <div
            ref={text1Ref}
            className="absolute text-2xl md:text-6xl sm:text-6xl lg:text-6xl xl:text-[64px] text-center text-white font-bold"
            style={{ color: '#ffffff' }}
          >
            + 30,000,000,000 MXN<br />
            <span className="text-2xl md:text-4xl opacity-80">VOLUMEN TOTAL</span>
          </div>
          <div
            ref={text2Ref}
            className="absolute text-2xl md:text-6xl sm:text-6xl lg:text-6xl xl:text-[64px] text-center text-white font-bold"
            style={{ color: '#ffffff' }}
          >
            + 450,000<br />
            <span className="text-2xl md:text-4xl opacity-80">CLIENTES ACTIVOS</span>
          </div>
        </div>
      </section>
    </div>
  );
}