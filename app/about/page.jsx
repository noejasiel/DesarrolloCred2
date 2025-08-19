'use client';
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import SlideOne from "../../components/slidersAbout/SliderOne";
import SlideTwo from "../../components/slidersAbout/SliderTwo";
import SlideThree from "../../components/slidersAbout/SliderThree";
import Link from "next/link";
import Navbar from "../../components/slidersAbout/Navbar";

const slides = [
  {
    color: "bg-yellow-200",
    text: "Seguridad y transparencia",
    img: "/Landing_01.jpg",
    textPosition: "top-left",
  },
  {
    color: "bg-cyan-200",
    text: "Una tarjeta sin datos",
    img: "/Landing_02.jpg",
    textPosition: "bottom-right",
  },
  {
    color: "bg-purple-200",
    text: "Sin riesgo, sin contacto",
    img: "/Landing_03_updated.jpg",
    textPosition: "center",
  },
];





export default function FlashCarousel() {
  const [index, setIndex] = useState(0);
  const flashRef = useRef(null);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(null);


  const slides = [<SlideOne />, <SlideTwo />, <SlideThree />];


  const handleScroll = (e) => {
    if (isTransitioning.current) return;

    const threshold = 30; // Evita cambios con scroll mínimo
    if (Math.abs(e.deltaY) < threshold) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    let newIndex = index + direction;

    if (newIndex < 0 || newIndex >= slides.length) return;

    isTransitioning.current = true;

    gsap.timeline()
      .to(flashRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      })
      .add(() => {
        setIndex(newIndex);
      })
      .to(flashRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          // Permitir siguiente cambio
          isTransitioning.current = false;
        },
      });
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      handleScroll(e);
    };
  
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };
  
    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return;
  
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;
  
      handleScroll({ deltaY });
      touchStartY.current = null;
    };
  
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
  
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [index]);
  

  const getTextPositionClass = (position) => {
    switch (position) {
      case "top-left":
        return "top-50 left-4 text-left";
      case "top-right":
        return "top-4 right-4 text-right";
      case "bottom-left":
        return "bottom-4 left-4 text-left";
      case "bottom-right":
        return "bottom-4 right-4 text-right";
      case "center":
      default:
        return "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center";
    }
  };


  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden overscroll-none touch-none bg-black text-white">

      {/* NAVBAR */}
    <Navbar />


      {/* SLIDE ACTUAL */}
      {slides[index]}


      {/* FLASH */}
      <div
        ref={flashRef}
        className="absolute top-0 left-0 min-h-[100dvh] w-full overflow-hidden bg-white/40 opacity-0 pointer-events-none z-40"
      ></div>

      {/* INDICADORES DE PÁGINA */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col space-y-3">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? "bg-red-500 scale-680" : "bg-white"
              }`}
          />
        ))}
      </div>

    </div>
  );
}
