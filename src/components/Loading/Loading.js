import React, { useContext } from "react";
import appContext from "../../context/app-context";
import styles from "./Loading.module.scss";

export default function Loading() {
	const { theme } = useContext(appContext);

	const loadingClasses = `${styles.ldsRoller} ${
		theme === "dark" ? styles.ldsRollerDark : ""
	}`;

	return (
		<div className={loadingClasses}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
