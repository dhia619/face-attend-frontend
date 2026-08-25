import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../features/auth/AuthContext";
import Loader from "../../components/Loader/Loader";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import styles from "./PrivateLayout.module.css";

function PrivateLayout() {
	const { isAuthenticated, isLoading } = useAuth();
	const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

	if (isLoading) {
		return (
			<main className={styles.page}>
				<Loader />
			</main>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className={styles.shell}>
			<Sidebar isOpen={isMobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

			{isMobileSidebarOpen && (
				<div className={styles.backdrop} onClick={() => setMobileSidebarOpen(false)} />
			)}

			<div className={styles.main}>
				<Topbar onSidebarClick={() => setMobileSidebarOpen(true)} />
				<main className={styles.content}>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default PrivateLayout;