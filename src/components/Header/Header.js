import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import appContext from "../../context/app-context";

export default function Header() {
	const context = useContext(appContext);

	const toggleThemeHandler = () => context.toggleTheme();

	const headerClasses = `${styles.Header} ${
		context.theme === "dark" ? styles.HeaderDark : ""
	}`;

	return (
		<header className={headerClasses}>
			<nav className={styles.Nav}>
				<Link to="/countries">Where in the world?</Link>
				<div
					className={styles.ToggleThemeContainer}
					onClick={toggleThemeHandler}
				>
					<span className={styles.Icon}></span>
					<span className={styles.ShowTheme}>
						{context.theme === "dark" ? "Light Mode" : "Dark Mode"}
					</span>
				</div>
			</nav>
		</header>
	);
}
