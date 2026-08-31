import { useEffect, useState } from "react";
import { Link } from "react-router";

import DataTable from "../../../components/DataTable/DataTable";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import Toast from "../../../components/Toast/Toast";

import {
	useGetDevices,
	useDeleteDevice,
	useRegenerateDeviceActivationCode,
} from "../../../features/devices/hooks/useDevices";

import type { Device } from "../../../features/devices/types";

import styles from "../../../styles/ListPage.module.css";
import ActivationCodeDialog from "../components/ActivationCodeDialog";

function DevicesListPage() {
	
	const [page, setPage] = useState<number>(1);
	const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
	const [activationDialogOpen, setActivationDialogOpen] = useState<boolean>(false);
	
	const { data: devicesData, isLoading: devicesLoading } = useGetDevices(page, import.meta.env.VITE_PAGINATION_PAGE_SIZE);
	const deleteDevice = useDeleteDevice();
	const regenrateActivationCode = useRegenerateDeviceActivationCode();


	useEffect(() => {
		if (regenrateActivationCode.isSuccess) {
			setActivationDialogOpen(true);
		}
	}, [regenrateActivationCode.isSuccess]);

	return (
		<div>
			<div className={styles.header}>
				<h1 className={styles.title}>Devices</h1>

				<Link to="/devices/new" className={styles.dashboardButton}>
					+ New Device
				</Link>
			</div>

			<DataTable<Device>
				columns={[
					{
						key: "name",
						header: "Name",
					},
					{
						key: "status",
						header: "Status",
						render: (row) => {
							switch (row.status) {
								case "active":
									return (
										<span className={`${styles.statusBadge} ${styles.statusActive}`}>
											Active
										</span>
									);

								case "pending":
									return (
										<span className={`${styles.statusBadge} ${styles.statusPending}`}>
											Pending
										</span>
									);

								case "disabled":
									return (
										<span className={`${styles.statusBadge} ${styles.statusDisabled}`}>
											Disabled
										</span>
									);

								default:
									return <span>{row.status}</span>;
							}
						},
					},
				]}
				rows={devicesData?.devices ?? []}
				rowKey={(device) => device.id}
				isLoading={devicesLoading}
				emptyMessage="No devices yet."
				actions={(device) => (
					<>
						<Link
							to={`/devices/${device.id}/edit`}
							className={styles.editLink}
						>
							Edit
						</Link>

						<button
							className={styles.deleteLink}
							onClick={() => setDeviceToDelete(device)}
						>
							Delete
						</button>
						{device.status === "pending" && (
							<button
								className={styles.editLink}
								disabled={regenrateActivationCode.isPending}
								onClick={() => regenrateActivationCode.mutate(device.id)}
							>
								Resend activation code
							</button>
						)}
					</>
					
				)}
				pagination={
					devicesData ? {
						page: page,
						pageSize: devicesData.page_size,
						hasNext: devicesData.has_next,
						onPageChange: setPage,
					}
					: undefined
				}
			/>

			{deleteDevice.isSuccess && (
				<Toast message="Device deleted successfully" />
			)}

			{regenrateActivationCode.isSuccess && activationDialogOpen && (
				<>
					<ActivationCodeDialog
						activationCode={regenrateActivationCode.data.device_activation_code}
						onCancel={() => setActivationDialogOpen(false)}
					/>
				</>
			)}

			{deviceToDelete && (
				<ConfirmDialog
					title="Delete device"
					message={`Are you sure you want to delete ${deviceToDelete.name}?`}
					isLoading={deleteDevice.isPending}
					onCancel={() => setDeviceToDelete(null)}
					onConfirm={() =>
						deleteDevice.mutate(deviceToDelete.id, {
							onSuccess: () => {
								setDeviceToDelete(null);
							},
						})
					}
				/>
			)}
		</div>
	);
}

export default DevicesListPage;