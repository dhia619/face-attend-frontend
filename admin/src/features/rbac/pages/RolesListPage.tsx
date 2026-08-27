import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useGetRoles, useDeleteRole } from "../../../features/rbac/hooks/useRoles";
import type { Role } from "../../../features/rbac/types";

import styles from "../../../styles/ListPage.module.css";

function RolesListPage() {
	const { data: Roles = [], isLoading } = useGetRoles();
	const deleteRole = useDeleteRole();
	const [RoleToDelete, setRoleToDelete] = useState<Role | null>(null);

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Roles</h1>
                <Link to="/Roles/new" className={styles.dashboardButton}>
                    + New Role
                </Link>
			</div>

			<DataTable<Role>
				columns={[
					{ key: "name", header: "Name", render: (u) => u.name.replace("_", " ").toUpperCase() },
				]}
				rows={Roles}
				rowKey={(u) => u.id}
				isLoading={isLoading}
				emptyMessage="No Roles yet."
				actions={
                    (Role) => (
                        <>
                            <Link to={`/Roles/${Role.id}/edit`} className={styles.editLink}>
                                Edit
                            </Link>
                            <button
                                className={styles.deleteLink}
                                onClick={() => {setRoleToDelete(Role)}}
                            >
                                Delete
                            </button>
                        </>
                    )
				}
			/>
			{
				deleteRole.isSuccess &&
				<Toast message={"Role deleted successfully"} />
			}
			{RoleToDelete && (
				<ConfirmDialog
					title="Delete Role"
					message={`Are you sure you want to delete ${RoleToDelete.name}?`}
					isLoading={deleteRole.isPending}
					onCancel={() => setRoleToDelete(null)}
					onConfirm={() =>
						deleteRole.mutate(RoleToDelete.id, {
							onSuccess: () => {
								setRoleToDelete(null);
							},
						})
					}
					/>
				)}
		</div>
	);
}

export default RolesListPage;