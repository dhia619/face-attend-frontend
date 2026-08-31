import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useGetEmployees, useDeleteEmployee } from "../../../features/employees/hooks/useEmployees";
import { useGetAllDepartments } from "../../departments/hooks/useDepartments";
import type { Employee } from "../../../features/employees/types";

import styles from "../../../styles/ListPage.module.css";

function EmployeesListPage() {

	const [page, setPage] = useState(1);

	const { data: employeesData, isLoading: employeesLoading } = useGetEmployees(page, import.meta.env.VITE_PAGINATION_PAGE_SIZE);
	const deleteEmployee = useDeleteEmployee();
	const { data: departments = [], isLoading: departmentsLoading } = useGetAllDepartments();
	
	const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Employees</h1>
                <Link to="/employees/new" className={styles.dashboardButton}>
                    + New Employee
                </Link>
			</div>

			<DataTable<Employee>
				columns={[
					{ key: "full_name", header: "Name" },
					{ key: "email", header: "Email" },
					{ key: "phone", header: "Phone" },
					{
						key: "department_id",
						header: "Department",
						render: (row) =>
						departments.find(
							department => department.id === row.department_id
						)?.name,
					},
					{ key: "hire_date", header: "Hire Date" },
				]}
				rows={employeesData?.employees ?? []}
				rowKey={(u) => u.id}
				isLoading={employeesLoading || departmentsLoading}
				emptyMessage="No employees yet."
				actions={
                    (employee) => (
                        <>
							<Link to={`/employees/${employee.id}/face-image`} className={styles.editLink}>
								Face image
                            </Link>
                            <Link to={`/employees/${employee.id}/edit`} className={styles.editLink}>
                                Edit
                            </Link>
                            <button
                                className={styles.deleteLink}
                                onClick={() => {setEmployeeToDelete(employee)}}
                            >
                                Delete
                            </button>
                        </>
                    )
				}
				pagination={
					employeesData ? {
						page: page,
						pageSize: employeesData.page_size,
						hasNext: employeesData.has_next,
						onPageChange: setPage,
					}
					: undefined
				}
			/>
			{
				deleteEmployee.isSuccess &&
				<Toast message={"Employee deleted successfully"} />
			}
			{employeeToDelete && (
				<ConfirmDialog
					title="Delete employee"
					message={
						<>
							Are you sure you want to delete{" "}
							<span className={styles.highlight}>{employeeToDelete.full_name}</span> ?
						</>
					}
					isLoading={deleteEmployee.isPending}
					onCancel={() => setEmployeeToDelete(null)}
					onConfirm={() =>
						deleteEmployee.mutate(employeeToDelete.id, {
							onSuccess: () => {
								setEmployeeToDelete(null);
							},
						})
					}
					/>
				)}
		</div>
	);
}

export default EmployeesListPage;