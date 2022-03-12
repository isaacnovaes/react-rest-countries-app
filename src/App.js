import React, { useState, useEffect, useContext, useCallback } from "react";
import styles from "./App.module.scss";
import appContext from "./context/app-context.js";
import Header from "./components/Header/Header";
import Countries from "./pages/Countries/Countries.js";
import Country from "./pages/Country/Country.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { formatCountries } from "./helpers/helperFunctions.js";
import NoDataFound from "./components/NoDataFound/NoDataFound";

function App() {
	const context = useContext(appContext);

	const [showLoading, setShowLoading] = useState(true);

	const { updateCountries } = useContext(appContext);

	const fetchCountries = useCallback(async () => {
		const request = await fetch("https://restcountries.com/v3.1/all");
		const data = await request.json();
		const allCountries = data.map(formatCountries);
		updateCountries(allCountries);
		setInterval(() => setShowLoading(false), 2000);
	}, [updateCountries]);

	useEffect(() => {
		fetchCountries();
	}, [fetchCountries]);

	// the useEffect hook has the fetchCountries dependency
	// however, fetchCountries is recreated in every render cycle
	// to avoid this performance issue, fetchCountries should be wrapped in the useCallback hook
	// this way, the fetchCountries is not recreated in every render cycle

	const appClasses = `${styles.App} ${
		context.theme === "dark" ? styles.AppDark : ""
	}`;

	return (
		<div className={appClasses}>
			<Header />
			<main>
				<Routes>
					<Route path="/" element={<Navigate replace to="/countries" />} />
					<Route
						path="/countries"
						element={<Countries isLoading={showLoading} />}
					/>
					<Route path="/countries/:country" element={<Country />} />
					<Route path="/*" element={<NoDataFound type="countries" />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
