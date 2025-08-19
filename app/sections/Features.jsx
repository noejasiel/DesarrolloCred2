// app/sections/Features.js
export default function Features() {
    return (
      <section className="py-20 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold mb-10">Lo que obtienes</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">Cuenta digital</h3>
              <p>Administra todo desde una app intuitiva.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Tarjeta empresarial</h3>
              <p>Física y virtual sin costos escondidos.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Atención prioritaria</h3>
              <p>Soporte personalizado para tu empresa.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  