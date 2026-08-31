import { useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import { useListRoles, useDeleteRole } from "../../../features/rbac/hooks/useRoles";
import type { Role } from "../../../features/rbac/types";

import styles from "../../../styles/ListPage.module.css";

function RolesListPage() {

	const [page, setPage] = useState<number>(1);
	const [RoleToDelete, setRoleToDelete] = useState<Role | null>(null);

	const { data: rolesData, isLoading } = useListRoles(page, import.meta.env.VITE_PAGINATION_PAGE_SIZE);
	const deleteRole = useDeleteRole();

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
				rows={rolesData?.roles ?? []}
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
				pagination={
					rolesData ? {
						page: page,
						pageSize: rolesData.page_size,
						hasNext: rolesData.has_next,
						onPageChange: setPage,
					}
					: undefined
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