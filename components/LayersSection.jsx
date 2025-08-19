import Image from "next/image";



export const LayersSection = ({
    title,
    description,
    image,
    button,
    imageRefs,
    sectionRefs,
    position = 0,
}) => {
    return (
        <section className="panel w-full  h-screen flex items-center justify-center   text-4xl font-bold pt-[100px] md:pt-0 bg-[#f8f8f8]">
            <div className="min-h-screen flex items-center justify-between   md:pl-12  flex-col md:flex-row"
                style={{
                    backgroundColor: "#f8f8f8",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "90vh",
                    marginTop: 0,
                    marginBottom: 0,
                    display: "flex",
                    position: "sticky",
                    top: 0,
                    overflow: "hidden",
                    width: "100%",
                    
                }}
            >
                {/* Texto */}
                <div className="w-[100%] md:w-[50%] text-left z-10 px-6">
                    <h1 className=" font-bold text-black mb-4 text-left bg-[#f8f8f8] text-2xl md:text-6xl   sm:text-6xl  lg:text-6xl xl:text-[64px]"
                        style={{
                            color: 'black',
                            letterSpacing: '0.4px',
                            marginBottom: '0',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            lineHeight: '1.1',
                            width: "100%",
                        }}
                    >
                        {title.uno}<br /> {title.dos}
                    </h1>
                    <p className="text-[20px] text-gray-700 mb-6 mt-5">
                        {description}
                    </p>
                    <a href="#" className="text-black font-semibold hover:underline text-left" >
                        {button} →
                    </a>
                </div>

                {/* Imagen */}
                <div className="w-[100%] md:w-[50%] h-[50vh] md:h-[90vh] overflow-hidden relative md:right-[-30px]" 
                style={{
                    height: "100%",
                    objectFit: "cover",
                    position: "relative",
                }}
                    ref={(el) => (sectionRefs.current[position] = el)}
                >
                    <Image
                        ref={(el) => (imageRefs.current[position] = el)}
                        className="object-cover md:object-contain md:h-full"
                        src={image}
                        alt="Tablet Fondea Empresarial"
                        width={"1000"}
                        height={"1000"}
                        priority
                        style={{
                            width: "100%",
                            verticalAlign: "middle",
                            maxWidth: "100%",
                            display: "inline-block",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
