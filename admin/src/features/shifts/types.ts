
export interface Shift {
    id: number;
    name: string;
    department_id: number;
    start_time: string;
    end_time: string;
}

export interface CreateShiftPayload {
    name: string;
    department_id: number;
    start_time: string;
    end_time: string;
}

export interface UpdateShiftPayload {
    name: string;
    start_time: string;
    end_time: string;
}

export interface ListShiftsResponse {
    shifts: Shift[]
    page: number
    page_size: number
    has_next: boolean
}