export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role_id: BigInteger;
}