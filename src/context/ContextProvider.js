import { useReducer, createContext } from 'react';

const initialState = {
    countries: [],
    theme: localStorage.getItem('theme') || 'light',
};

export const AppContext = createContext(null);
export const AppContextDispatch = createContext(null);

const appReducer = (state, action) => {
    switch (action.type) {
        case 'toggle': {
            const theme = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            return { ...state, theme };
        }
        case 'updateCountries':
            return { ...state, countries: action.countries };
        default:
            return new Error(
                `Something went wrong. ${action.type} is not handled by AppContext.`
            );
    }
};

export const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={state}>
            <AppContextDispatch.Provider value={dispatch}>
                {props.children}
            </AppContextDispatch.Provider>
        </AppContext.Provider>
    );
};
