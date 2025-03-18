import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {Galleria} from "primereact/galleria";
import CustomIcon from "./shared/Icon.tsx";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

interface HotelCardProps {
    hotel: HotelResponse;
}

const BASE_URL = "http://localhost:5125";

const getFullImageUrl = (path: string) => {
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
};

const HotelCard = ({ hotel }: HotelCardProps) => {
    const navigate = useNavigate();
    return (
        <div className="border shadow-lg  flex flex-col">
            <div>
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

            <div className="p-2 pt-0 flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-gray-800 text-lg m-2">{hotel.name}</p>
                    <span className="text-gray-700 font-semibold">S/. 23/hora</span>
                </div>
                <p className="text-gray-600 flex items-center gap-1 text-sm m-0">
                    <CustomIcon icon="weui:location-filled" className="text-gray-500 text-lg"/>
                    {[hotel.location?.district, hotel.location?.city].join(", ")}
                </p>
            </div>

            <Button
                label="Más detalles"
                className="w-full bg-gray-200 border-0 text-black"
                onClick={() => navigate(`/hotel/${hotel.id}`)}
            />
        </div>
    );
};

export default HotelCard;
