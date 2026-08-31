import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../features/auth/AuthContext";

import styles from "./Topbar.module.css";

import MenuButton from "../../../components/MenuButton/MenuButton";

import { useLogout } from "../../../features/auth/hooks/useLogout";

type TopbarProps = {
	onSidebarClick: () => void;
};
function Topbar({ onSidebarClick }: TopbarProps) {
	const { user } = useAuth();
	const logout = useLogout();
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef(null);

	const initials = user?.full_name?.split(" ")
			.map((part) => part[0])
			.join("")
			.slice(0, 2)
			.toUpperCase() ||
		user?.email?.charAt(0)?.toUpperCase() || "U";

	useEffect(() => {
		function handleClickOutside(event) {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className={styles.topbar}>
			<button
				className={styles.sidebarButton}
				onClick={onSidebarClick}
				aria-label="Open sidebar"
			>
				<span className={styles.burgerLine} />
				<span className={styles.burgerLine} />
				<span className={styles.burgerLine} />
			</button>

			<div className={styles.spacer} />

			<div className={styles.userMenu} ref={menuRef}>
				<button
                    className={styles.avatarButton}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Open user menu"
                    aria-expanded={menuOpen}
                >
                    <span className={styles.avatar}>{initials}</span>

                    <svg
                        className={`${styles.chevron} ${
                            menuOpen ? styles.chevronOpen : ""
                        }`}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className={styles.dropdown}>
                        <div className={styles.userDetails}>
                            <div className={styles.dropdownAvatar}>{initials}</div>

                            <div className={styles.userInfo}>
                                <span className={styles.userEmail}>
                                    {user?.email}
                                </span>

                                {user?.role?.name && (
                                    <span className={styles.userRole}>
                                        {user.role.name.replace("_", " ")}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.divider} />
                        <MenuButton 
                            text="Profile"
                            svg={<svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M20 21a8 8 0 0 0-16 0" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>}
                        />

                        <MenuButton 
                            text="Settings"
                            svg={<svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.15.38.2.8.14 1.2H21a2 2 0 1 1 0 4h-1.46c.06.4.01.82-.14 1.2Z" />
                            </svg>}
                        />

                        <div className={styles.divider} />
                            
                        <MenuButton 
                            text="Log out"
                            className={styles.logoutItem}
                            onClick={() => logout.mutate()}
                            svg={
                                <svg
                                width="17"
                                height="17"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>}
                        />
                    </div>
                )}
			</div>
		</header>
	);
}

export default Topbar;