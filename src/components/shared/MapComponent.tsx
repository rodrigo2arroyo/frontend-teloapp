import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import React from "react";

type MapComponentProps = {
    lat: number;
    lng: number;
};

const MapComponent: React.FC<MapComponentProps> = ({ lat, lng }) => {
    const center = {lat: lat, lng: lng};
    const zoomLevel = 16;

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}>
            <div style={{height: '500px', width: '100%'}}>
                <Map
                    center={center}
                    zoom={zoomLevel}
                    style={{height: '100%', width: '100%'}}
                    mapId="custom-map"
                    mapTypeControl={false}
                    streetViewControl={false}
                    fullscreenControl={false}
                    zoomControl={false}
                >
                    <Marker position={center} />
                </Map>
            </div>
        </APIProvider>
    );
}

export default MapComponent;
