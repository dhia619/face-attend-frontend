import { CONFIG } from './config.js';

class ApiClient {
    constructor() {
        this.baseUrl = CONFIG.API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const token = localStorage.getItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN);

        const headers = { ...options.headers };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (!(options.body instanceof FormData) && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json';
        }

        if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
            options.body = JSON.stringify(options.body);
        }

        try {
            let response = await fetch(url, { ...options, headers });

            if (response.status === 401 && !options._retry) {
                options._retry = true;
                const refreshed = await this.refreshToken();
                
                if (refreshed) {
                    const newToken = localStorage.getItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
                    headers['Authorization'] = `Bearer ${newToken}`;
                    response = await fetch(url, { ...options, headers });
                } else {
                    this.logoutAndRedirect();
                    throw new Error('Session expired. Please reactivate device.');
                }
            }

            const data = await response.json().catch(() => null);

            if (!response.ok) {
                throw new Error((data && data.detail) || `Request failed with status ${response.status}`);
            }

            return data;

        } catch (error) {
            throw error;
        }
    }

    async refreshToken() {
        const refreshToken = localStorage.getItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) return false;

        try {
            const res = await fetch(`${this.baseUrl}/devices/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh_token: refreshToken })
            });

            if (!res.ok) return false;

            const data = await res.json();
            localStorage.setItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
            if (data.refresh_token) {
                localStorage.setItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN, data.refresh_token);
            }
            return true;
        } catch {
            return false;
        }
    }

    logoutAndRedirect() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.REFRESH_TOKEN);
        window.location.href = 'activation.html';
    }

    get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    post(endpoint, body) {
        return this.request(endpoint, { method: 'POST', body });
    }

    postForm(endpoint, formData) {
        return this.request(endpoint, { method: 'POST', body: formData });
    }
}

export const api = new ApiClient();