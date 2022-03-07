import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
	useEffect(() => {
		const fetchCountries = async () => {
			const request = await fetch("https://restcountries.com/v3.1/all");
			const data = await request.json();

			const allCountries = data.map(country => ({
				borders: country.borders,
				capital: country.capital,
				region: country.region,
				subRegion: country.subregion,
				currencies: country.currencies,
				languages: country.languages,
				flags: country.flags.svg,
				map: country.maps.googleMaps,
				name: country.name.common,
				nativeName: country.name.nativeName,
				population: country.population,
				tld: country.tld,
			}));

			console.log(data[0]);
		};

		fetchCountries();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
