import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useGetUsers, useDeleteUser } from "../../../features/users/hooks/useUsers";
import type { User } from "../../../features/users/types";

import styles from "../../../styles/ListPage.module.css";

function UsersListPage() {

	const [userToDelete, setUserToDelete] = useState<User | null>(null);
	const [page, setPage] = useState<number>(1);

	const { data: usersData, isLoading } = useGetUsers(page, import.meta.env.VITE_PAGINATION_PAGE_SIZE);
	const deleteUser = useDeleteUser();

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
				rows={usersData?.users ?? []}
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
                                onClick={() => {setUserToDelete(user)}}
                            >
                                Delete
                            </button>
                        </>
                    )
				}
				pagination={
					usersData ? {
						page: page,
						pageSize: usersData.page_size,
						hasNext: usersData.has_next,
						onPageChange: setPage,
					}
					: undefined
				}
			/>
			{
				deleteUser.isSuccess &&
				<Toast message={"User deleted successfully"} />
			}
			{
				deleteUser.isError &&
				<Toast 
					type="error"
					message={deleteUser.error?.response?.data?.detail || "Failed to delete user"} 
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
							},
						})
					}
					/>
				)}
		</div>
	);
}

export default UsersListPage;