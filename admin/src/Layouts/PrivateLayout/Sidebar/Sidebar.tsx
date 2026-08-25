import { NavLink } from "react-router";
import styles from "./Sidebar.module.css";

const navItems = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/users", label: "Users" },
	{ to: "/employees", label: "Employees" },
	{ to: "/attendance", label: "Attendance" },
	{ to: "/devices", label: "Devices" },
];

type SidebarProps = {
	isOpen: boolean;
	onClose: () => void;
};

function Sidebar({ isOpen, onClose }: SidebarProps) {
	return (
		<aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
			<div className={styles.brand}>
				<span className={styles.brandName}>Face Attendance</span>
				<button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
					✕
				</button>
			</div>

			<nav className={styles.nav}>
				{navItems.map((item) => (
					<SidebarLink key={item.to} {...item} onNavigate={onClose} />
				))}
			</nav>
		</aside>
	);
}

function SidebarLink({
	to,
	label,
	onNavigate,
}: {
	to: string;
	label: string;
	onNavigate: () => void;
}) {

	return (
		<NavLink
			to={to}
			onClick={onNavigate}
			className={({ isActive }) =>
				isActive ? `${styles.link} ${styles.linkActive}` : styles.link
			}
		>
			{label}
		</NavLink>
	);
}

export default Sidebar;