import { NavLink } from "react-router";
import styles from "./Sidebar.module.css";

const navItems = [
	{ to: "/dashboard", label: "Dashboard" },
	{ to: "/users", label: "Users" },
	{ to: "/departments", label: "Departments"},
	{ to: "/employees", label: "Employees" },
	{ to: "/roles", label: "Roles" },
	{ to: "/devices", label: "Devices" },
	{ to: "/attendance", label: "Attendance" },
	{ to: "/shifts", label: "Shifts" },
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
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 6L18 18M18 6L6 18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
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