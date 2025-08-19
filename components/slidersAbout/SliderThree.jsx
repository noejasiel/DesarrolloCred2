import Paragraph from "./Paragraph";
import Title from "./Title";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import img3 from "../../public/Landing_03_updated.jpg"; // Ruta de la imagen

export default function SlideThree() {
  const blockRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    blockRefs.current.forEach((block) => {
      if (!block) return;

      const words = block.querySelectorAll(".word");
      const paragraph = block.querySelector(".paragraph");

      tl.fromTo(
        words,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
      ).fromTo(
        paragraph,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4 },
        "-=0.2"
      );
    });
  }, []);

  const blocks = [
    {
      title: "Seguridad y transparencia",
      paragraph: "Descubre un mundo sin complicaciones.",
    },
    {
      title: "Una tarjeta sin datos",
      paragraph: "Diseñada para el futuro, sin riesgos.",
    },
    {
      title: "Sin contacto",
      paragraph: "Todo desde tu celular. Nada más.",
    },
  ];

  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
      {/* Imagen optimizada */}
      <Image
        src={img3}
        alt="Fondo slide 3"
        fill
        priority
        placeholder="blur"
        className="object-cover object-center z-0"
      />

      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Contenido animado */}
      <div className="absolute top-[50%] right-[10%] text-white px-4 py-2 rounded-lg transform -translate-y-1/2 z-20">
        <div className="flex flex-col gap-24">
          {blocks.map((block, i) => (
            <div
              key={i}
              ref={(el) => (blockRefs.current[i] = el)}
              className="block"
            >
              <Title disableAnimation>{block.title}</Title>
              <Paragraph className="paragraph">{block.paragraph}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
