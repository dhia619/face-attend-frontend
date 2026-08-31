import { apiClient } from "../../api/client";
import type { 
    Department, 
    CreateDepartmentPayload, 
    UpdateDepartmentPayload,
    ListDepartmentsResponse
} from "./types";

export const departmentsApi = {
    list: async (page?: number, pageSize?: number) => 
        (await apiClient.get<ListDepartmentsResponse>(
            `/departments?page=${page}&page_size=${pageSize}`)
        ).data,
    getAll: async () => (await apiClient.get<Department[]>("/departments/all")).data,
    getOne: async (id: number) => (await apiClient.get<Department>(`/departments/${id}`)).data,
    create: async (payload: CreateDepartmentPayload) =>
        (await apiClient.post<Department>("/departments", payload)).data,
    update: async (id: number, payload: UpdateDepartmentPayload) =>
        (await apiClient.put<Department>(`/departments/${id}`, payload)).data,
    delete: async (id: number) => {
        await apiClient.delete(`/departments/${id}`);
    },
};