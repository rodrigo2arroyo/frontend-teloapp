import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hotelService from "../services/hotel-service.ts";
import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";
import {Galleria} from "primereact/galleria";
import {Icon} from "@iconify/react";
import {Tooltip} from "primereact/tooltip";
import {serviceIcons} from "../constants/serviceIcons.ts";

const HotelDetails = () => {
    const { id } = useParams<{ id: string }>(); // Obtiene el ID de la URL
    const [hotel, setHotel] = useState<HotelResponse | null>(null);
    const BASE_URL = "http://localhost:5125";

    const getFullImageUrl = (path: string) => {
        return path.startsWith("http") ? path : `${BASE_URL}${path}`;
    };

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
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex gap-6">
                <div className="w-2/5 ">
                    <Card title={hotel.name} className="shadow-lg bg-gray-200 flex h-56">
                        <p className="text-gray-600">{hotel.location?.city ?? "Ubicación desconocida"}</p>
                        <p className="text-gray-700">
                            {hotel.location?.district ?? ""}, {hotel.location?.street ?? ""}
                        </p>
                    </Card>
                </div>

                <div className="w-3/5 bg-gray-200 h-60 flex items-center justify-center">
                    {hotel.images && hotel.images.length > 0 ? (
                        <Galleria
                            value={hotel.images.map(getFullImageUrl)}
                            style={{maxWidth: '640px'}}
                            showThumbnails={false} // Oculta miniaturas
                            showIndicators={true}  // Activa los círculos para pasar de imagen
                            autoPlay={false} // Opcional: activa el pase automático
                            circular={true}  // Hace que el carrusel sea infinito
                            item={(image) => (
                                <img
                                    src={image}
                                    alt="Hotel Image"
                                    className="w-full h-60 object-cover"
                                />
                            )}
                        />
                    ) : (
                        <span className="text-gray-500">Imagen del Hotel</span>
                    )}
                </div>


            </div>

            {/* Tabs (Rates & Promotions) con PrimeReact */}

            {/*<table className="min-w-full border-collapse border border-gray-300">*/}
            {/*    <thead>*/}
            {/*    <tr className="bg-gray-100">*/}
            {/*        <th className="border p-2">Servicio</th>*/}
            {/*        <th className="border p-2">Paquete Básico</th>*/}
            {/*        <th className="border p-2">Paquete Premium</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    <tr>*/}
            {/*        <td className="border p-2">WiFi</td>*/}
            {/*        <td className="border p-2"><Icon icon="mdi:check-circle" className="text-green-500 text-xl"/></td>*/}
            {/*        <td className="border p-2"><Icon icon="mdi:check-circle" className="text-green-500 text-xl"/></td>*/}
            {/*    </tr>*/}
            {/*    <tr>*/}
            {/*        <td className="border p-2">Piscina</td>*/}
            {/*        <td className="border p-2"><Icon icon="mdi:close-circle" className="text-red-500 text-xl"/></td>*/}
            {/*        <td className="border p-2"><Icon icon="mdi:check-circle" className="text-green-500 text-xl"/></td>*/}
            {/*    </tr>*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            <div className="mt-6">
                <TabView>
                    <TabPanel header="Tarifas">
                        <div className="grid grid-cols-2 gap-4">
                            {hotel.rates!.map((rate) => (
                                <div
                                    key={rate.id}
                                    className="border rounded-lg p-6 shadow-lg flex flex-col items-center text-center bg-white"
                                >
                                    <h2 className="text-xl font-semibold">{rate.description}</h2>
                                    <p className="text-gray-600 mt-1">
                                        {rate.duration}  {rate.rateType === 'Hour' ? 'Horas' : 'Noches'} por <span
                                        className="font-bold">S/. {rate.price}</span>
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        {rate.services!.map((service) => {
                                            if (!service.name) return null; // Evita errores si `service.name` no existe

                                            const tooltipId = `tooltip-${rate.id}-${service.name}`;
                                            const iconClass = serviceIcons[service.name]?.icon || "pi pi-question-circle"; // Siempre asigna un ícono

                                            return (
                                                <div key={service.name} className="relative">
                                                    <span id={tooltipId} className="inline-block">
                                                        <Icon
                                                            icon={iconClass}
                                                            className="text-3xl text-blue-500 cursor-pointer"
                                                        />
                                                    </span>
                                                    <Tooltip target={`#${tooltipId}`} position="top">
                                                        {serviceIcons[service.name]?.label || "Servicio Desconocido"}
                                                    </Tooltip>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>

                    <TabPanel header="Promociones">
                        <div className="grid grid-cols-2 gap-4">
                            {hotel.promotions!.map((promotion) => (
                                <div
                                    key={promotion.id}
                                    className="border rounded-lg p-6 shadow-lg flex flex-col items-center text-center bg-white"
                                >
                                    <h2 className="text-xl font-semibold">{promotion.description}</h2>
                                    <p className="text-gray-600 mt-1">
                                        {promotion.duration} {promotion.rateType === 'Hour' ? 'Horas' : 'Noches'} por <span
                                        className="font-bold">S/. {promotion.promotionalPrice}</span>
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        {promotion.services!.map((service) => {
                                            if (!service.name) return null; // Evita errores si `service.name` no existe

                                            const tooltipId = `tooltip-${promotion.id}-${service.name}`;
                                            const iconClass = serviceIcons[service.name]?.icon || "pi pi-question-circle"; // Siempre asigna un ícono

                                            return (
                                                <div key={service.name} className="relative">
                                                    <span id={tooltipId} className="inline-block">
                                                        <Icon
                                                            icon={iconClass}
                                                            className="text-3xl text-blue-500 cursor-pointer"
                                                        />
                                                    </span>
                                                    <Tooltip target={`#${tooltipId}`} position="top">
                                                        {serviceIcons[service.name]?.label || "Servicio Desconocido"}
                                                    </Tooltip>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default HotelDetails;
