import { useRef, useState } from 'react';
import { useTheme } from '../../context/hooks';
import styles from './SearchCountry.module.scss';

export default function SearchCountry({
    countrySearchFilter,
    regionSearchFilter,
    resetRegion,
}) {
    const [showCancelSearchButton, setShowCancelSearchButton] = useState(false);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showRegion, setShowRegion] = useState('');
    const [inputCountrySearch, setInputCountrySearch] = useState('');

    const theme = useTheme();

    const timeoutRef = useRef(null);

    const searchContainerClasses = `${styles.SearchContainer} ${
        theme === 'dark' ? styles.SearchContainerDark : ''
    } ${showDropDown ? styles.SearchContainerShowDropDown : ''}`;

    const cancelCountrySearchHandler = () => {
        countrySearchFilter('');
        setInputCountrySearch('');
        setShowCancelSearchButton(false);
    };

    const displayCancelSearchHandler = () => {
        setShowCancelSearchButton(true);
    };

    const countryFilterHandler = (e) => {
        clearTimeout(timeoutRef.current);
        const inputText = e.target.value;
        setInputCountrySearch(inputText);
        timeoutRef.current = setTimeout(() => {
            countrySearchFilter(inputText);
        }, 500);
    };

    const regionInputHandler = (e) => {
        if (e.target.innerText === 'Reset region filter') {
            setShowRegion('');
            resetRegion('');
            return;
        }
        regionSearchFilter(e.target.innerText);
        setShowRegion(e.target.innerText);
    };

    const showDropDownHandler = () => {
        setShowDropDown((prev) => !prev);
    };

    return (
        <div className={searchContainerClasses}>
            <div className={styles.textInputContainer}>
                <span className={styles.IconSearch} />
                <input
                    type='text'
                    value={inputCountrySearch}
                    placeholder='Search for a country...'
                    name='region'
                    onFocus={displayCancelSearchHandler}
                    onChange={countryFilterHandler}
                    autoComplete='off'
                />
                <span
                    className={`${styles.IconCancel} ${
                        showCancelSearchButton && styles.ShowCancelIcon
                    }`}
                    onClick={cancelCountrySearchHandler}
                />
            </div>

            <div
                className={styles.RegionInputContainer}
                onClick={showDropDownHandler}
            >
                <div className={styles.Region}>
                    <p>{`${showRegion || 'Filter by region'}`}</p>
                    <span className={styles.Icon} />
                </div>
                <div
                    className={styles.DropDownContainer}
                    onClick={regionInputHandler}
                >
                    <span>Africa</span>
                    <span>Americas</span>
                    <span>Asia</span>
                    <span>Europe</span>
                    <span>Oceania</span>
                    <span>Reset region filter</span>
                </div>
            </div>
        </div>
    );
}
