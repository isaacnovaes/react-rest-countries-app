import { useContext } from 'react';
import { AppContextDispatch, AppContext } from './ContextProvider';

export const useCountries = () => {
    const { countries } = useContext(AppContext);
    return countries;
};

export const useTheme = () => {
    const { theme } = useContext(AppContext);
    return theme;
};

export const useCountriesDispatch = () => {
    const dispatch = useContext(AppContextDispatch);
    return dispatch;
};
