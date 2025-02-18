import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hotelService from "../services/hotel-service.ts";
import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";

const HotelDetails = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
    const [hotel, setHotel] = useState<HotelResponse | null>(null);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const data = await hotelService.getHotel(Number(id));
                setHotel(data);
            } catch (error) {
                console.error("Error al obtener el hotel:", error);
            }
        };

        fetchHotel();
    }, [id]);

    if (!hotel) return <p className="text-center mt-10">Cargando detalles del hotel...</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Contenedor principal con dos columnas */}
            <div className="flex gap-6">
                {/* Información del hotel (30%) */}
                <div className="w-1/3">
                    <Card title={hotel.name} className="shadow-lg">
                        <p className="text-gray-600">{hotel.location?.city ?? "Ubicación desconocida"}</p>
                        <p className="text-gray-700">
                            {hotel.location?.district ?? ""}, {hotel.location?.street ?? ""}
                        </p>
                    </Card>
                </div>

                {/* Espacio para imágenes (70%) */}
                <div className="w-2/3 bg-gray-200 h-60 flex items-center justify-center">
                    <span className="text-gray-500">Imagen del Hotel</span>
                </div>
            </div>

            {/* Tabs (Rates & Promotions) con PrimeReact */}

            <div className="mt-6">
                <TabView>
                    <TabPanel header="Tarifas">
                        {hotel.rates!.length > 0 ? (
                            <ul>
                                {hotel.rates!.map((rate) => (
                                    <li key={rate.id} className="p-2 border-b">
                                        <p className="font-bold">{rate.description}</p>
                                        <p className="text-sm text-gray-600">Tipo: {rate.rateType} - Precio: ${rate.price}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay tarifas disponibles.</p>
                        )}
                    </TabPanel>

                    <TabPanel header="Promociones">
                        {hotel.promotions!.length > 0 ? (
                            <ul>
                                {hotel.promotions!.map((promo) => (
                                    <li key={promo.id} className="p-2 border-b">
                                        <p className="font-bold">{promo.description}</p>
                                        <p className="text-sm text-gray-600">Precio promocional: ${promo.promotionalPrice}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay promociones disponibles.</p>
                        )}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default HotelDetails;
