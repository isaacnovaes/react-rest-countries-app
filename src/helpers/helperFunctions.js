//////////////////////////////////////////////////
// format countries API

const formatNativeName = nativeNameObject => {
	let nativeName;
	for (const key in nativeNameObject) {
		if (Object.hasOwnProperty.call(nativeNameObject, key)) {
			if (nativeNameObject[key]) nativeName = nativeNameObject[key].official;
			break;
		}
	}

	return nativeName;
};

const formatLanguages = countryLanguageObject => {
	let languages = [];

	if (countryLanguageObject === undefined) {
		languages.push("No language");
		return languages;
	}

	for (const key in countryLanguageObject) {
		if (Object.hasOwnProperty.call(countryLanguageObject, key)) {
			if (countryLanguageObject) {
				languages.push(countryLanguageObject[key]);
			}
		}
	}

	return languages;
};

const formatCountries = country => {
	const capital = country.capital ? country.capital[0] : "No capital";
	const tld = country.tld ? country.tld[0] : "No tld(top-level-domain)";
	let nativeName = formatNativeName(country.name.nativeName);
	let languages = formatLanguages(country.languages);

	return {
		borders: country.borders,
		capital,
		region: country.region,
		subRegion: country.subregion,
		currencies: country.currencies,
		languages,
		flag: country.flags.svg,
		map: country.maps.googleMaps,
		name: country.name.common,
		nativeName,
		population: country.population.toLocaleString(),
		tld,
	};
};

export { formatCountries };
