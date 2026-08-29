import Toast from "../../../components/Toast/Toast";
import DepartmentForm from "../components/DepartmentForm";

import styles from "../../../styles/ManagementPage.module.css";

import { useCreateDepartment } from "../hooks/useDepartments";

function CreateDepartmentPage() {
    const createDepartment = useCreateDepartment();

    return (
        <div className={styles.main}>
            {createDepartment.isSuccess && (
                <Toast message="Department created successfully" />
            )}

            {createDepartment.isError && (
                <Toast
                    type="error"
                    message={
                        createDepartment.error?.response?.status === 422
                            ? createDepartment.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            createDepartment.error?.response?.data?.detail?.[0]?.message
                            : createDepartment.error?.response?.data?.detail ??
                            "An error occurred while creating department"
                    }
                />
            )}

            <p className={styles.title}>Create new Department</p>

            <DepartmentForm
                mode="create"
                isPending={createDepartment.isPending}
                onSubmit={(values) =>
                    createDepartment.mutate({
                        name: values.departmentName,
                    })
                }
            />
        </div>
    );
}

export default CreateDepartmentPage;