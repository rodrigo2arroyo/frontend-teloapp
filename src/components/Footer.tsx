import {Icon} from "@iconify/react";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 text-gray-600 text-sm border-t border-gray-300">
            <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-row justify-between items-center">
                {/* Enlaces legales */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4 sm:mb-0">
                    <span>© 2025 TeloApp, Inc.</span>
                    <span className="hidden sm:inline">·</span>
                    <a href="/privacidad" className="hover:underline">Privacidad</a>
                    <span className="hidden sm:inline">·</span>
                    <a href="/terminos" className="hover:underline">Términos</a>
                    <span className="hidden sm:inline">·</span>
                    <a href="/mapa" className="hover:underline">Mapa del sitio</a>
                </div>

                {/* Opciones e íconos */}
                <div className="flex items-center gap-4">
                    {/* Idioma */}
                    <div className="flex items-center gap-1">
                        <i className="pi pi-globe" />
                        <span>Español (PE)</span>
                    </div>

                    {/* Moneda */}
                    <div className="flex items-center gap-1">
                        <span>S/.</span>
                        <span>PEN</span>
                    </div>

                    {/* Redes sociales */}
                    <div className="flex gap-3">
                        <a href="#" className="hover:text-gray-800">
                            <Icon icon="mdi:facebook" className="text-lg"/>
                        </a>
                        <a href="#" className="hover:text-gray-800">
                            <Icon icon="mdi:twitter" className="text-lg"/>
                        </a>
                        <a href="#" className="hover:text-gray-800">
                            <Icon icon="mdi:instagram" className="text-lg"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
