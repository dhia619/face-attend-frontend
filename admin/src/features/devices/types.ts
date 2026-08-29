
export interface Device {
    id: number
    name: string
    status: string
}

export interface CreateDevicePayload {
    name: string
}

export interface UpdateDevicePayload {
    name: string
}