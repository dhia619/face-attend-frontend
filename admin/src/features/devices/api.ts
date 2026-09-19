import { apiClient } from "../../api/client";
import type { 
    Device, 
    CreateDevicePayload, 
    UpdateDevicePayload, 
    ActivateDeviceResponse,
    ListDevicesResponse 
} from "./types";

export const devicesApi = {
    list: async (page?: number, pageSize?: number) => (
        await apiClient.get<ListDevicesResponse>(
            `/devices?page=${page}&page_size=${pageSize}`
        )
    ).data,
    getOne: async (id: number) => (await apiClient.get<Device>(`/devices/${id}`)).data,
    create: async (payload: CreateDevicePayload) =>
        (await apiClient.post<ActivateDeviceResponse>("/devices", payload)).data,
    update: async (id: number, payload: UpdateDevicePayload) =>
        (await apiClient.put<Device>(`/devices/${id}`, payload)).data,
    delete: async (id: number) => 
        await apiClient.delete(`/devices/${id}`),
    regenerateActivationCode: async (id: number) =>
        (await apiClient.patch<ActivateDeviceResponse>(`/devices/${id}/activation-code`)).data
};