import { Country } from '../../types';

// Define initial State
type State = Array<Country>;
export const initialCountriesState: State = [];

// Define Action types
type SetCountries = {
    readonly type: 'SET_COUNTRIES',
    readonly countries: Array<Country>
}

type Action = SetCountries;


export const countriesReducer = (state: State, action: Action): State => {

    switch(action.type) {
        case 'SET_COUNTRIES':
            return [...state, ...action.countries];
        default:
            return state;
    }
}

