import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api";

const ATTENDANCE_KEY = ["attendance"];

export function useGetTodayAttendance(department_id?: number) {
	return useQuery({ queryKey: [ATTENDANCE_KEY], queryFn: () => 
        attendanceApi.getTodayAttendance(department_id) 
    });
}