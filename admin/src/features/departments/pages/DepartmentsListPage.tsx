import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useGetDepartments, useDeleteDepartment } from "../../../features/departments/hooks/useDepartments";
import type { Department } from "../../../features/departments/types";

import styles from "../../../styles/ListPage.module.css";

function DepartmentsListPage() {

	const { data: departments = [], isLoading: departmentsLoading } = useGetDepartments();
	const deleteDepartment = useDeleteDepartment();
	
	const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

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
				rows={departments}
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