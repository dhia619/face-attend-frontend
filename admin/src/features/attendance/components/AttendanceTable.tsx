import DataTable from "../../../components/DataTable/DataTable";
import styles from "./AttendanceTable.module.css";

import type { Employee } from "../types";
import { splitMinutes } from "../../../util/duration";

type AttendanceTableProps = {
	employees: Employee[];
	isLoading?: boolean;
};

function AttendanceTable({
	employees,
	isLoading,
}: AttendanceTableProps) {
	return (
		<DataTable<Employee>
			columns={[
				{
					key: "full_name",
					header: "Employee",
					render: (employee) => (
						<div className={styles.employee}>
							<div className={styles.avatar}>
								{
									employee.full_name
									.split(" ")[0]
									.charAt(0)
									.toUpperCase() +
									employee.full_name
									.split(" ")[1]
									.charAt(0)
									.toUpperCase()
								}
							</div>

							<span>{employee.full_name}</span>
						</div>
					),
				},
				{
					key: "department_name",
					header: "Department",
					render: (employee) => (
						<span className={employee.department_name ? styles.department : ""}>
							{employee.department_name ?? ""}
						</span>
					),
				},
				{
					key: "current_status",
					header: "Current Status",
					render: (employee) => (
						<span
							className={`${styles.status} ${
								styles[
									`status${toPascalCase(employee.current_status)}`
								] ?? styles.statusMissing
							}`}
						>
							<span className={styles.statusDot} />

							{formatStatus(employee.current_status)}
						</span>
					),
				},
				{
					key: "last_seen_at",
					header: "Last Seen",
					render: (employee) =>
						employee.last_seen_at
							? new Date(employee.last_seen_at).toLocaleTimeString(
									[],
									{
										hour: "2-digit",
										minute: "2-digit",
									}
								)
							: "",
				},
				{
					key: "late_minutes",
					header: "Late",
					render: (employee) =>
						employee.is_late && employee.late_minutes
							? `${splitMinutes(employee.late_minutes).hours} hrs ${splitMinutes(employee.late_minutes).hours} mins`
							: "",
				},
			]}
			rows={employees}
			rowKey={(employee) => employee.employee_id}
			isLoading={isLoading}
			emptyMessage="No attendance activity yet."
		/>
	);
}

function formatStatus(status: string) {
	return status
		.split("_")
		.map(
			(word) =>
				word.charAt(0).toUpperCase() +
				word.slice(1)
		)
		.join(" ");
}

function toPascalCase(value: string) {
	return value
		.split("_")
		.map(
			(word) =>
				word.charAt(0).toUpperCase() +
				word.slice(1)
		)
		.join("");
}

export default AttendanceTable;