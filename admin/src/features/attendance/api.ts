import { apiClient } from "../../api/client";
import type { TodayAttendaceResponse } from "./types";

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
};