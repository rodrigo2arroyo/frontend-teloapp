import { useEffect, useRef, useState } from "react";

type MapComponentProps = {
    lat: number;
    lng: number;
};

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [apiLoaded, setApiLoaded] = useState(false);

    useEffect(() => {
        const GOOGLE_MAPS_API_KEY = "AIzaSyA2chYWKgVTrdHe4sdLdEpNILAYDC5wUuI";
        const GOOGLE_MAPS_SCRIPT_ID = "google-maps-script";

        const loadGoogleMaps = (): Promise<void> => {
            return new Promise((resolve) => {
                if (window.google && window.google.maps) {
                    resolve();
                    return;
                }

                if (!document.getElementById(GOOGLE_MAPS_SCRIPT_ID)) {
                    const script = document.createElement("script");
                    script.id = GOOGLE_MAPS_SCRIPT_ID;
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async`;
                    script.async = true;
                    script.defer = true;
                    script.onload = () => {
                        setApiLoaded(true);
                        resolve();
                    };
                    document.body.appendChild(script);
                } else {
                    // Si el script ya está en el documento, esperamos hasta que Google Maps esté disponible
                    const checkInterval = setInterval(() => {
                        if (window.google && window.google.maps) {
                            clearInterval(checkInterval);
                            setApiLoaded(true);
                            resolve();
                        }
                    }, 100);
                }
            });
        };

        loadGoogleMaps().then(() => {
            if (mapRef.current) {
                const map = new google.maps.Map(mapRef.current, {
                    center: { lat, lng },
                    zoom: 15,
                });

                new google.maps.Marker({
                    position: { lat, lng },
                    map,
                });
            }
        });
    }, [lat, lng]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapComponent;
