import { useTheme } from '../../context/hooks';
import styles from './Loading.module.scss';

export default function Loading() {
    const theme = useTheme();

    const loadingClasses = `${styles.ldsRoller} ${
        theme === 'dark' ? styles.ldsRollerDark : ''
    }`;

    return (
        <div className={loadingClasses}>
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
        </div>
    );
}
