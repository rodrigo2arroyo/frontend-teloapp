import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from "../components/Header.tsx";
import HotelDetails from "../pages/HotelDetails.tsx";
import Footer from "../components/Footer.tsx";
import {HotelProvider} from "../context/HotelContext.tsx";

export default function AppRoutes() {
    return (
        <HotelProvider>
            <Router>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/hotel/:id" element={<HotelDetails />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </HotelProvider>
    );
}
