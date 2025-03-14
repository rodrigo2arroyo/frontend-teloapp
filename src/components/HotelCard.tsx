import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {Galleria} from "primereact/galleria";
import CustomIcon from "./shared/Icon.tsx";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

interface HotelCardProps {
    hotel: HotelResponse;
}

const BASE_URL = "http://localhost:5125"; // Asegúrate de que esta URL sea correcta



const getFullImageUrl = (path: string) => {
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="border shadow-lg rounded-lg flex flex-col bg-white overflow-hidden">
            {/* Imagen del hotel */}
            <div className="p-0">
                {hotel.images && hotel.images.length > 0 ? (
                    <Galleria
                        value={hotel.images.map(getFullImageUrl)}
                        numVisible={5}
                        circular
                        showThumbnails={false}
                        showItemNavigators
                        item={(image) => (
                            <div
                                className="w-full h-[200px] overflow-hidden flex items-center justify-center bg-gray-200">
                                <img
                                    src={image}
                                    alt="Hotel Image"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}
                    />
                ) : (
                    <div className="bg-gray-400 rounded-md w-32 h-32 flex justify-center items-center">
                        <span className="text-xl">Hotel Image</span>
                    </div>
                )}
            </div>

            {/* Contenido del hotel */}
            <div className="p-4 flex flex-col space-y-2">
                {/* Nombre del hotel y precio */}
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800 text-lg">{hotel.name}</p>
                    <span className="text-gray-700 font-semibold">Desde S/. 23/hr</span>
                </div>

                {/* Ubicación */}
                <p className="text-gray-600 flex items-center gap-1 text-sm">
                    <CustomIcon icon="weui:location-filled" className="text-gray-500 text-lg"/>
                    {[hotel.location?.district, hotel.location?.city].join(", ")}
                </p>
            </div>

            {/* Botón de Reserva */}
            <Button
                label="Más detalles"
                className="w-full"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
            />
        </div>

    );
};

export default HotelCard;
