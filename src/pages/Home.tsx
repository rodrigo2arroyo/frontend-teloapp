import HotelCard from "../components/HotelCard.tsx";
import {useHotelContext} from "../context/HotelContext.tsx";

const Home = () => {
    const { hotels, loading } = useHotelContext();

    return (
        <div className="grid grid-cols-5 gap-4 m-4">
            {loading ? (
                <p className="text-center col-span-5 text-gray-600">Cargando hoteles...</p>
            ) : hotels.length > 0 ? (
                hotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
            ) : (
                <p className="text-center col-span-5 text-gray-600">No se encontraron hoteles.</p>
            )}
        </div>
    );
};

export default Home;
