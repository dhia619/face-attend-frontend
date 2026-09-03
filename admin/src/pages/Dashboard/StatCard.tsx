import styles from "./DashboardPage.module.css";

type StatCardProps = {
	value: number;
	label: string;
	variant?: "default" | "success" | "info" | "warning";
};

function StatCard({
	value,
	label,
	variant = "default",
}: StatCardProps) {
	return (
		<div className={`${styles.statCard} ${styles[variant]}`}>
			<strong className={styles.statValue}>{value}</strong>
			<span className={styles.statLabel}>{label}</span>
		</div>
	);
}

export default StatCard;