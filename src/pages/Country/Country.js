import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import BorderCountries from '../../components/BorderCountries/BorderCountries';
import Loading from '../../components/Loading/Loading';
import NoDataFound from '../../components/NoDataFound/NoDataFound';
import { useCountries, useTheme } from '../../context/hooks';
import styles from './Country.module.scss';

export default function Country() {
    const { country: countryName } = useParams();

    const theme = useTheme();
    const countries = useCountries();

    const navigate = useNavigate();

    if (!countries.length) {
        return <Loading />;
    }

    const countryExist = countries
        .map((country) => country.name.replaceAll(' ', ''))
        .includes(countryName);

    if (!countryExist) return <NoDataFound type='country' />;

    const country = countries.find(
        (country) => country.name.replaceAll(' ', '') === countryName
    );

    const borderCountriesCode = country.borders;

    const borderCountries = countries.reduce((result, country) => {
        if (borderCountriesCode.includes(country.code))
            result.push(country.name);
        return result;
    }, []);

    const comeBackHandler = () => navigate(-1);

    const BackButtonContainerClasses = `${styles.BackButtonContainer} ${
        theme === 'dark' ? styles.BackButtonContainerDark : ''
    }`;

    const CountryDetailContainerClasses = `${styles.CountryDetailContainer} ${
        theme === 'dark' ? styles.CountryDetailContainerDark : ''
    }`;

    return (
        <motion.div
            initial={{ x: '100vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100vw', opacity: 0 }}
            transition={{ duration: 0.4, type: 'spring', bounce: 0.3 }}
        >
            <div
                className={BackButtonContainerClasses}
                onClick={comeBackHandler}
            >
                <span className={styles.BackButtonIcon} />
                <button type='button' className={styles.BackButton}>
                    Back
                </button>
            </div>

            <div className={CountryDetailContainerClasses}>
                <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className={styles.CountryFlag}
                />
                <div className={styles.CountryInformationContainer}>
                    <div className={styles.CountryInformation}>
                        <div className={styles.MainInformation}>
                            <h1>{country.name}</h1>
                            <p>
                                <span>Native Name: </span>
                                {country.nativeName}
                            </p>
                            <p>
                                <span>Population: </span>
                                {country.population.toLocaleString()}
                            </p>
                            <p>
                                <span>Region: </span>
                                {country.region}
                            </p>
                            <p>
                                <span>Sub Region: </span>
                                {country.subRegion}
                            </p>
                            <p>
                                <span>Capital: </span>
                                {country.capital}
                            </p>
                        </div>
                        <div className={styles.AdditionalInformation}>
                            <h1>{country.name}</h1>
                            <p>
                                <span>Top Level Domain: </span>
                                {country.tld}
                            </p>
                            <p>
                                <span>
                                    {country.currencies.includes(',')
                                        ? 'Currencies: '
                                        : 'Currency: '}
                                </span>
                                {country.currencies}
                            </p>
                            <p>
                                <span>
                                    {country.languages.includes(',')
                                        ? 'Languages: '
                                        : 'Language: '}
                                </span>
                                {country.languages}
                            </p>
                        </div>
                    </div>
                    <div className={styles.CountryBorderContainer}>
                        <p>
                            {`Border ${
                                country.borders.length > 1
                                    ? 'Countries:'
                                    : 'Country:'
                            }`}
                            {country.borders.length === 0 && (
                                <span className={styles.NoBorder}>
                                    No border
                                </span>
                            )}
                        </p>

                        {country.borders.length > 0 && (
                            <div className={styles.BorderContainer}>
                                <BorderCountries
                                    borders={borderCountries}
                                    className={styles.BorderCountry}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
