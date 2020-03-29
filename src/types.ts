import moment from 'moment';

export interface AppState {
    isLoading: boolean,
    hasError: boolean,
    errorMessage: string
}

export interface Summary {
    confirmed: number,
    recovered: number,
    deaths: number,
    lastUpdate?: moment.Moment
}

export interface CountriesSummary extends Summary {
    iso3: string,
    active: number
}

export interface Country {
    name: string,
    iso2: string,
    iso3: string
}

export interface CountryReportItem extends Summary {
    region: string,
    state: string,
    country: string,
    lat: number,
    long: number
}

export interface DailyReportItem extends Summary{
    dayConfirmed: number
    day: string
}