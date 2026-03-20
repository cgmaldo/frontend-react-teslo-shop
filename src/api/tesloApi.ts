import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const tesloApi = axios.create({
    baseURL: `${BASE_URL}`,
    params: {}
});

// Añadimos token usando los interceptores en peticiones sobre la api 
tesloApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export { tesloApi }