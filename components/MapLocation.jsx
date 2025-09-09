'use client';

export default function MapLocation() {
  return (
    <section className="relative py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-[#0045ac]">
            Nuestra <span className="text-[#003a8c]">Ubicación</span>
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visítanos en nuestras oficinas ubicadas en el corazón de la Ciudad de México
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="w-full h-[50vh]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.534901458314!2d-99.18348948836919!3d19.432491481771212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f8ad1921f92d%3A0x42237da10078725!2sMariano%20Escobedo%2C%20Calz.%20Gral.%20Mariano%20Escobedo%20476%2C%20Anzures%2C%20Miguel%20Hidalgo%2C%2011590%20Ciudad%20de%20M%C3%A9xico%2C%20CDMX!5e0!3m2!1ses-419!2smx!4v1757397600583!5m2!1ses-419!2smx" 
              width="100%" 
              height="400" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
              title="Ubicación de nuestras oficinas"
            />
          </div>
          
          {/* Información de contacto debajo del mapa */}
          <div className="p-8 bg-gray-50">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-[#0045ac] mb-3">Dirección</h4>
                <p className="text-gray-700 text-lg">
                  Calz. Gral. Mariano Escobedo 476<br />
                  Anzures, Miguel Hidalgo<br />
                  11590 Ciudad de México, CDMX
                </p>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-[#0045ac] mb-3">Horarios de Atención</h4>
                <p className="text-gray-700 text-lg">
                  Lunes a Viernes: 9:00 AM - 6:00 PM<br />
                  Sábados: 9:00 AM - 2:00 PM<br />
                  Domingos: Cerrado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
