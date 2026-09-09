import { apiClient } from "../../api/client";
import type { 
    Shift, 
    CreateShiftPayload, 
    UpdateShiftPayload,
    ListShiftsResponse
} from "./types";

export const shiftsApi = {
    list: async (page?: number, pageSize?: number) => 
        (await apiClient.get<ListShiftsResponse>(
            `/shifts?page=${page}&page_size=${pageSize}`)
        ).data,
    getOne: async (id: number) => (await apiClient.get<Shift>(`/shifts/${id}`)).data,
    create: async (payload: CreateShiftPayload) =>
        (await apiClient.post<Shift>("/shifts", payload)).data,
    update: async (id: number, payload: UpdateShiftPayload) =>
        (await apiClient.put<Shift>(`/shifts/${id}`, payload)).data,
    delete: async (id: number) => {
        await apiClient.delete(`/shifts/${id}`);
    },
};