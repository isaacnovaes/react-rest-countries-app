import React, { useContext } from "react";
import styles from "./CountryHome.module.scss";
import { Link } from "react-router-dom";
import appContext from "../../context/app-context";

export default function CountryHome({ countryData }) {
	const context = useContext(appContext);

	const countryHomeClasses = `${styles.CountryHome} ${
		context.theme === "dark" ? styles.CountryHomeDark : ""
	}`;

	return (
		<Link to={`/country/:${countryData.name}`} className={countryHomeClasses}>
			<img src={countryData.flag} alt={`${countryData.name} flag`} />
			<div className={styles.CountryDetails}>
				<h1>{countryData.name}</h1>
				<div className={styles.Details}>
					<span className={styles.Detail}>
						<span className={styles.DetailBold}>Population: </span>
						{countryData.population}
					</span>
					<span className={styles.Detail}>
						<span className={styles.DetailBold}>Region: </span>
						{countryData.region}
					</span>
					<span className={styles.Detail}>
						<span className={styles.DetailBold}>Capital: </span>
						{countryData.capital}
					</span>
				</div>
			</div>
		</Link>
	);
}
