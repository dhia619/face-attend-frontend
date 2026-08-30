
export interface Device {
    id: number
    name: string
    status: string
}

export interface CreateDevicePayload {
    name: string
}

export interface UpdateDevicePayload {
    name: string | undefined
    enabled: boolean | undefined
}

export interface ActivateDeviceResponse {
    device_activation_code: string
}