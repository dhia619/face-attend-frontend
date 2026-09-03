import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api";
import type { AttendanceFilters } from "../types";

const ATTENDANCE_KEY = ["attendance"];

export function useGetTodayAttendance(department_id?: number) {
	return useQuery({ 
		queryKey: [ATTENDANCE_KEY], 
		queryFn: () => attendanceApi.getTodayAttendance(department_id) 
    });
}

export function useGetAttendanceRecords(filters: AttendanceFilters) {
	return useQuery({
		queryKey: [ATTENDANCE_KEY, filters],
		queryFn: async () => attendanceApi.listAttendanceRecords(filters)
	});
}