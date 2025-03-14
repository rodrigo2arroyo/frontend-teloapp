import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

const containerStyle = {
    width: "100%",
    height: "400px",
};

// 🔹 Definir las librerías fuera del componente para evitar recargas innecesarias
const libraries: ("marker")[] = ["marker"];

type MapComponentProps = {
    lat: number;
    lng: number;
};

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
    const apiKey = "AIzaSyA2chYWKgVTrdHe4sdLdEpNILAYDC5wUuI";
    const center = { lat, lng };

    // Cargar la API con las librerías sin recrearlas en cada render
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries, // 🔹 Ahora es una constante fuera del componente
    });

    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

    useEffect(() => {
        if (isLoaded && mapRef.current) {
            const { AdvancedMarkerElement } = google.maps.marker;

            if (!markerRef.current) {
                // 🔹 Crear el marcador y asociarlo al mapa
                markerRef.current = new AdvancedMarkerElement({
                    position: center,
                    map: mapRef.current, // 🔥 Se pasa el mapa directamente en la configuración
                });
            }
        }
    }, [isLoaded]);

    if (loadError) return <p>Error al cargar Google Maps</p>;
    if (!isLoaded) return <p>Cargando mapa...</p>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={(map) => {
                mapRef.current = map;
            }}
        />
    );
};

export default MapComponent;
