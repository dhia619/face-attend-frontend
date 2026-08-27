import Toast from "../../../components/Toast/Toast";
import RoleForm from "../components/RoleForm";

import styles from "./RoleManagementPage.module.css";

import { useCreateRole } from "../../rbac/hooks/useRoles";

function CreateRolePage() {
    const createRole = useCreateRole();

    return (
        <div className={styles.main}>
            {createRole.isSuccess && (
                <Toast message="Role created successfully" />
            )}

            {createRole.isError && (
                <Toast
                    type="error"
                    message={
                        createRole.error?.response?.status === 422
                            ? createRole.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            createRole.error?.response?.data?.detail?.[0]?.message
                            : createRole.error?.response?.data?.detail ??
                            "An error occurred while creating role"
                    }
                />
            )}

            <p className={styles.title}>Create new Role</p>
            <RoleForm
                mode="create"
                isPending={createRole.isPending}
                onSubmit={(values) =>
                    createRole.mutate({
                        name: values.roleName,
                        permission_ids: values.permissionIds
                    })
                }
            />
        </div>
    );
}

export default CreateRolePage;