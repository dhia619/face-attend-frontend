import { useParams } from "react-router";
import { useGetEmployee, useUpdateEmployee } from "../hooks/useEmployees";

import styles from "../../../styles/ManagementPage.module.css";

import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import EmployeeForm from "../components/EmployeeForm";
import PageError from "../../../components/PageError/PageError";

function EditEmployeePage() {
    const { id } = useParams();
    const employeeId = Number(id);

    const { data: employee, isLoading: employeeLoading } = useGetEmployee(employeeId);

    const updateEmployee = useUpdateEmployee();

    if (employeeLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        );
    }

    if (!employee) {
        return (
            <div className={styles.main}>
                <PageError message="Employee not found :(" />
            </div>
        );
    }

    return (
        <div className={styles.main}>
            {updateEmployee.isSuccess && (
                <Toast message="Employee updated successfully" />
            )}

            {updateEmployee.isError && (
                <Toast
                    type="error"
                    message={
                        updateEmployee.error?.response?.status === 422
                            ? updateEmployee.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            updateEmployee.error?.response?.data?.detail?.[0]?.message
                            : updateEmployee.error?.response?.data?.detail ??
                            "An error occurred while updating employee"
                    }
                />
            )}

            <p className={styles.title}>Edit Employee</p>

            <EmployeeForm
                mode="edit"
                initialValues={{
                    fullName: employee.full_name,
                    email: employee.email,
                    phoneNumber: employee.phone,
                    departmentId: employee.department_id,
                }}
                isPending={updateEmployee.isPending}
                onSubmit={(values) =>
                    updateEmployee.mutate({
                        id: employeeId,
                        payload: {
                            full_name: values.fullName,
                            email: values.email,
                            phone: values.phoneNumber,
                            department_id: values.departmentId
                        },
                    })
                }
            />
        </div>
    );
}

export default EditEmployeePage;