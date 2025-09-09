import { brand } from '../config/brand'

const Footer = () => {
    return (
      <footer className="bg-gradient-to-br from-[#f8f8f8] via-blue-50 to-[#e8f2ff] text-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contenido principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo y descripción */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo.png" alt="Logo" width={60} height={60} className="rounded-lg" />
                <div>
                  <h3 className="text-lg font-bold text-[#0045ac]">DESARROLLO CREDITICIO PERSONAL Y EMPRESARIAL</h3>
                  <p className="text-sm text-gray-600">componentes vifer</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Especialistas en asesoría crediticia personal y empresarial. Te ayudamos a encontrar las mejores opciones de financiamiento adaptadas a tu perfil.
              </p>
            </div>

            {/* Enlaces de navegación */}
            <div>
              <h4 className="font-semibold mb-4 text-[#0045ac] text-lg">Navegación</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-gray-600 hover:text-[#0045ac] transition-colors duration-200">Calculadora</a></li>
                <li><a href="#credit-cards" className="text-gray-600 hover:text-[#0045ac] transition-colors duration-200">Créditos</a></li>
                <li><a href="#contact-form" className="text-gray-600 hover:text-[#0045ac] transition-colors duration-200">Contacto</a></li>
                <li><a href="#faq-section" className="text-gray-600 hover:text-[#0045ac] transition-colors duration-200">FAQ</a></li>
              </ul>
            </div>

            {/* Información de contacto */}
            <div>
              <h4 className="font-semibold mb-4 text-[#0045ac] text-lg">Contacto</h4>
              <ul className="space-y-3">
                <li className="text-gray-600">📞 +52 (55) 93-14-65-04</li>
                <li className="text-gray-600 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  +52 (55) 86-09-87-71
                </li>
                <li className="text-gray-600 text-sm md:text-base break-words max-w-xs">✉️ informacion@desarrollocrediticiopersonalyempresarial.com</li>
                <li className="text-gray-600">📍 Calz. Gral. Mariano Escobedo 476, Chapultepec Morales, Anzures, Miguel Hidalgo, CP. 11590 CDMX</li>
              </ul>
            </div>
          </div>

          {/* Línea separadora */}
          <div className="border-t border-gray-300 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Leyenda legal */}
              <div className="text-sm text-gray-500 leading-relaxed">
                <p>
                  {brand.name} es un producto de Componentes Vifer®. <br />
                  {brand.name}® es una marca registrada propiedad Componentes Vifer®.
                </p>
              </div>

            
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  