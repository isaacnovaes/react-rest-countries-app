import React, { useContext } from "react";
import styles from "./App.module.scss";
import appContext from "./context/app-context.js";
import Header from "./components/Header/Header";
import Countries from "./pages/Countries/Countries.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { formatCountries } from "./helpers/helperFunctions.js";

function App() {
	const context = useContext(appContext);

	const { updateCountries } = useContext(appContext);

	const fetchCountries = async () => {
		const request = await fetch("https://restcountries.com/v3.1/all");
		const data = await request.json();
		const allCountries = data.map(formatCountries);
		updateCountries(allCountries);
	};
	
	fetchCountries();

	const appClasses = `${styles.App} ${
		context.theme === "dark" ? styles.AppDark : ""
	}`;

	return (
		<div className={appClasses}>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/countries" />} />
					<Route
						path="/countries"
						element={<Countries countries={context.countries} />}
					/>
				</Routes>
			</main>
		</div>
	);
}

export default App;
