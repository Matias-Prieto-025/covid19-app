export interface AppState {
    isLoading: boolean,
    hasError: boolean,
    errorMessage: string
}

export interface Summary {
    confirmed: number,
    recovered: number,
    deaths: number,
    lastUpdate?: string
}

export interface CountrySummary extends Summary, Country {
    active: number
}

export interface Country {
    name: string,
    iso2: string,
    iso3: string,
    flagImageUrl?: string
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