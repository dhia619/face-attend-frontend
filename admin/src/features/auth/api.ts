import { apiClient } from '../../api/client';
import type { LoginPayload, LoginResponse, User } from './types';

export const authApi = {
    login: (payload: LoginPayload) =>
        apiClient.post<LoginResponse>('/auth/login', payload),

    logout: () =>
        apiClient.post('/auth/logout'),

    getMe: () =>
        apiClient.get<User>('/auth/me'),

    refreshToken: () =>
        apiClient.post<LoginResponse>('/auth/refresh'),
};