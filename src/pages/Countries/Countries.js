import { motion } from 'framer-motion';
import { useState } from 'react';
import CountryHome from '../../components/CountryHome/CountryHome';
import Loading from '../../components/Loading/Loading';
import SearchCountry from '../../components/SearchCountry/SearchCountry.js';
import { useCountries } from '../../context/hooks';
import styles from './Countries.module.scss';

export default function Countries({ isLoading }) {
    const [countrySearch, setCountrySearch] = useState('');
    const [regionSearch, setRegionSearch] = useState('');

    const countries = useCountries();

    const countryFilterHandler = (filter) =>
        setCountrySearch(filter.toLowerCase());

    const regionFilterHandler = (filter) => setRegionSearch(filter);

    const showDefaultCountries = () =>
        countries
            .filter((country) => country.population > 50_000_000)
            .sort(
                (countryA, countryB) =>
                    countryB.population - countryA.population
            )
            .map((country) => (
                <CountryHome key={country.name} countryData={country} />
            ));

    const showFilteredCountries = (filterCountries) =>
        filterCountries.filter((country) =>
            country.name.toLowerCase().includes(countrySearch)
        );

    const showRegionFilteredCountries = (filterCountries) =>
        filterCountries.filter((country) => country.region === regionSearch);

    const displayFilter = () => {
        const hasCountrySearch = Boolean(countrySearch);
        const hasRegionSearch = Boolean(regionSearch);

        let countriesFilter = [];

        if (hasCountrySearch) {
            countriesFilter = showFilteredCountries(countries);
        }

        if (hasRegionSearch) {
            if (hasCountrySearch) {
                countriesFilter = showRegionFilteredCountries(countriesFilter);
            } else {
                countriesFilter = showRegionFilteredCountries(countries);
            }
        }

        if (hasCountrySearch || hasRegionSearch) {
            if (countriesFilter.length > 0) {
                return countriesFilter.map((country) => (
                    <CountryHome key={country.name} countryData={country} />
                ));
            }
            return <p className={styles.NoCountryFound}>No country found</p>;
        }
        return showDefaultCountries();
    };

    return (
        <motion.div
            className={styles.CountriesSection}
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100vw', opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <SearchCountry
                        countrySearchFilter={countryFilterHandler}
                        regionSearchFilter={regionFilterHandler}
                        resetRegion={setRegionSearch}
                    />
                    <div className={styles.Countries}>{displayFilter()}</div>
                </>
            )}
        </motion.div>
    );
}
