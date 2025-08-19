'use client';
import Image from "next/image";

export const LayersSectionLast = ({
    title,
    description,
    button,
    imageCelRefs,
    imagePcRefs,
    sectionRefs,
    position = 0,
}) => {
    return (
        <section className="panel w-full h-fit md-h-screen  flex items-center justify-center pt-[100px] md:pt-12 bg-black overflow-hidden">
            <div
               className="sticky top-0 min-h-screen h-screen w-full flex flex-col items-center justify-center p-12 bg-black overflow-hidden"

               
            >
                {/* Texto centrado */}
                <div className="w-full text-center z-10 px-4 ">
                    <h1
                        className="font-bold text-white text-center text-xl md:text-6xl pt-10  sm:text-6xl  lg:text-6xl xl:text-[64px] pb-8"
                        style={{
                            letterSpacing: '0.4px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            lineHeight: '1.2',

                        }}
                    >
                        {title.uno}<br />{title.dos}
                    </h1>
                    <a
                        href="#"
                        className="inline-block px-6 py-3 rounded-full bg-white text-black font-medium hover:opacity-90 transition"
                    >
                        {button}
                    </a>
                </div>

                {/* Imágenes de dispositivos */}

                <div
                    className="w-full  items-end justify-center gap-8 md:gap-12  px-4 md:px-0 flex"
                    ref={(el) => (sectionRefs.current[position] = el)}
                >
                    <div className="w-[250px] md:w-[20%] max-w-[300px] relative">
                        <Image
                            ref={(el) => (imageCelRefs.current[position] = el)}
                            src="/imgCel.webp"
                            alt="Celular Fondea"
                            width={200}
                            height={400}
                            className="object-contain w-full h-auto"
                            
                        />
                    </div>

                    <div className="w-[300px] md:w-[70%] max-w-[1200px] relative hidden md:block">
                        <Image
                            ref={(el) => (imagePcRefs.current[position] = el)}
                            src="/imgPC.webp"
                            alt="Tablet Fondea"
                            width={600}
                            height={400}
                            className="object-contain w-full h-auto"
                            
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};
