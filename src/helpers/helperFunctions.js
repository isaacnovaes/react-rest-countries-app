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
		languages.push("No official language");
		return languages;
	}

	for (const key in countryLanguageObject) {
		if (Object.hasOwnProperty.call(countryLanguageObject, key)) {
			if (countryLanguageObject) {
				languages.push(countryLanguageObject[key]);
			}
		}
	}

	return languages.join(", ");
};

const formatCurrencies = countryCurrencyObject => {
	let currencies = [];

	if (countryCurrencyObject === undefined) {
		currencies.push("No official currency");
		return currencies;
	}

	for (const key in countryCurrencyObject) {
		if (Object.hasOwnProperty.call(countryCurrencyObject, key)) {
			if (countryCurrencyObject) {
				currencies.push(countryCurrencyObject[key].name);
			}
		}
	}

	return currencies.join(", ");
};

const formatCountries = country => {
	const capital = country.capital ? country.capital[0] : "No capital";
	const tld = country.tld ? country.tld[0] : "No tld(top-level-domain)";
	const nativeName =
		formatNativeName(country.name.nativeName) || "No native name";
	const languages = formatLanguages(country.languages);
	const currencies = formatCurrencies(country.currencies);

	return {
		borders: country.borders,
		capital,
		region: country.region,
		subRegion: country.subregion || "No region",
		currencies,
		languages,
		flag: country.flags.svg,
		map: country.maps.googleMaps,
		name: country.name.common,
		nativeName,
		population: country.population,
		tld,
		code: country.cca3,
	};
};

export { formatCountries };
