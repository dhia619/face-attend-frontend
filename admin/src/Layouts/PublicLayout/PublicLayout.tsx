import { Outlet } from "react-router";
import styles from "./PublicLayout.module.css";

function PublicLayout() {
	return (
		<main className={styles.page}>
			<Outlet />
		</main>
	);
}

export default PublicLayout;