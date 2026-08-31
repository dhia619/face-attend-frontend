
export interface Employee {
    id: number
    full_name: string
    department_id: number
    email: string
    phone: string
    hire_date: string
}

export interface CreateEmployeePayload {
    full_name: string
    department_id: number
    email: string
    phone: string
    hire_date: string
    face_image: string
}

export interface UpdateEmployeePayload {
    full_name: string
    department_id: number
    email: string
    phone: string
    hire_date: string
}

export interface CreateEmbeddingPayload {
    face_image: string
}

export interface ListEmployeesResponse {
    employees: Employee[]
    page: number
    page_size: number
    has_next: boolean
}