import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useEffect, useRef, useState} from "react";
import {MultiSelect} from "primereact/multiselect";
import { districts } from "../constants/districts.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useHotelContext} from "../context/HotelContext.tsx";
import CustomIcon from "./shared/Icon.tsx";
import {InputSwitch} from "primereact/inputswitch";
import {Menu} from "primereact/menu";
import Modal from "./shared/Modal.tsx";
import LoginForm from "./LoginForm.tsx";
import RegisterForm from "./RegisterForm.tsx";

const Header = () => {
    const [searchName, setSearchName] = useState("");
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [authView, setAuthView] = useState<"login" | "register">("login");

    const navigate = useNavigate();
    const location = useLocation();
    const { searchHotels } = useHotelContext();

    const menuRef = useRef<Menu>(null);

    const menuItems = [
        {
            label: "Iniciar sesión",
            icon: "pi pi-sign-in",
            command: () => {
                setAuthView("login");
                setIsVisible(true);
            },
        },
        {
            label: "Registrarse",
            icon: "pi pi-user-plus",
            command: () => {
                setAuthView("register");
                setIsVisible(true);
            },
        },
    ];

    useEffect(() => {
        const storedLocation = sessionStorage.getItem("userLocation");
        if (storedLocation) {
            setUserLocation(JSON.parse(storedLocation));
            setUseCurrentLocation(true);
        }
    }, []);

    useEffect(() => {
        handleSearch();
    }, [userLocation]);

    const handleToggleLocation = () => {
        if (!useCurrentLocation) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const locationData = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        setUserLocation(locationData);
                        sessionStorage.setItem("userLocation", JSON.stringify(locationData));
                        setUseCurrentLocation(true);
                    },
                    () => {
                        alert("No pudimos acceder a tu ubicación.");
                        setUseCurrentLocation(false);
                    }
                );
            } else {
                alert("Tu navegador no soporta geolocalización.");
                setUseCurrentLocation(false);
            }
        } else {
            setUserLocation(null);
            sessionStorage.removeItem("userLocation");
            setUseCurrentLocation(false);
        }
    };

    const handleSearch = () => {
        const filters = {
            name: searchName,
            district: selectedDistricts,
            location: userLocation || undefined,
        };

        searchHotels(filters);

        if (location.pathname !== "/") {
            navigate("/");
        }
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

                <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-lg shadow-md">
                    {/* Hotel Name Input */}
                    <div className="relative">
                        <CustomIcon
                            icon="material-symbols:search"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <InputText
                            placeholder="Ingrese el Nombre"
                            className="pl-10 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[220px]"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>

                    {/* District Select */}
                    <div className="relative">
                        <CustomIcon
                            icon="material-symbols:location-on"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <MultiSelect
                            value={selectedDistricts}
                            options={districts}
                            onChange={(e) => setSelectedDistricts(e.value)}
                            placeholder="Selecciona el Distrito"
                            className="pl-10 rounded-md border border-gray-300 text-sm w-[320px]"
                            filter
                        />
                    </div>

                    {/* Use Location Switch */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CustomIcon icon="ic:round-my-location" className={useCurrentLocation ? 'text-green-400' : 'text-red-600'} />
                        <label>Usar mi ubicacion</label>
                        <InputSwitch checked={useCurrentLocation} onChange={handleToggleLocation} />
                    </div>

                    {/* Search Button */}
                    <div className="ml-auto">
                        <Button
                            label="Buscar Telos"
                            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-md text-sm"
                            onClick={handleSearch}
                        />
                    </div>
                </div>

                <Button
                    icon="pi pi-user"
                    className="rounded-full"
                    onClick={(e) => menuRef.current?.toggle(e)}
                    aria-haspopup
                    aria-controls="profile_menu"
                />

                <Menu model={menuItems} popup ref={menuRef}></Menu>

                <Modal
                    visible={isVisible}
                    onHide={() => setIsVisible(false)}
                    header={authView == "login" ? "Logeate" : "Crea tu cuenta"}
                >
                    {authView === "login" ? (
                        <LoginForm />
                    ) : (
                        <RegisterForm  />
                    )}
                </Modal>
            </div>
        </header>
    );
};

export default Header;
