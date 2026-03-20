import { create } from 'zustand';
import type { User } from '@/interfaces/user.interface';
import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/resgister.action';

type AuthState = {
    //Properties
    user: User | null,
    token: string | null,
    authStatus: AuthStatus,

    // Getters
    isAdmin: () => boolean,

    //Methods
    login(email: string, password: string): Promise<boolean>,
    logout: () => void,
    register(email: string, password: string, fullname: string): Promise<boolean>,
    checkAuthStatus: () => Promise<boolean>,
};

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({ user, token, authStatus: 'authenticated' });
            return true;
        } catch (error) {
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },

    isAdmin: () => {
        const roles = get().user?.roles || [];
        return roles.includes('admin');
    },

    register: async (email: string, password: string, fullname: string) => {
        try {
            const data = await registerAction({ fullname, email, password });
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            return false;
        }
    },

}));