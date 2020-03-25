import axios, { AxiosResponse} from 'axios';
import moment  from 'moment';
import { SummaryResponse, Country, DailyReportItem } from '../types';


class Covid19Api {

    private baseUrl = "https://covid19.mathdro.id/api"

    public async summary(): Promise<SummaryResponse> {

         try {
            const response: AxiosResponse = await axios.get(this.baseUrl);
            const { confirmed, recovered, deaths, lastUpdate } = response.data;

            const result = {
                confirmed: confirmed.value, 
                recovered: recovered.value, 
                deaths: deaths.value,
                lastUpdate: moment(lastUpdate)
            }

            return result;
            
         } catch (error) {
            throw new Error("get summary report error")
         }
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