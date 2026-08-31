
export interface Department {
    id: number
    name: string
}

export interface CreateDepartmentPayload {
    name: string
}

export interface UpdateDepartmentPayload {
    name: string
}

export interface ListDepartmentsResponse {
    departments: Department[]
    page: number
    page_size: number
    has_next: number
}
