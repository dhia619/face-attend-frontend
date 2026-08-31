import { apiClient } from "../../api/client";
import type { 
    Employee, 
    CreateEmployeePayload, 
    UpdateEmployeePayload,
    CreateEmbeddingPayload,
    ListEmployeesResponse
} from "./types";

export const employeesApi = {
    list: async (page?: number, pageSize?: number) => 
        (await apiClient.get<ListEmployeesResponse>(`/employees?page=${page}&page_size=${pageSize}`)).data,
    getOne: async (id: number) => (await apiClient.get<Employee>(`/employees/${id}`)).data,
    create: async (payload: CreateEmployeePayload) =>
        (await apiClient.post<Employee>("/employees", payload)).data,
    update: async (id: number, payload: UpdateEmployeePayload) =>
        (await apiClient.put<Employee>(`/employees/${id}`, payload)).data,
    delete: async (id: number) =>
        await apiClient.delete(`/employees/${id}`),
    addFace: async (id: number, payload: CreateEmbeddingPayload) => 
        (await apiClient.post(`/employees/${id}/embeddings`, payload)).data,
}