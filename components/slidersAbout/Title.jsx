import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Title = React.forwardRef(({ children, className = "", disableAnimation = false }, ref) => {
  const localRef = useRef(null);
  const containerRef = ref || localRef;

  useEffect(() => {
    if (disableAnimation || !containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      }
    );
  }, [disableAnimation]);

  return (
    <p
      ref={containerRef}
      className={`font-extralight tracking-[2px] text-[2rem] sm:text-[2.4rem] md:text-[3rem] lg:text-[3.2rem] leading-[2.5rem] sm:leading-[3rem] md:leading-[3.6rem] lg:leading-[4rem] mb-3 ${className}`}
    >
      {typeof children === "string"
        ? children.split(" ").map((word, i) => (
            <span key={i} className="inline-block word mr-2">
              {word}
            </span>
          ))
        : children}
    </p>
  );
});

Title.displayName = "Title";
export default Title;
