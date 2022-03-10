import React, { useContext } from "react";
import styles from "./Country.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import appContext from "../../context/app-context";

export default function Country() {
	const { country: countryName } = useParams();

	const navigate = useNavigate();

	const { countries, theme } = useContext(appContext);

	const country = countries.find(country => country.name === countryName);

	const comeBackHandler = () => navigate(-1);

	const BackButtonContainerClasses = `${styles.BackButtonContainer} ${
		theme === "dark" ? styles.BackButtonContainerDark : ""
	}`;

	const CountryDetailContainerClasses = `${styles.CountryDetailContainer} ${
		theme === "dark" ? styles.CountryDetailContainerDark : ""
	}`;

	if (!country) {
		return <h1>Country not found</h1>;
	}

	return (
		<>
			<div className={BackButtonContainerClasses} onClick={comeBackHandler}>
				<span className={styles.BackButtonIcon}></span>
				<button type="button" className={styles.BackButton}>
					Back
				</button>
			</div>

			<div className={CountryDetailContainerClasses}>
				<img
					src={country.flag}
					alt={`${country.name} flag`}
					className={styles.CountryFlag}
				/>
				<div className={styles.CountryInformationContainer}>
					<div className={styles.CountryInformation}>
						<div className={styles.MainInformation}>
							<h1>{country.name}</h1>
							<p>
								<span>Native Name: </span>
								{country.nativeName}
							</p>
							<p>
								<span>Population: </span>
								{country.population.toLocaleString()}
							</p>
							<p>
								<span>Region: </span>
								{country.region}
							</p>
							<p>
								<span>Sub Region: </span>
								{country.subRegion}
							</p>
							<p>
								<span>Capital: </span>
								{country.capital}
							</p>
						</div>
						<div className={styles.AdditionalInformation}>
							<h1>{country.name}</h1>
							<p>
								<span>Top Level Domain: </span>
								{country.tld}
							</p>
							<p>
								<span>
									{country.currencies.includes(",")
										? "Currencies: "
										: "Currency: "}
								</span>
								{country.currencies}
							</p>
							<p>
								<span>
									{country.languages.includes(",")
										? "Languages: "
										: "Language: "}
								</span>
								{country.languages}
							</p>
						</div>
					</div>
					<div className={styles.CountryBorderContainer}></div>
				</div>
			</div>
		</>
	);
}
