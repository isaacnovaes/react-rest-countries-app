import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import NoDataFound from './components/NoDataFound/NoDataFound';
import { useCountriesDispatch, useTheme } from './context/hooks';
import { formatCountries } from './helpers/helperFunctions.js';
import Countries from './pages/Countries/Countries.js';
import Country from './pages/Country/Country.js';

function App() {
    const [fetchError, setFetchError] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    const theme = useTheme();
    const dispatch = useCountriesDispatch();

    const location = useLocation(); // routes animation

    const fetchCountries = useCallback(async () => {
        const request = await fetch(
            'https://restcountries.com/v3.1/all?fields=name,population,region,flags,capital,cca3,tld,languages,borders,currencies'
        );

        if (!request.ok) {
            setFetchError(true);
            return;
        }
        const data = await request.json();
        const allCountries = data.map(formatCountries);

        dispatch({ type: 'updateCountries', countries: allCountries });
        setInterval(() => setShowLoading(false), 2000);
    }, [dispatch]);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const appClasses = `${styles.App} ${
        theme === 'dark' ? styles.AppDark : ''
    }`;

    return (
        <div className={appClasses}>
            <Header />
            {fetchError ? (
                <NoDataFound type='fetch' />
            ) : (
                <main>
                    <AnimatePresence exitBeforeEnter initial={false}>
                        <Routes location={location} key={location.key}>
                            <Route
                                path='/'
                                element={<Navigate replace to='/countries' />}
                            />
                            <Route
                                path='/countries'
                                element={<Countries isLoading={showLoading} />}
                            />
                            <Route
                                path='/countries/:country'
                                element={<Country />}
                            />
                            <Route
                                path='/*'
                                element={<NoDataFound type='countries' />}
                            />
                        </Routes>
                    </AnimatePresence>
                </main>
            )}
        </div>
    );
}

export default App;
