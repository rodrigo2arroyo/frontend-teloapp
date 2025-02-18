import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

const Header = () => {
    return (
        <header className="w-full bg-red-800 text-white shadow-md">
            <div className="bg-red-400 text-red-500 mx-auto flex items-center justify-between gap-4 p-4">
                {/* Logo (izquierda) */}
                <div className="text-lg font-bold flex-shrink-0">
                    My App a
                </div>

                {/* Search Bar (centro) */}
                <div className="flex items-center bg-white rounded-full shadow-md p-2">
                    {/* Campo: Dónde */}
                    <div className="flex-1 px-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-map-marker"/>
                    <InputText placeholder="Explora destinos" className="w-full border-none"/>
                </span>
                    </div>

                    {/* Separador */}
                    <div className="border-l h-6 mx-2"/>

                    {/* Campo: Llegada */}
                    <div className="flex-1 px-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-calendar"/>
                    <InputText placeholder="Agrega fecha de llegada" className="w-full border-none"/>
                </span>
                    </div>

                    {/* Separador */}
                    <div className="border-l h-6 mx-2"/>

                    {/* Campo: Salida */}
                    <div className="flex-1 px-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-calendar"/>
                    <InputText placeholder="Agrega fecha de salida" className="w-full border-none"/>
                </span>
                    </div>

                    {/* Separador */}
                    <div className="border-l h-6 mx-2"/>

                    {/* Campo: Quién */}
                    <div className="flex-1 px-2">
                <span className="p-input-icon-left">
                    <i className="pi pi-users"/>
                    <InputText placeholder="¿Cuántos?" className="w-full border-none"/>
                </span>
                    </div>

                    {/* Botón de búsqueda */}
                    <div className="ml-4">
                        <Button
                            icon="pi pi-search"
                            className="p-button-rounded p-button-danger"
                            aria-label="Buscar"
                        />
                    </div>
                </div>

                {/* Botón (derecha) */}
                <div className="flex-shrink-0">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        Botón
                    </button>
                </div>
            </div>
        </header>

    );
};

export default Header;
