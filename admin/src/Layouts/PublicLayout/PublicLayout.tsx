import { Navigate, Outlet } from "react-router";
import styles from "./PublicLayout.module.css";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../../features/auth/AuthContext";

function PublicLayout() {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
        return (
            <main className={styles.page}>
                <Loader />
            </main>
        );
	}

	if (isAuthenticated) {
		return <Navigate to="/dashboard" replace />;
	}
	
	return (
		<main className={styles.page}>
			<Outlet />
		</main>
	);
}

export default PublicLayout;