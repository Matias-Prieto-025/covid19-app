import moment from 'moment';

export interface AppState {
    isLoading: boolean,
    hasError: boolean,
    errorMessage: string
}

export interface SummaryResponse {
    confirmed: number,
    recovered: number,
    deaths: number,
    lastUpdate?: moment.Moment
}

export interface CountriesSummaryResponse extends SummaryResponse {
    iso3: string,
    active: number
}

export interface Country {
    name: string,
    iso2: string,
    iso3: string
}

export interface CountryReportItem extends SummaryResponse {
    region: string,
    state: string,
    country: string,
    lat: number,
    long: number
}

export interface DailyReportItem extends SummaryResponse{
    dayConfirmed: number
    day: string
}