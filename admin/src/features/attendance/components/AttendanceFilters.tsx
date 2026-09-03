import styles from "./AttendanceFilters.module.css";

import type { AttendanceFilters as Filters } from "../types";

type AttendanceFiltersProps = {
	filters: Filters;
	onChange: (filters: Filters) => void;
	onReset: () => void;
	departments: {
		id: number;
		name: string;
	}[];
};

function AttendanceFilters({
	filters,
	onChange,
	onReset,
	departments,
}: AttendanceFiltersProps) {
	const hasActiveFilters =
		filters.employee_search !== undefined ||
		filters.department_id !== undefined ||
		filters.check_type !== undefined ||
		!!filters.date_from ||
		!!filters.date_to;

	const updateFilters = (updates: Partial<Filters>) => {
		onChange({
			...filters,
			...updates,
			page: 1,
		});
	};

	return (
		<div className={styles.filters}>
			<div className={styles.filtersHeader}>
				<span className={styles.filtersTitle}>Filters</span>

				{hasActiveFilters && (
					<button
						type="button"
						className={styles.clearButton}
						onClick={onReset}
					>
						Clear filters
					</button>
				)}
			</div>

			<div className={styles.controls}>
				<div className={styles.field}>
					<label htmlFor="attendance-department">Department</label>
					<select
						id="attendance-department"
						value={filters.department_id ?? ""}
						onChange={(e) =>
							updateFilters({
								department_id: e.target.value
									? Number(e.target.value)
									: undefined,
							})
						}
					>
						<option value="">All Departments</option>

						{departments.map((department) => (
							<option key={department.id} value={department.id}>
								{department.name}
							</option>
						))}
					</select>
				</div>

				<div className={styles.field}>
					<label htmlFor="attendance-type">Type</label>
					<select
						id="attendance-type"
						value={filters.check_type ?? ""}
						onChange={(e) =>
							updateFilters({
								check_type: e.target.value || undefined,
							})
						}
					>
						<option value="">All Types</option>
						<option value="check_in">Check In</option>
						<option value="check_out">Check Out</option>
					</select>
				</div>

				<div className={styles.field}>
					<label htmlFor="attendance-from">From</label>
					<input
						id="attendance-from"
						type="date"
						value={filters.date_from ?? ""}
						max={filters.date_to || undefined}
						onChange={(e) =>
							updateFilters({
								date_from: e.target.value || undefined,
							})
						}
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="attendance-to">To</label>
					<input
						id="attendance-to"
						type="date"
						value={filters.date_to ?? ""}
						min={filters.date_from || undefined}
						onChange={(e) =>
							updateFilters({
								date_to: e.target.value || undefined,
							})
						}
					/>
				</div>

				<div className={styles.field}>
					<label htmlFor="attendance-employee">Employee</label>
					<input
						id="attendance-employee"
						type="search"
						placeholder="Name or email..."
						value={filters.employee_search ?? ""}
						onChange={(e) => {
							const value = e.target.value.trimStart();
							updateFilters({
								employee_search: value,
							});
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default AttendanceFilters;