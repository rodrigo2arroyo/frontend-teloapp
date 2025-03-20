import {createContext, useContext, useEffect, useState} from "react";
import hotelService from "../services/hotel-service.ts";
import {HotelResponse, HotelsResult} from "@rodrigo2arroyo/frontend-sdk"; // Asegúrate de importar tu servicio

interface HotelContextType {
    hotels: HotelResponse[];
    loading: boolean;
    filters: { name: string; district: string[]; location?: { lat: number; lng: number } };
    searchHotels: (filters: { name: string; district: string[]; location?: { lat: number; lng: number } }) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider = ({ children }: { children: React.ReactNode }) => {
    const [hotels, setHotels] = useState<HotelResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<{ name: string; district: string[]; location?: { lat: number; lng: number } }>({
        name: "",
        district: [],
    });

    const searchHotels = async (newFilters: { name: string; district: string[]; location?: { lat: number; lng: number } }) => {
        setLoading(true);
        setFilters(newFilters);

        try {
            const { name, district, location } = newFilters;
            const data: HotelsResult = await hotelService.listHotels(name, district.join(","), location?.lat, location?.lng);
            setHotels(data.hotels ?? []);
        } catch (error) {
            console.error("Error al obtener los hoteles:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedLocation = sessionStorage.getItem("userLocation");
        let initialLocation: { lat: number; lng: number } | undefined;

        if (storedLocation) {
            initialLocation = JSON.parse(storedLocation);
        }

        searchHotels({
            name: "",
            district: [],
            location: initialLocation
        });
    }, []);

    return (
        <HotelContext.Provider value={{ hotels, loading, filters, searchHotels }}>
            {children}
        </HotelContext.Provider>
    );
};

export const useHotelContext = () => {
    const context = useContext(HotelContext);
    if (!context) {
        throw new Error("useHotelContext debe usarse dentro de un HotelProvider");
    }
    return context;
};
