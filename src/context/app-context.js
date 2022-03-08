import React from "react";

const appContext = React.createContext({
	countries: [],
	theme: "dark",
	toggleTheme: item => {},
	updateCountries: item => {},
});

export default appContext;
