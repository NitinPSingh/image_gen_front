import { AxiosResponse } from 'axios';
import api from './interceptor';

interface Auth {
    username: string;
    password: string;
    email: string;
}

export const login = async (username: string, password: string): Promise<AxiosResponse> => {
    const response = await api.post('auth/token/', { username, password });
    if (response.data.access) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = async (): Promise<void> => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    await api.post('auth/logout/', { refresh_token: user.refresh });
    localStorage.removeItem('user');
};

export const register = async (username: string, password: string, email: string ): Promise<AxiosResponse> => {
    return await api.post('auth/register/', { username, password, email });
};

export const refreshToken = async (): Promise<AxiosResponse> => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await api.post('auth/token/refresh/', { refresh: user.refresh });
    if (response.data.access) {
        user.access = response.data.access;
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};
