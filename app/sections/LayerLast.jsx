'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import TransitionContext from '../context/TransitionContext';
import '../../styles/globals.css';
import { useIsomorphicLayoutEffect } from '../helpers/isomorphicEffect';
import { LayersSectionLast } from '../../components/LayersSectionLast';
import { brand } from '../config/brand'


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function LayerLast() {
  const sectionRefs = useRef([]);
  const imageCelRefs = useRef([]);
  const imagePcRefs = useRef([]);
  const fondeadoraRef = useRef(null);
  const lettersRef = useRef([]);


  const main = useRef();
  const scrollTween = useRef();
  const [ctx] = useState(gsap.context(() => { }, main));
  const { completed } = useContext(TransitionContext);

  const goToSection = (i) => {
    ctx.data.forEach((e) => {
      if (e.vars && e.vars.id === 'scrollTween') {
        e.kill();
      }
    });
    ctx.add(() => {
      scrollTween.current = gsap.to(window, {
        scrollTo: { y: i * window.innerHeight, autoKill: false },
        duration: 1,
        id: 'scrollTween',
        onComplete: () => (scrollTween.current = null),
        overwrite: true,
      });
    });
  };

  useIsomorphicLayoutEffect(() => {
    if (!completed) return;

    ctx.add(() => {
      const panels = gsap.utils.toArray('.panel');
      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top bottom',
          end: '+=200%',
          onToggle: (self) =>
            self.isActive && !scrollTween.current && goToSection(i),
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        snap: 1 / (panels.length - 1),
      });
    });

    return () => ctx.revert();
  }, [completed]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    sectionRefs.current.forEach((section, index) => {
      const cell = imageCelRefs.current[index];
      const pc = imagePcRefs.current[index];

      if (cell) {
        gsap.fromTo(
          cell,
          {
            opacity: 0,
            y: 120,
            scale: 0.8,
            transformStyle: "preserve-3d",
            willChange: "transform",
          },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 10%',
              scrub: 2,
            },
            duration: 6, // Aumentado de 3 a 6 segundos
            y: 90,
            scale: 1.1,
            opacity: 1,
            ease: 'power2.out',
            transformStyle: "preserve-3d",
            willChange: "transform",
          }
        );
      }
      
      if (pc) {
        gsap.fromTo(
          pc,
          {
            y: 120, 
            opacity: 0, 
            transform: "translate3d(0px, 300px, 0px) scale3d(.8, .8, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            transformStyle: "preserve-3d",
            willChange: "transform",
          },
          {
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 10%',
              scrub: 2,
            },
            transform: "translate3d(0px, 80px, 0px) scale3d( 1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
            willChange: "transform",
            transformStyle: "preserve-3d",
            y: -100,
            opacity: 1,
            duration: 6, // Aumentado de 3 a 6 segundos
            ease: 'power2.out',
          }
        );
      }
    });

    if (fondeadoraRef.current) {
      gsap.fromTo(
        fondeadoraRef.current,
        {
          y: 200,
          opacity: 0,
          scale: 1.2,
        },
        {
          scrollTrigger: {
            trigger: fondeadoraRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: true,
          },
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
        }
      );
    }
    if (lettersRef.current.length) {
      gsap.fromTo(
        lettersRef.current,
        {
          y: 150,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: lettersRef.current[0],
            start: 'top 120%',
            end: 'top 45%',
            scrub: 1,
          },
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          duration: 1,
          stagger: {
            each: 1, // ← más lento
          },
        }
      );
    }
    
    


    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <main ref={main} className="min-h-screen overflow-hidden ">

      <LayersSectionLast
        Last
        title={{ uno: 'Rendimiento desde el', dos: 'primer peso' }}
        description="Recibe cada mes el 4% de rendimiento anual sobre tu saldo promedio mensual. Sin plazos forzosos ni montos mínimos."
        button="Abrir mi cuenta"
        imageCelRefs={imageCelRefs}
        imagePcRefs={imagePcRefs}
        sectionRefs={sectionRefs}
        position={0}
      />

      <section className=" w-full h-[30vh] px-12 bg-black relative overflow-hidden">
        {/* Texto Fondeadora */}
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            {brand.name.split('').map((letter, i) => (
              <span key={i} ref={(el) => (lettersRef.current[i] = el)} className="inline-block">
                {letter}
              </span>
            ))}
          </h2>



        </div>

        {/* Contenido adicional superpuesto */}

      </section>


    </main>
  );
}
