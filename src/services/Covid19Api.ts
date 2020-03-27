import axios, { AxiosResponse} from 'axios';
import moment  from 'moment';
import { SummaryResponse, Country, CountryReportItem,DailyReportItem } from '../types';

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

    public async summary(countryCode?: string): Promise<SummaryResponse> {

        if (!countryCode) {
            return await this.globalSummary();
        }
        return await this.getCountrySummary(countryCode);
    }

    public async getCountries(): Promise<Array<Country>> {

        const url = '/countries';

        try {
            const response: AxiosResponse = await axios.get(`${this.baseUrl}${url}`);
            return response.data.countries;

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