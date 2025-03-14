import HotelCard from "../components/HotelCard.tsx";
import {useEffect, useState} from "react";
import {HotelResponse, HotelsResult} from "@rodrigo2arroyo/frontend-sdk";
import hotelService from "../services/hotel-service.ts";
import {useSearchParams} from "react-router-dom";

const Home = () => {
    const [hotels, setHotels] = useState<HotelResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams(); // Leer los filtros de la URL

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const name = searchParams.get("name") || "";
                const district = searchParams.get("district") || "";

                const data: HotelsResult = await hotelService.listHotels(name, district);
                setHotels(data.hotels ?? []);
            } catch (error) {
                console.error("Error al obtener los hoteles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [searchParams]);

    return (
        <div className="grid grid-cols-3 gap-4 m-4">
            {loading ? (
                <p className="text-center col-span-3 text-gray-600">Loading hotels...</p>
            ) : hotels.length > 0 ? (
                hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
            ) : (
                <p className="text-center col-span-3 text-gray-600">No hotels found.</p>
            )}
        </div>
    );
};

export default Home;
