import { Country, CountriesSummary, Summary } from '../../types';

// Define initial State
export type StateCountries = {
    countries: Array<Country>,
    countriesSummaries: Map<string,Summary>;
}

export const initialCountriesState: StateCountries = {
    countries: [],
    countriesSummaries: new Map()
}

// Define Action types
type SetCountries = {
    readonly type: 'SET_COUNTRIES',
    readonly countries: Array<Country>
}

type SetCountriesSummary = {
    readonly type: 'SET_SUMMARIES',
    readonly countriesSummary: Map<string, Summary>
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

