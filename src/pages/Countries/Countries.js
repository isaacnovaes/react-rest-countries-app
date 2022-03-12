import React, { useContext, useState } from "react";
import styles from "./Countries.module.scss";
import CountryHome from "../../components/CountryHome/CountryHome";
import SearchCountry from "../../components/SeachCountry/SearchCountry";
import Loading from "../../components/Loading/Loading";
import appContext from "../../context/app-context";

export default function Countries({ isLoading }) {
	const [countrySearch, setCountrySearch] = useState("");
	const [regionSearch, setRegionSearch] = useState("");

	const { countries } = useContext(appContext);

	const countryFilterHandler = filter => setCountrySearch(filter.toLowerCase());
	const regionFilterHandler = filter => setRegionSearch(filter);

	const showCountries = () =>
		countries
			.filter(country => country.population > 50_000_000)
			.sort((countryA, countryB) => countryB.population - countryA.population)
			.map(country => <CountryHome key={country.name} countryData={country} />);

	const showFilteredCountries = () =>
		countries
			.filter(country => country.name.toLowerCase().includes(countrySearch))
			.map(country => <CountryHome key={country.name} countryData={country} />);

	const showRegionFilteredCountries = () =>
		countries
			.filter(country => country.region === regionSearch)
			.map(country => <CountryHome key={country.name} countryData={country} />);

	const displayFilter = () => {
		if (countrySearch !== "" && !regionSearch) return showFilteredCountries();
		if (countrySearch === "" && regionSearch)
			return showRegionFilteredCountries();
		return showCountries();
	};

	return (
		<div className={styles.CountriesSection}>
			{isLoading && <Loading />}
			{!isLoading && (
				<>
					<SearchCountry
						countrySearchFilter={countryFilterHandler}
						regionSearchFilter={regionFilterHandler}
						resetRegion={setRegionSearch}
					/>
					<div className={styles.Countries}>{displayFilter()}</div>
				</>
			)}
		</div>
	);
}
