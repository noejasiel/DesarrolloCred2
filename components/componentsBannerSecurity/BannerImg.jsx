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
  const num1Ref = useRef(null);
  const num2Ref = useRef(null);


 

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
        end: '+=4000', // 🔥 REDUCIDO de 10000 a 4000 para más velocidad
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

    // 3. ✨ PRIMER TEXTO - MÁS RÁPIDO 🚀
    gsap.fromTo(text1,
      { y: '100vh', opacity: 1 },
      {
        y: '-100vh',
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60px',
          end: '+=2000', // 🔥 REDUCIDO de 6000 a 2000 para más velocidad
          scrub: (progress) => {
            // 🔥 VALORES MÁS RÁPIDOS
            if (progress >= 0.2 && progress <= 0.8) {
              return 50; // 🚀 Más rápido - antes era 200
            } else if (progress >= 0.1 && progress <= 0.9) {
              return 30; // Más rápido en transición - antes era 150
            } else {
              return 20; // Más rápido en extremos - antes era 80
            }
          },
        },
        ease: "none"
      }
    );

    // 4. ✨ SEGUNDO TEXTO - MÁS RÁPIDO 🚀
    gsap.fromTo(text2,
      { y: '200vh', opacity: 1 },
      {
        y: '-100vh',
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 60px',
          end: '+=4000', // 🔥 REDUCIDO de 12000 a 4000 para más velocidad
          scrub: (progress) => {
            // 🔥 ARREGLADO: El segundo texto SOLO se activa después del 50% del scroll total
            if (progress < 0.5) {
              return false; // NO SE MUEVE en la primera mitad
            }

            // Convertir 50%-100% a 0%-100% para la lógica del segundo texto
            const secondProgress = (progress - 0.5) / 0.5;

            // 🔥 VALORES MÁS RÁPIDOS
            if (secondProgress >= 0.2 && secondProgress <= 0.8) {
              return 60; // 🚀 Más rápido - antes era 250
            } else if (secondProgress >= 0.1 && secondProgress <= 0.9) {
              return 40; // Más rápido en transición - antes era 180
            } else {
              return 25; // Más rápido en extremos - antes era 100
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

      // ---- Conteo numérico al entrar en pantalla ----
      const formatNumber = (value) => new Intl.NumberFormat('es-MX').format(value);

      const animateCount = (element, toValue, durationSeconds) => {
        if (!element) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: toValue,
          duration: durationSeconds,
          ease: 'power1.out',
          onUpdate: () => {
            element.textContent = formatNumber(Math.floor(counter.val));
          }
        });
      };

      const resetCount = (element) => {
        if (!element) return;
        element.textContent = '0';
      };

      let count2Done = false; // 🔥 AGREGADO: Variable necesaria para el segundo contador

      // 🔥 ARREGLADO: ScrollTrigger para el primer contador (1,000,000) - CON REINICIO
      ScrollTrigger.create({
        trigger: text1,
        start: 'top 95%',
        end: 'bottom 5%',
        onEnter: () => {
          animateCount(num1Ref.current, 1000000, 2.5);
        },
        onLeave: () => {
          resetCount(num1Ref.current);
        },
        onEnterBack: () => {
          animateCount(num1Ref.current, 1000000, 2.5);
        },
        onLeaveBack: () => {
          resetCount(num1Ref.current);
        }
      });

      // 🔥 ARREGLADO: ScrollTrigger para el segundo contador (1,000) - CON REINICIO
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60px',
        end: '+=4000',
        onUpdate: (self) => {
          const progress = self.progress;
          
          // SOLO activar cuando estemos en la segunda mitad (50% - 100%)
          if (progress >= 0.5) {
            if (!count2Done) {
              count2Done = true;
              animateCount(num2Ref.current, 1000, 1.8);
            }
          } else {
            // Si volvemos a la primera mitad, reiniciamos
            if (count2Done) {
              count2Done = false;
              resetCount(num2Ref.current);
            }
          }
        },
        onLeave: () => {
          resetCount(num2Ref.current);
          count2Done = false;
        },
        onEnterBack: () => {
          count2Done = false;
        }
      });
  

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#0141a5] text-white min-h-screen">
    
    <div className="h-[80vh] flex items-center justify-center">
        <h1 ref={scrollTextRef} className=" font-bold   text-2xl md:text-6xl   sm:text-6xl  lg:text-6xl xl:text-[64px]">Revisa nuestros numeros</h1>
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
            + <span ref={num1Ref}>0</span> MXN<br />
            <span className="text-2xl md:text-4xl opacity-80">EN CREDITOS</span>
          </div>
          <div
            ref={text2Ref}
            className="absolute text-2xl md:text-6xl sm:text-6xl lg:text-6xl xl:text-[64px] text-center text-white font-bold"
            style={{ color: '#ffffff' }}
          >
            + <span ref={num2Ref}>0</span><br />
            <span className="text-2xl md:text-4xl opacity-80">CLIENTES SATISFECHOS</span>
          </div>
        </div>
      </section>
    </div>
  );
}