import type { Role } from "../rbac/types";

export interface User {
    id: number;
    full_name: string;
    email: string;
    role: Role;
}

export interface CreateUserPayload {
    full_name: string;
    email: string;
    password: string;
    role_id: number;
}

export interface UpdateUserPayload {
    full_name: string;
    email: string;
    role_id: number;
}

export interface ListUsersResponse {
    employees: User[]
    page: number
    page_size: number
    has_next: boolean
}