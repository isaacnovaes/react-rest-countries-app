import styles from './NoDataFound.module.scss';

export default function NoDataFound({ type }) {
    if (type === 'fetch') {
        return (
            <h1 className={styles.NoCountryFound}>
                Error while fetching data. Go to the home page
            </h1>
        );
    }

    return (
        <h1 className={styles.NoCountryFound}>
            {`No ${type} found. Go to the home page`}
        </h1>
    );
}
