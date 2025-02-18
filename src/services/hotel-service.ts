import {HotelApi, CreateHotel, HotelsResult, HotelResponse} from '@rodrigo2arroyo/frontend-sdk';
import { apiConfig } from '../config/api-config'; // Importar la configuración

const hotelApi = new HotelApi(apiConfig);

const hotelService = {
    createHotel: async (hotel: CreateHotel) => {
        try {
            const response = await hotelApi.createHotel(hotel);
            return response.data;
        } catch (error: any) {
            handleApiError(error);
            throw error;
        }
    },

    async listHotels(): Promise<HotelsResult> {
        try {
            const response = await hotelApi.listHotels();
            return response.data;
        } catch (error: any) {
            handleApiError(error);
            throw error;
        }
    },

    async getHotel(hotelId: number): Promise<HotelResponse | null> {
        try {
            const response = await hotelApi.getHotelById(hotelId);
            return response.data!;
        } catch (error: any) {
            handleApiError(error);
            return null;
        }
    },
};

const handleApiError = (error: any) => {
    if (error.response) {
        console.error('Error en la API:', error.response.data);
    } else if (error.request) {
        console.error('Error en la solicitud:', error.request);
    } else {
        console.error('Error desconocido:', error.message);
    }
};

export default hotelService;
