import { Link } from 'react-router-dom';
import { useTheme } from '../../context/hooks';
import { motion } from 'framer-motion';
import styles from './CountryHome.module.scss';

export default function CountryHome({ countryData }) {
    const theme = useTheme();

    const countryHomeClasses = `${styles.CountryHome} ${
        theme === 'dark' ? styles.CountryHomeDark : ''
    }`;

    return (
        <motion.div layout>
            <Link
                to={`/countries/${countryData.name.replaceAll(' ', '')}`}
                className={countryHomeClasses}
            >
                <img src={countryData.flag} alt={`${countryData.name} flag`} />
                <div className={styles.CountryDetails}>
                    <h1>{countryData.name}</h1>
                    <div className={styles.Details}>
                        <span className={styles.Detail}>
                            <span className={styles.DetailBold}>
                                Population:{' '}
                            </span>
                            {countryData.population.toLocaleString()}
                        </span>
                        <span className={styles.Detail}>
                            <span className={styles.DetailBold}>Region: </span>
                            {countryData.region}
                        </span>
                        <span className={styles.Detail}>
                            <span className={styles.DetailBold}>Capital: </span>
                            {countryData.capital}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
