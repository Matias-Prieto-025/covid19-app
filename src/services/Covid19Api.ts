import axios, { AxiosResponse} from 'axios';
import moment  from 'moment';
import { Summary, CountriesSummary, Country, DailyReportItem } from '../types';

class Covid19Api {

    private baseUrl = "https://covid19.mathdro.id/api"

    private formatReportData(response: AxiosResponse): Summary {
        const { confirmed, recovered, deaths, lastUpdate } = response.data;

        return{
            confirmed: confirmed.value, 
            recovered: recovered.value, 
            deaths: deaths.value,
            lastUpdate: moment(lastUpdate)
        }
    }

    private formatCountriesSummaryData(data: Array<CountriesSummary>): Map<string,Summary> {

        const result = new Map();;
        
        data.forEach(item => {

            const { iso3, confirmed, recovered, deaths, active } = item;

            if (!iso3) {
                return;
            }

            if (!result.has(iso3)) {
                result.set(iso3, { iso3, confirmed, recovered, deaths, active });
            } else {
                const actualValue = result.get(iso3);
                actualValue.confirmed += confirmed;
                actualValue.recovered += recovered;
                actualValue.deaths += deaths;
                result.set(iso3, actualValue);
            }
        })

        return result;
    }

    public async globalSummary(): Promise<Summary> {

         try {
            const response: AxiosResponse = await axios.get(this.baseUrl);
            return this.formatReportData(response);
         } catch (error) {
            throw new Error("get summary report error")
         }
    }

    public async getCountries(): Promise<Array<Country>> {

        const url = '/countries';

        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}${url}`);
            const countries: Array<Country> = response.data.countries.filter((country: Country) => country.iso3);
            return countries;
        } catch (error) {
            throw new Error("get countries error")
        }
    }

    public async getCountriesSummary(): Promise<Map<string,Summary>> {

        const url = `${this.baseUrl}/confirmed`;

        try {
            const response: AxiosResponse = await axios.get(url);
            const result = this.formatCountriesSummaryData(response.data);
            return result;
        } catch (error) {
            throw new Error ('An error occurred while get summary by country')
        }
    }

/*     private async getCountrySummary(countryCode: string): Promise<Summary> {

        const url = `${this.baseUrl}/countries/${countryCode}`;
        try {
            const response: AxiosResponse = await axios.get(url)
            return this.formatReportData(response);
        } catch (error) {
            throw new Error("get countries report error")
        }
    } */





/*     public async summary(countryCode?: string): Promise<Summary> {

        if (!countryCode) {
            return await this.globalSummary();
        }
        return await this.getCountrySummary(countryCode);
    } */



    public async getDailyReport(): Promise<Array<DailyReportItem>> {

        const url = '/daily';

        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}${url}`);
            const result: Array<DailyReportItem> = response.data.map( (dailyReportItem: any) => {
                return {
                    confirmed: dailyReportItem.totalConfirmed,
                    recovered: dailyReportItem.recovered.total,
                    deaths: dailyReportItem.deaths.total,
                    dayConfirmed: dailyReportItem.deltaConfirmed,
                    day: dailyReportItem.reportDate
                }
            }).reverse();
            return result

        } catch (error) {
            throw new Error("get daily report error")
        }
    }
}

export default new Covid19Api();