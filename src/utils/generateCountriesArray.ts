import { Country, CountrySummary } from '../types';

export function generateCountriesArray(countriesSummary: Array<CountrySummary>): Array<Country> {

    const countries = countriesSummary.map( item => {
        return {
            name: item.name,
            iso2: item.iso2,
            iso3: item.iso3,
            flagImageUrl: item.flagImageUrl
        }
    });

    return countries;
}