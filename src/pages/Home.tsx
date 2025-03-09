import hotelService from "../services/hotel-service.ts";
import {useEffect, useState} from "react";
import {HotelsResult, HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import HotelCard from "../components/HotelCard.tsx";

const Home = () => {
    const [hotels, setHotels] = useState<HotelResponse[]>([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const data: HotelsResult = await hotelService.listHotels();
                setHotels(data.hotels ?? []);
            } catch (error) {
                console.error("Error al obtener los hoteles:", error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 m-4">
            {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
};

export default Home;
