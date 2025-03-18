import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useEffect, useState} from "react";
import {MultiSelect} from "primereact/multiselect";
import { districts } from "../constants/districts.tsx";
import {ToggleButton} from "primereact/togglebutton";

const Header = () => {
    const [searchName, setSearchName] = useState("");
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

    useEffect(() => {
        // Verificamos si ya hay una ubicación almacenada en la sesión
        const storedLocation = sessionStorage.getItem("userLocation");
        if (storedLocation) {
            setUserLocation(JSON.parse(storedLocation));
            setUseCurrentLocation(true);
        }
    }, []);

    const handleToggleLocation = () => {
        if (!useCurrentLocation) {
            // Si el usuario activa "ON", pedimos la ubicación
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationData = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        setUserLocation(locationData);
                        sessionStorage.setItem("userLocation", JSON.stringify(locationData)); // Guardar en sessionStorage
                        setUseCurrentLocation(true);
                    },
                    (error) => {
                        console.error("Error obteniendo la ubicación:", error);
                        setUseCurrentLocation(false);
                        alert("No pudimos acceder a tu ubicación. Actívala en la configuración del navegador.");
                    }
                );
            } else {
                console.error("Geolocalización no soportada por el navegador.");
                alert("Tu navegador no soporta geolocalización.");
                setUseCurrentLocation(false);
            }
        } else {
            // Si el usuario desactiva "OFF", eliminamos la ubicación guardada
            setUserLocation(null);
            sessionStorage.removeItem("userLocation");
            setUseCurrentLocation(false);
        }
    };

    const handleSearch = () => {
        const queryParams = new URLSearchParams();

        if (searchName) queryParams.append("name", searchName);
        if (selectedDistricts.length > 0) {
            queryParams.append("district", selectedDistricts.join(","));
        }
        console.log("Buscando con los parámetros:", queryParams.toString());
    };

    return (
        <header className="w-full shadow-md">
            <div className="bg-cyan-400 mx-auto flex items-center justify-between gap-4 p-4">
                <div
                    className="text-lg font-bold flex-shrink-0 cursor-pointer text-gray-900 hover:text-gray-700"
                    onClick={handleSearch}
                >
                    TeloGO
                </div>
                <div className="flex items-center bg-white shadow-md p-4">
                    <div className="relative flex-1 max-w-[200px]">
                        <InputText
                            placeholder="Nombre del Hotel"
                            className="w-full pl-10 border-gray-300 rounded-lg"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <div className="relative flex-1 ml-2 max-w-[400px] truncate">
                        <MultiSelect
                            value={selectedDistricts}
                            options={districts}
                            onChange={(e) => setSelectedDistricts(e.value)}
                            placeholder="Elige distritos"
                            className="w-full md:w-[400px] pl-10 border-gray-300 rounded-lg truncate"
                            filter
                        />
                    </div>
                    <div className="ml-4">
                        <Button
                            icon="pi pi-search"
                            className="p-button-primary px-6 py-2"
                            onClick={handleSearch}
                        />
                    </div>
                </div>

                {/* 🔥 Aquí agregamos el ToggleButton para la ubicación */}
                <div className="ml-4 flex items-center space-x-2">
                    <label className="text-white text-sm">Usar mi ubicación</label>
                    <ToggleButton
                        checked={useCurrentLocation}
                        onChange={handleToggleLocation}
                        onLabel="ON"
                        offLabel="OFF"
                        onIcon="pi pi-map-marker"
                        offIcon="pi pi-times"
                        className="p-button-rounded p-button-sm"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
