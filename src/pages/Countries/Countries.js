import React from "react";
import styles from "./Countries.module.scss";
import CountryHome from "../../components/CountryHome/CountryHome";

export default function Countries({ countries }) {
	const showCountries = countries
		.filter((_, index) => index < 10)
		.map(country => <CountryHome key={country.name} countryData={country} />);

	return <div className={styles.Countries}>{showCountries}</div>;
}
