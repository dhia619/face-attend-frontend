import Loader from "../../../components/Loader/Loader";
import Toast from "../../../components/Toast/Toast";
import Card from "../../../components/Card/Card";
import UserForm from "../components/UserForm";

import styles from "../../../styles/ManagementPage.module.css";

import { useGetAllRoles } from "../../rbac/hooks/useRoles";
import { useCreateUser } from "../hooks/useUsers";

function CreateUserPage() {
    const { data: roles = [], isLoading } = useGetAllRoles();
    const createUser = useCreateUser();

    if (isLoading) {
        return (
            <div className={styles.main}>
                <Loader />
            </div>
        )
    }

    return (
        <div className={styles.main}>
            {createUser.isSuccess && (
                <Toast message="User created successfully" />
            )}

            {createUser.isError && (
                <Toast
                    type="error"
                    message={
                        createUser.error?.response?.status === 422
                            ? createUser.error?.response?.data?.detail?.[0]?.field + 
                            " " + 
                            createUser.error?.response?.data?.detail?.[0]?.message
                            : createUser.error?.response?.data?.detail ??
                            "An error occurred while creating user"
                    }
                />
            )}

            <p className={styles.title}>Create new User</p>

            <Card>
                <UserForm
                    mode="create"
                    roles={roles}
                    isPending={createUser.isPending}
                    onSubmit={(values) =>
                        createUser.mutate({
                            full_name: values.fullName,
                            email: values.email,
                            password: values.password!,
                            role_id: values.roleId,
                        })
                    }
                />
            </Card>
        </div>
    );
}

export default CreateUserPage;