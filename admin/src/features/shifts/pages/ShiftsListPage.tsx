import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useGetShifts, useDeleteShift } from "../../../features/shifts/hooks/useShifts";
import type { Shift } from "../../../features/shifts/types";

import styles from "../../../styles/ListPage.module.css";
import { useGetAllDepartments } from "../../departments/hooks/useDepartments";

function ShiftsListPage() {

	const [shiftToDelete, setShiftToDelete] = useState<Shift | null>(null);
	const [page, setPage] = useState<number>(1);

	const { data: shiftsData, isLoading: shiftsLoading } = useGetShifts(page, import.meta.env.VITE_PAGINATION_PAGE_SIZE);
	const { data: departments=[], isLoading: departmentsLoading } = useGetAllDepartments();
	const deleteShift = useDeleteShift();

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Shifts</h1>
                <Link to="/shifts/new" className={styles.dashboardButton}>
                    + New Shift
                </Link>
			</div>

			<DataTable<Shift>
				columns={[
					{ key: "name", header: "Name" },
					{
						key: "department_id",
						header: "Department",
						render: (row) =>
						departments.find(
							department => department.id === row.department_id
						)?.name,
					},
                    { key: "start_time", header: "Start Time" },
					{ key: "end_time", header: "End Time" },
				]}
				rows={shiftsData?.shifts ?? []}
				rowKey={(u) => u.id}
				isLoading={shiftsLoading || departmentsLoading}
				emptyMessage="No shifts yet."
				actions={
                    (shift) => (
                        <>
                            <Link to={`/shifts/${shift.id}/edit`} className={styles.editLink}>
                                Edit
                            </Link>
                            <button
                                className={styles.deleteLink}
                                onClick={() => {setShiftToDelete(shift)}}
                            >
                                Delete
                            </button>
                        </>
                    )
				}
				pagination={
					shiftsData ? {
						page: page,
						pageSize: shiftsData.page_size,
						hasNext: shiftsData.has_next,
						onPageChange: setPage,
					}
					: undefined
				}
			/>
			{
				deleteShift.isSuccess &&
				<Toast message={"Shift deleted successfully"} />
			}
			{
				deleteShift.isError &&
				<Toast 
					type="error"
					message={deleteShift.error?.response?.data?.detail || "Failed to delete shift"} 
				/>
			}
			{shiftToDelete && (
				<ConfirmDialog
					title="Delete shift"
					message={
						<>
							Are you sure you want to delete{" "}
							<span className={styles.highlight}>{shiftToDelete.name}</span> ?
						</>
					}
					isLoading={deleteShift.isPending}
					onCancel={() => setShiftToDelete(null)}
					onConfirm={() =>
						deleteShift.mutate(shiftToDelete.id, {
							onSuccess: () => {
								setShiftToDelete(null);
							},
						})
					}
					/>
				)}
		</div>
	);
}

export default ShiftsListPage;