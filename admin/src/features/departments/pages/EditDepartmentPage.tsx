import { useParams } from "react-router";
import { useGetDepartment, useUpdateDepartment } from "../hooks/useDepartments";

import styles from "../../../styles/ManagementPage.module.css";

import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import DepartmentForm from "../components/DepartmentForm";
import PageError from "../../../components/PageError/PageError";

function EditDepartmentPage() {
    const { id } = useParams();
    const departmentId = Number(id);

    const { data: department, isLoading: departmentLoading } = useGetDepartment(departmentId);

    const updateDepartment = useUpdateDepartment();

    if (departmentLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        );
    }

    if (!department) {
        return (
            <div className={styles.main}>
                <PageError message="Department not found :(" />
            </div>
        );
    }

    return (
        <div className={styles.main}>
            {updateDepartment.isSuccess && (
                <Toast message="Department updated successfully" />
            )}

            {updateDepartment.isError && (
                <Toast
                    type="error"
                    message={
                        updateDepartment.error?.response?.status === 422
                            ? updateDepartment.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            updateDepartment.error?.response?.data?.detail?.[0]?.message
                            : updateDepartment.error?.response?.data?.detail ??
                            "An error occurred while updating department"
                    }
                />
            )}

            <p className={styles.title}>Edit Department</p>

            <DepartmentForm
                mode="edit"
                initialValues={{
                    departmentName: department.name,
                }}
                isPending={updateDepartment.isPending}
                onSubmit={(values) =>
                    updateDepartment.mutate({
                        id: departmentId,
                        payload: {
                            name: values.departmentName,
                        },
                    })
                }
            />
        </div>
    );
}

export default EditDepartmentPage;