import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from "../components/Header.tsx";
import HotelDetails from "../pages/HotelDetails.tsx";
import Footer from "../components/Footer.tsx";
import {HotelProvider} from "../context/HotelContext.tsx";
import Profile from "../pages/Profile.tsx";

function AppContent() {

    const MainLayout = (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/hotel/:id" element={<HotelDetails />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </main>
             <Footer />
        </div>
    );

    return <HotelProvider>{MainLayout}</HotelProvider>;
}

export default function AppRoutes() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
