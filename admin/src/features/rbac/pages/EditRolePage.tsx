import Toast from "../../../components/Toast/Toast";
import RoleForm from "../components/RoleForm";

import styles from "./RoleManagementPage.module.css";

import { useGetRolePermissions, useUpdateRole, useGetRole } from "../../rbac/hooks/useRoles";
import { useParams } from "react-router";
import Loader from "../../../components/Loader/Loader";
import PageError from "../../../components/PageError/PageError";

function EditRolePage() {

    const { id } = useParams();
    const roleId = Number(id);

    const { data: role, isLoading: roleLoading } = useGetRole(roleId);
    const { data: rolePermissions, isLoading: rolePermissionsLoading } = useGetRolePermissions(roleId);

    const updateRole = useUpdateRole();

    if (roleLoading || rolePermissionsLoading) {
        <div className={styles.main}>
            <Loader />
        </div>
    }

    if (!role) {
        return (
            <div className={styles.main}>
                <PageError message="Role not found :("/>
            </div>
        );
    }

    const permissionIds = rolePermissions?.map((permission) => permission.id);

    return (
        <div className={styles.main}>
            {updateRole.isSuccess && (
                <Toast message="Role created successfully" />
            )}

            {updateRole.isError && (
                <Toast
                    type="error"
                    message={
                        updateRole.error?.response?.status === 422
                            ? updateRole.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            updateRole.error?.response?.data?.detail?.[0]?.message
                            : updateRole.error?.response?.data?.detail ??
                            "An error occurred while creating role"
                    }
                />
            )}

            <p className={styles.title}>Edit role</p>

            <RoleForm
                mode="edit"
                isPending={updateRole.isPending}
                initialName={role.name}
                initialPermissionIds={permissionIds}
                onSubmit={(values) =>
                    updateRole.mutate({
                        id: roleId,
                        payload: {
                            name: values.roleName,
                            permission_ids: values.permissionIds
                        }
                    })
                }
            />
        </div>
    );
}

export default EditRolePage;