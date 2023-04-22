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

    const showCountries = () =>
        countries
            .filter((country) => country.population > 50_000_000)
            .sort(
                (countryA, countryB) =>
                    countryB.population - countryA.population
            )
            .map((country) => (
                <CountryHome key={country.name} countryData={country} />
            ));

    const showFilteredCountries = () => {
        const filteredCountries = countries.filter((country) =>
            country.name.toLowerCase().includes(countrySearch)
        );
        if (filteredCountries.length === 0) {
            return <p className={styles.NoCountryFound}>No country found</p>;
        }
        return filteredCountries.map((country) => (
            <CountryHome key={country.name} countryData={country} />
        ));
    };

    const showRegionFilteredCountries = () =>
        countries
            .filter((country) => country.region === regionSearch)
            .map((country) => (
                <CountryHome key={country.name} countryData={country} />
            ));

    const displayFilter = () => {
        if (countrySearch !== '' && !regionSearch)
            return showFilteredCountries();
        if (countrySearch === '' && regionSearch)
            return showRegionFilteredCountries();
        return showCountries();
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
