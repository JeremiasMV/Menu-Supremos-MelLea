import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

function MenuFooter(){
    return (
        <footer className="text-white text-center py-6 border-t" style={{backgroundColor: '#121212', borderTopColor: '#2d2319'}}>
            <p className="text-sm text-gray-400">
                Desarrollado por <a 
                    href="https://wa.me/56987308245" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors font-semibold"
                >
                    Jeremías Martínez • Soluciones digitales
                </a>
            </p>

           <div className="flex justify-center gap-6 mb-4 mt-4">
            <a href="tel:+56955260387" className="hover:text-amber-400 transition-all hover:scale-110">
                 <Phone size={20} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61574508236320&rdid=xE1VFaFhbQa0orFE&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DbE5xbzpg%2F#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-all hover:scale-110"
              >
                <FaFacebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/pizeriamellea?utm_source=qr&igsh=N2YxNzEycjdlNHU2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-all hover:scale-110"
              >
                <FaInstagram size={20} />
            </a>

            <a 
              href="https://wa.me/56955260387"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-all hover:scale-110"
              >
                <FaWhatsapp size={20} />
            </a>
            
            </div>

        <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} - Todos los derechos reservados
        </p>

        </footer>
    );
}

export default MenuFooter;