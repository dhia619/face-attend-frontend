import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../features/auth/AuthContext";
import Loader from "../../components/Loader/Loader";
import styles from "../PublicLayout/PublicLayout.module.css";

function PrivateLayout() {
	const { isAuthenticated, isLoading } = useAuth();

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

	return <Outlet />;
}

export default PrivateLayout;