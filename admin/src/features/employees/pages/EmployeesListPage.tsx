import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useGetEmployees, useDeleteEmployee } from "../../../features/employees/hooks/useEmployees";
import type { Employee } from "../../../features/employees/types";

import styles from "../../../styles/ListPage.module.css";

function EmployeesListPage() {

	const { data: employees = [], isLoading } = useGetEmployees();
	const deleteEmployee = useDeleteEmployee();
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
                    { key: "department_id", header: "Department"},
                    { key: "hire_date", header: "Hire Date" },
				]}
				rows={employees}
				rowKey={(u) => u.id}
				isLoading={isLoading}
				emptyMessage="No employees yet."
				actions={
                    (employee) => (
                        <>
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
			/>
			{
				deleteEmployee.isSuccess &&
				<Toast message={"Employee deleted successfully"} />
			}
			{employeeToDelete && (
				<ConfirmDialog
					title="Delete employee"
					message={`Are you sure you want to delete ${employeeToDelete.full_name}?`}
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