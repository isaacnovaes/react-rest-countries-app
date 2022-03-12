import React from "react";
import styles from "./NoDataFound.module.scss";

export default function NoDataFound({ type }) {
	return (
		<h1 className={styles.NoCountryFound}>
			{`No ${type} found. Go to the home page`}
		</h1>
	);
}
