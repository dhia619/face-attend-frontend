import { useParams } from "react-router";
import { useGetRoles } from "../../rbac/hooks/useRoles";
import { useGetUser, useUpdateUser } from "../hooks/useUsers";

import styles from "./UserManagement.module.css";

import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import Card from "../../../components/Card/Card";
import UserForm from "../components/UserForm";
import PageError from "../../../components/PageError/PageError";

function EditUserPage() {
    const { id } = useParams();
    const userId = Number(id);

    const { data: roles = [], isLoading: rolesLoading } = useGetRoles();
    const { data: user, isLoading: userLoading } = useGetUser(userId);

    const updateUser = useUpdateUser();

    if (rolesLoading || userLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        );
    }

    if (!user) {
        return (
            <div className={styles.main}>
                <PageError message="User not found :(" />
            </div>
        );
    }

    return (
        <div className={styles.main}>
            {updateUser.isSuccess && (
                <Toast message="User updated successfully" />
            )}

            {updateUser.isError && (
                <Toast
                    type="error"
                    message={
                        updateUser.error?.response?.status === 422
                            ? updateUser.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            updateUser.error?.response?.data?.detail?.[0]?.message
                            : updateUser.error?.response?.data?.detail ??
                            "An error occurred while updating user"
                    }
                />
            )}

            <p className={styles.title}>Edit user</p>

            <Card>
                <UserForm
                    mode="edit"
                    roles={roles}
                    initialValues={{
                        fullName: user.full_name,
                        email: user.email,
                        roleId: user.role.id,
                    }}
                    isPending={updateUser.isPending}
                    onSubmit={(values) =>
                        updateUser.mutate({
                            id: userId,
                            payload: {
                                full_name: values.fullName,
                                email: values.email,
                                role_id: values.roleId,
                            },
                        })
                    }
                />
            </Card>
        </div>
    );
}

export default EditUserPage;