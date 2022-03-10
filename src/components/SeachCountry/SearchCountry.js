import React, { useContext, useRef, useState } from "react";
import styles from "./SearchCountry.module.scss";
import appContext from "../../context/app-context.js";

export default function SearchCountry({
	countrySearchFilter,
	regionSearchFilter,
	resetRegion,
}) {
	const [showCancelSearchButton, setShowCancelSearchButton] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const [showRegion, setShowRegion] = useState("");

	const context = useContext(appContext);
	const inputTextRef = useRef();

	const searchContainerClasses = `${styles.SearchContainer} ${
		context.theme === "dark" ? styles.SearchContainerDark : ""
	} ${showDropDown ? styles.SearchContainerShowDropDown : ""}`;

	const cancelCountrySearchHandler = () => {
		countrySearchFilter("");
		inputTextRef.current.value = "";
		setShowCancelSearchButton(false);
	};

	const displayCancelSearchHandler = () => {
		setShowCancelSearchButton(true);
		setShowRegion("");
		resetRegion("");
	};

	const countryFilterHandler = () =>
		countrySearchFilter(inputTextRef.current.value);

	const regionInputHandler = e => {
		regionSearchFilter(e.target.innerText);
		setShowRegion(e.target.innerText);
	};

	const showDropDownHandler = () => {
		countrySearchFilter("");
		setShowDropDown(prev => !prev);
	};

	return (
		<div className={searchContainerClasses}>
			<div className={styles.textInputContainer}>
				<span className={styles.IconSearch}></span>
				<input
					type="text"
					placeholder="Search for a country..."
					name="region"
					onKeyUp={countryFilterHandler}
					onFocus={displayCancelSearchHandler}
					ref={inputTextRef}
					autoComplete="off"
				/>
				<span
					className={`${styles.IconCancel} ${
						showCancelSearchButton && styles.ShowCancelIcon
					}`}
					onClick={cancelCountrySearchHandler}
				></span>
			</div>

			<div
				className={styles.RegionInputContainer}
				onClick={showDropDownHandler}
			>
				<div className={styles.Region}>
					<p>{`${showRegion ? showRegion : "Filter by region"}`}</p>
					<span className={styles.Icon}></span>
				</div>
				<div className={styles.DropDownContainer} onClick={regionInputHandler}>
					<span>Africa</span>
					<span>Americas</span>
					<span>Asia</span>
					<span>Europe</span>
					<span>Oceania</span>
				</div>
			</div>
		</div>
	);
}
