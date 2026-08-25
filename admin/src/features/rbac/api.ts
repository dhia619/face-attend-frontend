import { apiClient } from "../../api/client";
import type { Role, CreateRolePayload, UpdateRolePayload } from "./types";

export const rolesApi = {
    list: async () => (await apiClient.get<Role[]>("/rbac/roles")).data,
    getOne: async (id: number) => (await apiClient.get<Role>(`/rbac/roles/${id}`)).data,
    create: async (payload: CreateRolePayload) =>
        (await apiClient.post<Role>("/rbac/roles", payload)).data,
    update: async (id: number, payload: UpdateRolePayload) =>
        (await apiClient.patch<Role>(`/rbac/roles/${id}`, payload)).data,
    delete: async (id: number) => {
        await apiClient.delete(`/rbac/roles/${id}`);
    },
};