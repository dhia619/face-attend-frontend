import Toast from "../../../components/Toast/Toast";
import EmployeeForm from "../components/EmployeeForm";

import styles from "../../../styles/ManagementPage.module.css";

import { useCreateEmployee } from "../hooks/useEmployees";

function CreateEmployeePage() {
    const createEmployee = useCreateEmployee();

    return (
        <div className={styles.main}>
            {createEmployee.isSuccess && (
                <Toast message="Employee created successfully" />
            )}

            {createEmployee.isError && (
                <Toast
                    type="error"
                    message={
                        createEmployee.error?.response?.status === 422
                            ? createEmployee.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            createEmployee.error?.response?.data?.detail?.[0]?.message
                            : createEmployee.error?.response?.data?.detail ??
                            "An error occurred while creating employee"
                    }
                />
            )}

            <p className={styles.title}>Create new Employee</p>

            <EmployeeForm
                mode="create"
                isPending={createEmployee.isPending}
                onSubmit={(values) =>
                    createEmployee.mutate({
                        full_name: values.fullName,
                        email: values.email,
                        phone: values.phoneNumber,
                        department_id: values.departmentId,
                        hire_date: values.hireDate,
                        face_image: values.faceImage
                    })
                }
            />
        </div>
    );
}

export default CreateEmployeePage;