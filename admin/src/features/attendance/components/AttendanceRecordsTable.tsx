import DataTable from "../../../components/DataTable/DataTable";

import styles from "./AttendanceRecordsTable.module.css";

import type { AttendanceRecord } from "../types";

type AttendanceRecordsTableProps = {
	records: AttendanceRecord[];
	isLoading?: boolean;
	page: number;
	pageSize: number;
	hasNext: boolean;
	onPageChange: (page: number) => void;
};

function AttendanceRecordsTable({
	records,
	isLoading,
	page,
	pageSize,
	hasNext,
	onPageChange,
}: AttendanceRecordsTableProps) {
	return (
		<DataTable<AttendanceRecord>
			columns={[
				{
					key: "employee_name",
					header: "Employee",
					render: (record) => (
						<div className={styles.employee}>
							<div className={styles.avatar}>
								{initials(record.employee_name)}
							</div>

							<span className={styles.employeeName}>
								{record.employee_name}
							</span>
						</div>
					),
				},
				{
					key: "department_name",
					header: "Department",
					render: (record) => record.department_name || "",
				},
				{
					key: "check_type",
					header: "Type",
					render: (record) => {
						const isCheckIn = record.check_type === "check_in";

						return (
							<span
								className={`${styles.badge} ${
									isCheckIn ? styles.in : styles.out
								}`}
							>
								<span className={styles.dot} />
								{isCheckIn ? "Check In" : "Check Out"}
							</span>
						);
					},
				},
				{
					key: "timestamp",
					header: "Date & Time",
					render: (record) => formatDateTime(record.timestamp),
				},
				{
					key: "device_name",
					header: "Device",
					render: (record) => record.device_name || "—",
				},
				{
					key: "confidence",
					header: "Confidence",
					render: (record) => formatConfidence(record.confidence),
				},
			]}
			rows={records}
			rowKey={(record) => record.id}
			isLoading={isLoading}
			emptyMessage="No attendance records match the selected filters."
			pagination={{
				page,
				pageSize,
				hasNext,
				onPageChange,
			}}
		/>
	);
}

function initials(name: string) {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0))
		.join("")
		.toUpperCase();
}

function formatDateTime(timestamp: string) {
	return new Intl.DateTimeFormat("en", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(timestamp));
}

function formatConfidence(confidence: number) {
	return `${Math.round(confidence * 100)}%`;
}

export default AttendanceRecordsTable;