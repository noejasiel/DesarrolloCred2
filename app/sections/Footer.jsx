import { brand } from '../config/brand'

const Footer = () => {
    return (
      <footer className="bg-black text-white text-sm px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Links principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <h4 className="font-semibold mb-3 text-gray-400">Cuenta</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Recibe rendimientos</a></li>
                <li><a href="#" className="hover:underline">Créditos empresariales</a></li>
                <li><a href="#" className="hover:underline">Administración de gastos</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
              </ul>
            </div>
  
            <div>
              <h4 className="font-semibold mb-3 text-gray-400">Compañía</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </div>
          </div>
  
          {/* Línea separadora */}
          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-gray-400">
            <p>© 2024 {brand.name}®</p>
  
            <ul className="flex flex-wrap gap-4 text-gray-400">
              <li><a href="#" className="hover:underline">Requisitos de contratación</a></li>
              <li><a href="#" className="hover:underline">Costos y comisiones</a></li>
              <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
              <li><a href="#" className="hover:underline">Aviso de privacidad</a></li>
            </ul>
          </div>
  
          {/* Leyenda legal */}
          <div className="mt-6 text-xs text-gray-500 leading-relaxed">
            <p>
              {brand.name} | Empresarial es un producto de {brand.name}®. <br />
              {brand.name}® es una marca registrada propiedad Fondea Technologies, S.A. de C.V., S.F.P.
              Fondea Technologies, S.A. de C.V., S.F.P. es una entidad financiera autorizada y
              supervisada por el Gobierno Federal, bajo la Ley de Ahorro y Crédito Popular.
              Igualmente es supervisada por la FEDRURAL, de conformidad con la mencionada ley.
            </p>
          </div>
  
          {/* Estado del sistema */}
          <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
            Todos los sistemas funcionando
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  