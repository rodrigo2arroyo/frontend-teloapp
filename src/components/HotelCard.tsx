import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {Galleria} from "primereact/galleria";

interface HotelCardProps {
    hotel: HotelResponse;
}

const BASE_URL = "http://localhost:5125"; // Asegúrate de que esta URL sea correcta

const getFullImageUrl = (path: string) => {
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
    return (
        <div className="border shadow-lg rounded-md flex flex-col w-64 bg-red-100">
            <div className="p-0">
                {hotel.images && hotel.images.length > 0 ? (
                    <Galleria
                        value={hotel.images.map(getFullImageUrl)}
                        style={{ maxWidth: '640px' }} showThumbnails={false} showIndicators
                        item={(image) => (
                            <img
                                src={image}
                                alt="Hotel Image"
                                className="w-full h-72 object-cover rounded-lg border-2 border-gray-300"
                            />
                        )}
                    />
                ) : (
                    <div className="bg-gray-400 rounded-md w-32 h-32 flex justify-center items-center">
                        <span className="text-4xl">🖼️</span>
                    </div>
                )}
            </div>


            <div className="border-t border-gray-300"></div>
            <div className="p-5">
                <p className="mt-4 text-gray-600 text-sm">
                    {[hotel.location?.district, hotel.location?.city].join(", ")}
                </p>
                <p className="font-bold text-gray-800">{hotel.name ?? "Nombre no disponible"}</p>
            </div>
        </div>
    );
};

export default HotelCard;
