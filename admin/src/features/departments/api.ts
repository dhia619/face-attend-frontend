import { apiClient } from "../../api/client";
import type { Department, CreateDepartmentPayload, UpdateDepartmentPayload } from "./types";

export const departmentsApi = {
    list: async () => (await apiClient.get<Department[]>("/departments")).data,
    getOne: async (id: number) => (await apiClient.get<Department>(`/departments/${id}`)).data,
    create: async (payload: CreateDepartmentPayload) =>
        (await apiClient.post<Department>("/departments", payload)).data,
    update: async (id: number, payload: UpdateDepartmentPayload) =>
        (await apiClient.put<Department>(`/departments/${id}`, payload)).data,
    delete: async (id: number) => {
        await apiClient.delete(`/departments/${id}`);
    },
};