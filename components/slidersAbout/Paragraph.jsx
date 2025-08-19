import React from "react";

const Paragraph = React.forwardRef(({ children, className = "" }, ref) => (
  <p
    ref={ref}
    className={`font-extralight text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.3rem] ${className}`}
  >
    {children}
  </p>
));

Paragraph.displayName = "Paragraph";
export default Paragraph;
