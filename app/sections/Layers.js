'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import TransitionContext from '../context/TransitionContext'
import '../../styles/globals.css'
import { useIsomorphicLayoutEffect } from '../helpers/isomorphicEffect';
import Image from 'next/image';
import { LayersSection } from '../../components/LayersSection';



gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Layers() {


  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);

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
      gsap.fromTo(imageRefs.current[index], 
        {
          transform: "translate3d(7%, -30px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        },
        {
          scrollTrigger: {
            trigger: section,
            start: () => {
              return window.innerWidth < 768 ? "top 60%" : "top 20%";
            },
            end: "bottom top",
            scrub: 1,
          },
          willChange:   "transform",
          transformStyle: "preserve-3d",
          transform: "translate3d(5%, 80px, 0px) scale3d(1.1, 1.1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
          ease: "power2.out",
        }
      );
    });
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);


  return (
    <main ref={main} className="min-h-screen">
      
      <LayersSection
        title={{uno: "Te ayudamos a alcanzar", dos: "el éxito financiero"}}
        description="Nuestros servicios financieros se basan en un profundo conocimiento del mercado y en la experiencia de nuestro equipo de profesionales altamente capacitados.

Trabajaremos estrechamente contigo para comprender tus metas financieras y desarrollar estrategias que maximicen tus oportunidades de crecimiento y rentabilidad."
        image="/imgRenew.png" 
        button="Descubre cómo solicitarlos"
        imageRefs={imageRefs}
        sectionRefs={sectionRefs}
        position={0}
      />
      <LayersSection
        title={{uno: "Confianza y credibilidad", dos: "garantizada"}}
        description="Construimos relaciones duraderas basadas en la transparencia total y resultados comprobables. Nuestro historial de éxito incluye años de experiencia en el sector financiero, respaldados por miles de clientes satisfechos y un equipo de expertos certificados que prioriza tu seguridad financiera."
        image="/imgRenew2.png"
        button="Descubre cómo solicitarlos"
        imageRefs={imageRefs}
        sectionRefs={sectionRefs}
        position={1}
      />

     {/*  <LayersSection
        title={{uno: "Mucho más que una", dos: "cuenta"}}
        description="Administra todos los gastos de tu negocio fácilmente."
        image="/img3.webp"
        button="Descubre cómo solicitarlos"
        imageRefs={imageRefs}
        sectionRefs={sectionRefs}
        position={2}
      /> */}

    
    </main>
  );
}
