import axios from 'axios';
import moment from 'moment';
import { CountrySummary, Summary } from '../types';

class Covid19Api {

    private baseUrl: string;

    constructor() {
        this.baseUrl = "https://corona.lmao.ninja";
    }

    private _formatDate(momentDate: moment.Moment): string {
        return moment(momentDate).format('MM-DD-YYYY HH:mm');
    }

    public async getGlobalSummary(): Promise<Summary> {

        const url = `${this.baseUrl}/all`;
        
        try {
            const axiosResponse = await axios.get(url);
            const summary: Summary = {
                confirmed: axiosResponse.data.cases,
                recovered: axiosResponse.data.recovered,
                deaths: axiosResponse.data.deaths,
                lastUpdate: this._formatDate(axiosResponse.data.updated)
            }
            return summary;
        } catch (error) {
            throw new Error("An error has occurred while fetching global summary.");
        }
    }

    public async getCountriesSummary(): Promise<Array<CountrySummary>> {
        
        const url = `${this.baseUrl}/countries`;
        
        try {
            const axiosResponse = await axios.get(url);
            const countriesSummarys = axiosResponse.data.map( (summary: any) => {
                return {
                    name: summary.country,
                    confirmed: summary.cases,
                    recovered: summary.recovered,
                    deaths: summary.deaths,
                    lastUpdate: this._formatDate(summary.updated),
                    active: summary.active,
                    iso2: summary.countryInfo.iso2,
                    iso3: summary.countryInfo.iso3,
                    flagImageUrl: summary.countryInfo.flag,
                }
            })
            return countriesSummarys;
        } catch (error) {
            throw new Error("An error has occurred while fetching countries summary.");
        }
    }
}

export default new Covid19Api();