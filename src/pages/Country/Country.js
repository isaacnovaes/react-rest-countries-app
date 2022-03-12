import React, { useContext } from "react";
import styles from "./Country.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import appContext from "../../context/app-context";
import BorderCountries from "../../components/BorderCountries/BorderCountries";
import Loading from "../../components/Loading/Loading";
import NoDataFound from "../../components/NoDataFound/NoDataFound";

export default function Country() {
	const { country: countryName } = useParams();

	const { countries, theme } = useContext(appContext);

	const navigate = useNavigate();

	if (!countries.length) {
		return <Loading />;
	}

	const countryExist = countries
		.map(country => country.name)
		.includes(countryName);

	if (!countryExist) return <NoDataFound type="country" />;

	const country = countries.find(country => country.name === countryName);

	const borderCountriesCode = country.borders;

	const borderCountries = countries.reduce((result, country) => {
		if (borderCountriesCode.includes(country.code)) result.push(country.name);
		return result;
	}, []);

	const comeBackHandler = () => navigate(-1);

	const BackButtonContainerClasses = `${styles.BackButtonContainer} ${
		theme === "dark" ? styles.BackButtonContainerDark : ""
	}`;

	const CountryDetailContainerClasses = `${styles.CountryDetailContainer} ${
		theme === "dark" ? styles.CountryDetailContainerDark : ""
	}`;

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
					<div className={styles.CountryBorderContainer}>
						<p>
							{`Border ${
								country.borders.length > 1 ? "Countries:" : "Country:"
							}`}
							{country.borders.length === 0 && (
								<span className={styles.NoBorder}> No border</span>
							)}
						</p>

						{country.borders.length > 0 && (
							<div className={styles.BorderContainer}>
								<BorderCountries
									borders={borderCountries}
									className={styles.BorderCountry}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
