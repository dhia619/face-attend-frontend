import { apiClient } from '../../api/client';
import type { LoginPayload, LoginResponse } from './types';
import type { User } from "../users/types";

export const authApi = {
    login: (payload: LoginPayload) =>
        apiClient.post<LoginResponse>('/auth/login', payload),

    logout: () =>
        apiClient.post('/auth/logout'),

    getMe: () =>
        apiClient.get<User>('/auth/me'),
};