import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {Carousel} from "primereact/carousel";
import { Image } from "primereact/image";

interface HotelCardProps {
    hotel: HotelResponse;
}

const BASE_URL = "http://localhost:5125"; // Asegúrate de que esta URL sea correcta

const getFullImageUrl = (path: string) => {
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
    const imageTemplate = (image: string) => (
        <div className="w-full h-40 flex justify-center items-center">
            <Image
                src={getFullImageUrl(image)}
                alt="Hotel Image"
                className="w-full h-full object-cover rounded-md"
            />
        </div>
    );

    return (
        <div className="bg-gray-200 rounded-md shadow-md p-4 flex flex-col w-64">
            {/* Carrusel de Imágenes */}
            {hotel.images && hotel.images.length > 0 ? (
                <Carousel
                    value={hotel.images.map(getFullImageUrl)} // Transformamos las URLs aquí
                    numVisible={1}
                    numScroll={1}
                    showIndicators
                    itemTemplate={imageTemplate} // Aseguramos que se rendericen correctamente
                />
            ) : (
                <div className="bg-gray-400 rounded-md w-32 h-32 flex justify-center items-center">
                    <span className="text-4xl">🖼️</span>
                </div>
            )}

            {/* Ubicación */}
            <p className="mt-4 text-gray-600 text-sm">
                {[hotel.location?.district, hotel.location?.city].join(", ")}
            </p>

            {/* Nombre del Hotel */}
            <p className="font-bold text-gray-800">{hotel.name ?? "Nombre no disponible"}</p>
        </div>
    );
};

export default HotelCard;
