import { useState } from "react";

import AttendanceFilters from "../../../features/attendance/components/AttendanceFilters";
import AttendanceRecordsTable from "../../../features/attendance/components/AttendanceRecordsTable";

import { useGetAttendanceRecords } from "../../../features/attendance/hooks/useAttendance";
import { useGetAllDepartments } from "../../../features/departments/hooks/useDepartments";

import styles from "./AttendancePage.module.css";

import type { AttendanceFilters as Filters } from "../../../features/attendance/types";

const PAGE_SIZE = Number(import.meta.env.VITE_PAGINATION_PAGE_SIZE) || 20;

const DEFAULT_FILTERS: Filters = {
	page: 1,
	page_size: PAGE_SIZE,
};

function AttendancePage() {
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

	const { data, isLoading } = useGetAttendanceRecords(filters);
	const { data: departments } = useGetAllDepartments();

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>Attendance Records</h1>
					<p className={styles.subtitle}>
						View and filter employee check-in and check-out history.
					</p>
				</div>
			</div>

			<AttendanceFilters
				filters={filters}
				onChange={setFilters}
				onReset={() => setFilters(DEFAULT_FILTERS)}
				departments={departments ?? []}
			/>

			<AttendanceRecordsTable
				records={data?.records ?? []}
				isLoading={isLoading}
				page={filters.page}
				pageSize={filters.page_size}
				hasNext={data?.has_next ?? false}
				onPageChange={(page) =>
					setFilters((current) => ({
						...current,
						page,
					}))
				}
			/>
		</div>
	);
}

export default AttendancePage;