import { Country, CountrySummary } from '../../types';

// Define initial State
export type StateCountries = {
    countries: Array<Country>,
    countriesSummaries: Array<CountrySummary>;
}

export const initialCountriesState: StateCountries = {
    countries: [],
    countriesSummaries: []
}

// Define Action types
type SetCountries = {
    readonly type: 'SET_COUNTRIES',
    readonly countries: Array<Country>
}

type SetCountriesSummary = {
    readonly type: 'SET_SUMMARIES',
    readonly countriesSummary: Array<CountrySummary>
}

type Action = SetCountries | SetCountriesSummary;


export const countriesReducer = (state: StateCountries, action: Action): StateCountries => {

    switch(action.type) {
        case 'SET_COUNTRIES':
            return {...state, countries: action.countries};
        case 'SET_SUMMARIES':
            return{...state, countriesSummaries: action.countriesSummary}
        default:
            return state;
    }
}

