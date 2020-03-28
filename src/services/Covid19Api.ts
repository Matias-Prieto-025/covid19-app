import axios, { AxiosResponse} from 'axios';
import moment  from 'moment';
import { SummaryResponse, CountriesSummaryResponse, Country, DailyReportItem } from '../types';

class Covid19Api {

    private baseUrl = "https://covid19.mathdro.id/api"

    private formatReportData(response: AxiosResponse): SummaryResponse {
        const { confirmed, recovered, deaths, lastUpdate } = response.data;

        return{
            confirmed: confirmed.value, 
            recovered: recovered.value, 
            deaths: deaths.value,
            lastUpdate: moment(lastUpdate)
        }
    }

    private async globalSummary(): Promise<SummaryResponse> {

         try {
            const response: AxiosResponse = await axios.get(this.baseUrl);
            return this.formatReportData(response);
         } catch (error) {
            throw new Error("get summary report error")
         }
    }

    private async getCountrySummary(countryCode: string): Promise<SummaryResponse> {

        const url = `${this.baseUrl}/countries/${countryCode}`;
        try {
            const response: AxiosResponse = await axios.get(url)
            return this.formatReportData(response);
        } catch (error) {
            throw new Error("get countries report error")
        }
    }

    private parseCountriesSummaryData(data: Array<CountriesSummaryResponse>): Map<string,CountriesSummaryResponse> {

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
                actualValue.active += active;
                result.set(iso3, actualValue);
            }
        })

        return result;
    }

    private  async getCountriesSumary(): Promise<Map<string,CountriesSummaryResponse>> {

        const url = `${this.baseUrl}/confirmed`;

        try {
            const response: AxiosResponse = await axios.get(url);
            const result = this.parseCountriesSummaryData(response.data);
            console.log( result)
            return result;
        } catch (error) {
            throw new Error ('An error occurred while get summary by country')
        }

    }

    public async summary(countryCode?: string): Promise<SummaryResponse> {

        this.getCountriesSumary()
        if (!countryCode) {
            return await this.globalSummary();
        }
        return await this.getCountrySummary(countryCode);
    }

    public async getCountries(): Promise<Array<Country>> {

        const url = '/countries';

        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}${url}`);
            return response.data.countries.filter((country: Country) => country.iso3);

        } catch (error) {
            throw new Error("get countries error")
        }
    }

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