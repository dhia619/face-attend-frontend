import { apiClient } from "../../api/client";
import type { Role, CreateRolePayload, UpdateRolePayload, Permission } from "./types";

export const rolesApi = {
    list: async () => (await apiClient.get<Role[]>("/rbac/roles")).data,
    getOne: async (id: number) => (await apiClient.get<Role>(`/rbac/roles/${id}`)).data,
    create: async (payload: CreateRolePayload) =>
        (await apiClient.post<Role>("/rbac/roles", payload)).data,
    update: async (id: number, payload: UpdateRolePayload) =>
        (await apiClient.put<Role>(`/rbac/roles/${id}`, payload)).data,
    delete: async (id: number) => {
        await apiClient.delete(`/rbac/roles/${id}`);
    },
    getPermissions: async (id: number) => (await apiClient.get<Permission[]>(`/rbac/roles/${id}/permissions`)).data,
};

export const permissionsApi = {
    list: async () => (await apiClient.get<Permission[]>("/rbac/permissions")).data,
};