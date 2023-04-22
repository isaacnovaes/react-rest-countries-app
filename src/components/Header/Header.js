import { Link } from 'react-router-dom';
import { useCountriesDispatch, useTheme } from '../../context/hooks';
import styles from './Header.module.scss';

export default function Header() {
    const theme = useTheme();
    const dispatch = useCountriesDispatch();

    const toggleThemeHandler = () => {
        dispatch({ type: 'toggle' });
    };

    const headerClasses = `${styles.Header} ${
        theme === 'dark' ? styles.HeaderDark : ''
    }`;

    return (
        <header className={headerClasses}>
            <nav className={styles.Nav}>
                <Link to='/countries'>Where in the world?</Link>
                <div
                    className={styles.ToggleThemeContainer}
                    onClick={toggleThemeHandler}
                >
                    <span className={styles.Icon} />
                    <span className={styles.ShowTheme}>
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                </div>
            </nav>
        </header>
    );
}
