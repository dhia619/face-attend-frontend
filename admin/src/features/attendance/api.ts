import { apiClient } from "../../api/client";
import type { 
	AttendanceFilters, 
	ListAttendanceRecordsResponse, 
	TodayAttendaceResponse 
} from "./types";

export const attendanceApi = {
	getTodayAttendance: async (department_id?: number) => {
		return (
			await apiClient.get<TodayAttendaceResponse>("/attendance/today", {
				params: {
					department_id,
				},
			})
		).data;
	},

	listAttendanceRecords: async (filters: AttendanceFilters) => {
		return (
			await apiClient.get<ListAttendanceRecordsResponse>("/attendance", {
				params: filters
			})
		).data
	}
};