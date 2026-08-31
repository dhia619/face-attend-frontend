import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useListDepartments, useDeleteDepartment } from "../../../features/departments/hooks/useDepartments";
import type { Department } from "../../../features/departments/types";

import styles from "../../../styles/ListPage.module.css";

function DepartmentsListPage() {

	const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
	const [page, setPage] = useState<number>(1);

	const { data: departmentsData, isLoading: departmentsLoading } = useListDepartments(page, import.meta.env.VITE_PAGINATION_PAGE_SIZE);
	const deleteDepartment = useDeleteDepartment();
	

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Departments</h1>
                <Link to="/departments/new" className={styles.dashboardButton}>
                    + New Department
                </Link>
			</div>

			<DataTable<Department>
				columns={[
					{ key: "name", header: "Name" },
				]}
				rows={departmentsData?.departments ?? []}
				rowKey={(u) => u.id}
				isLoading={departmentsLoading}
				emptyMessage="No departments yet."
				actions={
                    (department) => (
                        <>
                            <Link to={`/departments/${department.id}/edit`} className={styles.editLink}>
                                Edit
                            </Link>
                            <button
                                className={styles.deleteLink}
                                onClick={() => {setDepartmentToDelete(department)}}
                            >
                                Delete
                            </button>
                        </>
                    )
				}
				pagination={
					departmentsData ? {
						page: page,
						pageSize: departmentsData.page_size,
						hasNext: departmentsData.has_next,
						onPageChange: setPage,
					}
					: undefined
				}
			/>
			{
				deleteDepartment.isSuccess &&
				<Toast message={"Department deleted successfully"} />
			}
			{departmentToDelete && (
				<ConfirmDialog
					title="Delete department"
					message={`Are you sure you want to delete ${departmentToDelete.name}?`}
					isLoading={deleteDepartment.isPending}
					onCancel={() => setDepartmentToDelete(null)}
					onConfirm={() =>
						deleteDepartment.mutate(departmentToDelete.id, {
							onSuccess: () => {
								setDepartmentToDelete(null);
							},
						})
					}
					/>
				)}
		</div>
	);
}

export default DepartmentsListPage;