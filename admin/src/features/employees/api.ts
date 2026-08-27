import { apiClient } from "../../api/client";
import type { Employee, CreateEmployeePayload, UpdateEmployeePayload } from "./types";

export const employeesApi = {
    list: async () => (await apiClient.get<Employee[]>("/employees")).data,
    getOne: async (id: number) => (await apiClient.get<Employee>(`/employees/${id}`)).data,
    create: async (payload: CreateEmployeePayload) =>
        (await apiClient.post<Employee>("/employees", payload)).data,
    update: async (id: number, payload: UpdateEmployeePayload) =>
        (await apiClient.put<Employee>(`/employees/${id}`, payload)).data,
    delete: async (id: number) => {
        await apiClient.delete(`/employees/${id}`);
    },
};