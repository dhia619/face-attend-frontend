
export interface TodayAttendaceResponse {
    date: string
    total_employees: number
    present: number
    absent: number
    currently_in: number
    currently_out: number
    late: number
    employees: Employee[]
}

export interface Employee {
    employee_id: number
    full_name: string
    department_name: string
    is_present: boolean
    current_status: string
    last_seen_at: string
    is_late: boolean
    late_minutes: number
}