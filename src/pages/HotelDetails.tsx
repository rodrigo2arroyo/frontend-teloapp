import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hotelService from "../services/hotel-service.ts";
import {HotelResponse} from "@rodrigo2arroyo/frontend-sdk";
import {TabPanel, TabView} from "primereact/tabview";
import {Galleria} from "primereact/galleria";
import {Divider} from "primereact/divider";
import CustomIcon from "../components/shared/Icon.tsx";
import {Rating} from "primereact/rating";
import {Carousel} from "primereact/carousel";
import MapComponent from "../components/shared/MapComponent.tsx";
import {Card} from "primereact/card";
import {Button} from "primereact/button";

const HotelDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [hotel, setHotel] = useState<HotelResponse | null>(null);
    const BASE_URL = "http://localhost:5125";

    const getFullImageUrl = (path: string) => {
        return path.startsWith("http") ? path : `${BASE_URL}${path}`;
    };

    const thumbnailTemplate = (item : any) => {
        return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    }

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
        { breakpoint: '768px', numVisible: 2, numScroll: 2 },
        { breakpoint: '560px', numVisible: 1, numScroll: 1 }
    ];

    const reviewTemplate = (review: any) => {
        return (
            <div className="w-full min-h-56 p-6 border rounded-lg shadow-lg bg-white flex flex-col justify-start">
                <div className="flex items-center space-x-4 min-h-12">
                    <CustomIcon icon="mdi:user" className="text-3xl text-gray-600"/>
                    <h3 className="text-lg font-semibold text-gray-800">{review.author}</h3>
                </div>
                <Rating value={review.rating} readOnly cancel={false} className="text-yellow-500" />
                <p className="text-gray-600 italic line-clamp-3 overflow-hidden text-ellipsis mt-auto">
                    "{review.description}"
                </p>
            </div>
        );
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

    // const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hotel!.location!.latitude},${hotel!.location!.longitude}`;

    if (!hotel) return <p className="text-center mt-10">Cargando detalles del hotel...</p>;

    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="border-2 border-solid mb-0 flex flex-col">
                <div className="mb-0">
                    {hotel.images && hotel.images.length > 0 ? (
                        <Galleria
                            value={hotel.images.map(getFullImageUrl)}
                            numVisible={5}
                            thumbnail={thumbnailTemplate}
                            circular
                            showThumbnails={false}
                            showItemNavigators
                            item={(image) => (
                                <div
                                    className="w-full h-[500px] overflow-hidden flex items-center justify-center bg-gray-200">
                                    <img
                                        src={image}
                                        alt="Hotel Image"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            )}
                        />
                    ) : (
                        <span className="text-gray-500">Imagen del Hotel</span>
                    )}
                </div>
                <div className="pl-5">
                    <h1>{hotel.name}</h1>
                    <p><i className="lucide:map-pin"></i> {hotel.location?.city}</p>
                </div>
            </div>
            <Divider/>
            <div className="grid grid-cols-[60%_40%] gap-4">
                <div className="p-4">
                    <h2 className="text-2xl font-semibold">Detalles del hotel</h2>
                    <p>Descripción</p>
                </div>
                <Card className="border-2 shadow-xl p-4" title="Contacto">
                    <p className="flex items-center gap-2 m-0">
                        <CustomIcon icon="material-symbols:person" className="text-gray-600 text-xl"/>
                        {hotel.contacts![0].firstName + " " + hotel.contacts![0].lastName}
                    </p>
                    <p className="flex items-center gap-2">
                        <CustomIcon icon="mdi:phone" className="text-gray-600 text-xl"/>
                        {hotel.contacts![0].phone}
                    </p>
                    <p className="flex items-center gap-2">
                        <CustomIcon icon="mdi:email" className="text-gray-600 text-xl"/>
                        {hotel.contacts![0].email}
                    </p>
                </Card>
            </div>
            <Divider/>
            <div>
                <TabView>
                    <TabPanel header="Tarifas">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {hotel.rates!.map((rate, index) => (
                                <div
                                    key={index}
                                    className="p-6 border rounded-lg shadow-lg text-center"
                                >
                                    <h2 className="text-xl font-semibold">{rate.description}</h2>
                                    <p className="text-2xl font-bold mt-2">S/. {rate.price} <span
                                        className="text-base font-normal">/ {rate.duration} horas</span></p>
                                    <div className="grid grid-cols-2">
                                        {rate.services!.map((service, idx) => (
                                            service.name ? (
                                                <div key={idx}
                                                     className="flex text-left space-x-2 text-gray-700">
                                                    <CustomIcon icon="material-symbols:check-rounded"/>
                                                    <span>{service.name}</span>
                                                </div>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel header="Promociones">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {hotel.promotions!.map((promotion, index) => (
                                <div
                                    key={index}
                                    className="p-6 border rounded-lg shadow-lg text-center"
                                >
                                    <h2 className="text-xl font-semibold">{promotion.description}</h2>
                                    <p className="text-2xl font-bold mt-2">S/. {promotion.promotionalPrice} <span
                                        className="text-base font-normal">/ {promotion.duration} horas</span></p>
                                    <div className="grid grid-cols-2">
                                        {promotion.services!.map((service, idx) => (
                                            service.name ? (
                                                <div key={idx}
                                                     className="flex text-left space-x-2 text-gray-700">
                                                    <CustomIcon icon="material-symbols:check-rounded"/>
                                                    <span>{service.name}</span>
                                                </div>
                                            ) : null
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            <Divider/>
            <div>
                <h2>Ubicacion</h2>
                <MapComponent lat={hotel.location!.latitude!} lng={hotel.location!.longitude!}/>
                <Button
                    label="Cómo llegar"
                    icon="pi pi-map"
                    className="p-button-primary mt-4"
                    onClick={() => window.open(googleMapsUrl, "_blank")}
                />
            </div>
            <Divider/>
            <div>
                <h2 className="text-2xl font-semibold mb-4">Opiniones</h2>
                <Carousel
                    value={hotel.reviews!}
                    numVisible={3}
                    numScroll={3}
                    responsiveOptions={responsiveOptions}
                    circular
                    itemTemplate={reviewTemplate}
                    className="px-4"
                />
            </div>
        </div>
    );
};

export default HotelDetails;
