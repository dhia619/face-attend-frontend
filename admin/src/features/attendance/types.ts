
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

export type AttendanceRecord = {
	id: number;
	employee_id: number;
	employee_name: string;
	department_name: string | null;
	device_id: number;
	device_name: string;
	check_type: "check_in" | "check_out";
	confidence: number;
	timestamp: string;
};

export type AttendanceFilters = {
	page: number;
	page_size: number;
	employee_id?: number;
	employee_search?: string
	department_id?: number;
	check_type?: string;
	date_from?: string;
	date_to?: string;
};

export type ListAttendanceRecordsResponse = {
	records: AttendanceRecord[];
	page: number;
	page_size: number;
	has_next: boolean;
};