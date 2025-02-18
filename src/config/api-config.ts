import { Configuration } from '@rodrigo2arroyo/frontend-sdk';

// URL Base del backend (Puedes moverla a variables de entorno .env)
const API_BASE_URL = 'http://localhost:5125';

export const apiConfig = new Configuration({
    basePath: API_BASE_URL,
});
