import React, { useReducer } from "react";
import appContext from "./app-context";

const reducer = (state, action) => {
	switch (action.type) {
		case "toggle":
			return { ...state, theme: state.theme === "dark" ? "light" : "dark" };
		case "updateCountries":
			return { ...state, countries: action.countries };
		default:
			return new Error("Something went wrong");
	}
};

const ContextProvider = props => {
	const initialState = {
		countries: [],
		theme: "dark",
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const data = {
		countries: state.countries,
		theme: state.theme,
		toggleTheme: () => dispatch({ type: "toggle" }),
		updateCountries: countries =>
			dispatch({ type: "updateCountries", countries }),
	};

	return (
		<appContext.Provider value={data}>{props.children}</appContext.Provider>
	);
};

export default ContextProvider;
