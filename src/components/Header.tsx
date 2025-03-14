import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import CustomIcon from "./shared/Icon.tsx";
import {MultiSelect} from "primereact/multiselect";
import { districts } from "../constants/districts.tsx";

const Header = () => {
    const [searchName, setSearchName] = useState("");
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const navigate = useNavigate(); // Hook para redirigir

    // Función para realizar la búsqueda y redirigir a Home con los filtros
    const handleSearch = () => {
        const queryParams = new URLSearchParams();

        console.warn(selectedDistricts);

        if (searchName) queryParams.append("name", searchName);

        if (selectedDistricts.length > 0) {
            queryParams.append("district", selectedDistricts.join(",")); // 🔹 Convertimos el array a string separado por comas
        }

        navigate(`/?${queryParams.toString()}`);
    };

    return (
        <header className="w-full bg-red-800 text-white shadow-md">
            <div className="bg-red-400 text-red-500 mx-auto flex items-center justify-between gap-4 p-4">
                <div
                    className="text-lg font-bold flex-shrink-0 cursor-pointer text-gray-900 hover:text-gray-700"
                    onClick={handleSearch}
                >
                    TeloGO
                </div>

                <div className="flex items-center bg-white rounded-full shadow-md p-2">

                    {/* Campo: Nombre del Hotel */}
                    <div className="relative flex-1">
                        <CustomIcon icon="material-symbols:person"
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"/>
                        <InputText
                            placeholder="Nombre del Hotel"
                            className="w-full pl-10 border-gray-300 rounded-lg py-2"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>

                    {/* Campo: Distrito */}
                    <div className="relative flex-1 ml-2">
                        {/* Ícono alineado a la izquierda dentro del campo */}
                        <CustomIcon
                            icon="material-symbols:map"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg"
                        />

                        {/* MultiSelect con espaciado correcto para el ícono */}
                        <MultiSelect
                            value={selectedDistricts}
                            options={districts}
                            onChange={(e) => setSelectedDistricts(e.value)}
                            placeholder="Elige distritos"
                            className="w-full md:w-20rem pl-10 border-gray-300 rounded-lg py-2"
                        />
                    </div>

                    {/* Botón de Búsqueda */}
                    <div className="ml-4">
                        <Button
                            icon="pi pi-search"
                            className="p-button-primary px-6 py-2"
                            onClick={handleSearch} // Ejecuta la búsqueda y redirige al Home
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
