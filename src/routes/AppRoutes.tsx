import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from "../components/Header.tsx";
import HotelDetails from "../pages/HotelDetails.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import {HotelResponse, HotelsResult} from "@rodrigo2arroyo/frontend-sdk";
import hotelService from "../services/hotel-service.ts";

export default function AppRoutes() {
    const [hotels, setHotels] = useState<HotelResponse[]>([]);
    const [filters, setFilters] = useState({ name: "", district: "" });

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
        <Router>
            <div className="flex flex-col min-h-screen">
                {/* Pasamos setFilters al Header para manejar la búsqueda */}
                <Header setFilters={setFilters} />
                <main className="flex-grow">
                    <Routes>
                        <Route
                            path="/"
                            element={<Home hotels={hotels} filters={filters} />}
                        />
                        <Route path="/hotel/:id" element={<HotelDetails />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
