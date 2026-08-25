import { useState } from "react";
import { Link } from "react-router";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog";
import { useGetUsers, useDeleteUser } from "../../features/users/hooks/useUsers";
import type { User } from "../../features/users/types";
import styles from "../ListPage.module.css";
import Toast from "../../components/Toast/Toast";

function UsersListPage() {
	const { data: users = [], isLoading } = useGetUsers();
	const deleteUser = useDeleteUser();
	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [showToast, setShowToast] = useState<boolean>(false);

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Users</h1>
                <Link to="/users/new" className={styles.dashboardButton}>
                    + New User
                </Link>
			</div>

			<DataTable<User>
				columns={[
					{ key: "full_name", header: "Name" },
					{ key: "email", header: "Email" },
					{ key: "role", header: "Role", render: (u) => u.role.name.replace("_", " ").toUpperCase() },
				]}
				rows={users}
				rowKey={(u) => u.id}
				isLoading={isLoading}
				emptyMessage="No users yet."
				actions={
                    (user) => (
                        <>
                            <Link to={`/users/${user.id}/edit`} className={styles.editLink}>
                                Edit
                            </Link>
                            <button
                                className={styles.deleteLink}
                                onClick={() => {console.log(user);setUserToDelete(user)}}
                            >
                                Delete
                            </button>
                        </>
                    )
				}
			/>
			{showToast &&
				<Toast 
					message={`User deleted successfully`} 
					onClose={() => setShowToast(false)}
				/>
			}
			{userToDelete && (
				<ConfirmDialog
					title="Delete user"
					message={`Are you sure you want to delete ${userToDelete.full_name}?`}
					isLoading={deleteUser.isPending}
					onCancel={() => setUserToDelete(null)}
					onConfirm={() =>
						deleteUser.mutate(userToDelete.id, {
							onSuccess: () => {
								setUserToDelete(null);
								setShowToast(true);
							},
						})
					}
					/>
				)}
		</div>
	);
}

export default UsersListPage;