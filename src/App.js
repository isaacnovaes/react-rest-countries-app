import React, { useState, useEffect, useContext } from "react";
import styles from "./App.module.scss";
import appContext from "./context/app-context.js";
import Header from "./components/Header/Header";
import Countries from "./pages/Countries/Countries.js";
import Country from "./pages/Country/Country.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { formatCountries } from "./helpers/helperFunctions.js";
import NoDataFound from "./components/NoDataFound/NoDataFound";

function App() {
	const [fetchError, setFetchError] = useState(false);

	const context = useContext(appContext);

	const [showLoading, setShowLoading] = useState(true);

	const { updateCountries } = useContext(appContext);

	const fetchCountries = async () => {
		const request = await fetch("https://restcountries.com/v3.1/all");

		if (!request.ok) {
			setFetchError(true);
			return;
		}
		const data = await request.json();
		const allCountries = data.map(formatCountries);
		updateCountries(allCountries);
		setInterval(() => setShowLoading(false), 2000);
	};

	useEffect(() => {
		fetchCountries();
	}, []);

	const appClasses = `${styles.App} ${
		context.theme === "dark" ? styles.AppDark : ""
	}`;

	return (
		<div className={appClasses}>
			<Header />
			{fetchError && <NoDataFound type="fetch" />}

			{!fetchError && (
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
			)}
		</div>
	);
}

export default App;
