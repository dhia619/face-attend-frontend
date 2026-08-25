import { useAuth } from "../../features/auth/AuthContext";

function DashboardPage() {
	const { user } = useAuth();

	return (
		<div>
		</div>
	);
}

export default DashboardPage;