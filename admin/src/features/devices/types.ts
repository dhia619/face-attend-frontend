
export interface Device {
    id: number
    name: string
    status: string
    type?: string
    rtsp_url?: string
}

export interface CreateDevicePayload {
    name: string
    type: string
    rtsp_url?: string
}

export interface UpdateDevicePayload {
    name?: string
    enabled?: boolean
    rtsp_url?: string
}

export interface ActivateDeviceResponse {
    device_activation_code: string
}

export interface ListDevicesResponse {
    devices: Device[]
    page: number
    page_size: number
    has_next: boolean
}