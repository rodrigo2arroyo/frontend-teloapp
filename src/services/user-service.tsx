import { UserApi, CreateUser } from "@rodrigo2arroyo/frontend-sdk";
import { apiConfig } from "../config/api-config"; // Import API configuration

const userApi = new UserApi(apiConfig);

const userService = {
    // ✅ Register User
    async registerUser(user: CreateUser): Promise<UserResponse> {
        try {
            const response = await userApi.register(user);
            return response.data;
        } catch (error: any) {
            handleApiError(error);
            throw error;
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

export default userService;
