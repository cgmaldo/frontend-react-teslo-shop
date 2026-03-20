import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interfaces/auth.response";

interface Props {
    fullname: string;
    email: string;
    password: string;
}

export const registerAction = async ({ fullname, email, password }: Props): Promise<AuthResponse> => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            fullName: fullname,
            email,
            password,
        }
        )
        return data;
    } catch (error) {
        throw error;
    }
}