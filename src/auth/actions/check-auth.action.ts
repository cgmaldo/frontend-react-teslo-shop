import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async () => {
    const token = localStorage.getItem('token') || '';
    if (!token) throw new Error('Not found token');

    try {
        // No queremos en cada acción que hagamos tener que añadir la sección de header Authorization. 
        // const { data } = await tesloApi.get<AuthResponse>('/auth/check-status', {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })

        // Para evitarlo lo centralizamos en un interceptor de la api src\api\tesloApi.ts
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        localStorage.removeItem('token');
        throw new Error('Token expired or not valid');
    }
}