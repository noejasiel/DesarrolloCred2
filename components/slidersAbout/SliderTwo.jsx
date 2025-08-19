import Paragraph from "./Paragraph";
import Title from "./Title";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import img2 from "../../public/Landing_02.jpg";

export default function SlideTwo() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 600 },
      { opacity: 1, y: 0, duration: 0.6 }
    ).fromTo(
      paragraphRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2,
      }
    );
  }, []);

  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden">
      {/* Imagen optimizada como fondo */}
      <Image
        src={img2}
        alt="Slide fondo 2"
        fill
        placeholder="blur"
        className="object-cover object-center z-0"
        priority={true} // Usa true si necesitas que cargue primero
      />

      {/* Overlay y contenido */}
      <div className="absolute inset-0 bg-black/10 z-10" />
      <div className="absolute top-[50%] right-8 text-white px-4 py-2 rounded-lg transform -translate-y-1/2 z-20">
        <Title ref={titleRef}>Seguridad y transparencia</Title>
        <Paragraph ref={paragraphRef}>
          Descubre un mundo sin complicaciones.
        </Paragraph>
      </div>
    </div>
  );
}
