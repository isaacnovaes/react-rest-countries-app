import React from "react";
import { Link } from "react-router-dom";

export default function BorderCountries({ borders, className }) {
	return (
		<>
			{borders.map(borderCountry => (
				<Link
					key={borderCountry}
					to={`/countries/${borderCountry.replaceAll(" ", "")}`}
					className={className}
				>
					{borderCountry}
				</Link>
			))}
		</>
	);
}
