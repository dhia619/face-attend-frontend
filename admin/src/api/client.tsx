import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let accessToken: string | null = localStorage.getItem("accessToken");

export function setAccessToken(token: string | null) {
    accessToken = token;
}

apiClient.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

interface RetryConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

type QueueItem = {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
};

let isRefreshing = false;
let refreshQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
    refreshQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else if (token) {
            resolve(token);
        }
    });

    refreshQueue = [];
}

function clearTokens() {
    setAccessToken(null);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

apiClient.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryConfig | undefined;

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (
            error.response?.status !== 401 ||
            originalRequest._retry
        ) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                refreshQueue.push({
                    resolve: (token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;

                        resolve(apiClient(originalRequest));
                    },

                    reject,
                });
            });
        }

        isRefreshing = true;

        try {
            const refreshToken =
                localStorage.getItem("refreshToken");

            if (!refreshToken) {
                throw new Error("No refresh token available");
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/refresh`,
                {
                    refresh_token: refreshToken,
                },
            );

            const newAccessToken = response.data.access_token;
            const newRefreshToken = response.data.refresh_token;
            if (!newAccessToken || !newRefreshToken) {
                throw new Error(
                    "Refresh response did not contain tokens",
                );
            }

            setAccessToken(newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            processQueue(null, newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return apiClient(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError);

            if (axios.isAxiosError(refreshError)) {
                const status = refreshError.response?.status;

                if (status === 401) {
                    clearTokens();

                    if (
                        window.location.pathname !== "/login"
                    ) {
                        window.location.replace("/login");
                    }
                }
            }

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);