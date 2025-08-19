'use client';

import { useContext, useRef, useState } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useIsomorphicLayoutEffect } from './helpers/isomorphicEffect';
import TransitionContext from './context/TransitionContext';
import '../styles/globals.css';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {

  const main = useRef();
  const scrollTween = useRef();
  const [ctx] = useState(gsap.context(() => {}, main));
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

  return (
    <main ref={main} className="min-h-screen">
      ds
      <section className="description panel blue h-screen flex items-center justify-center bg-blue-500 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Layered pinning</h1>
          <p className="mb-8">Use pinning to layer panels on top of each other as you scroll.</p>
          <div className="scroll-down">
            Scroll down<div className="arrow"></div>
          </div>
        </div>
      </section>
      <section className="panel red h-screen flex items-center justify-center bg-red-500 text-white text-4xl font-bold">ONE</section>
      <section className="panel orange h-screen flex items-center justify-center bg-orange-500 text-white text-4xl font-bold">TWO</section>
      <section className="panel purple h-screen flex items-center justify-center bg-purple-500 text-white text-4xl font-bold">THREE</section>
      <section className="panel green h-screen flex items-center justify-center bg-green-500 text-white text-4xl font-bold">FOUR</section>
    </main>
  );
}
