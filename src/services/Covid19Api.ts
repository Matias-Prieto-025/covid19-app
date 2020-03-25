import axios, { AxiosResponse} from 'axios';
import moment  from 'moment';
import { SummaryResponse, Country } from '../types';


class Covid19Api {

    private baseUrl = "https://covid19.mathdro.id/api"

    public async summary(): Promise<SummaryResponse> {

         try {
            const result: AxiosResponse = await axios.get(this.baseUrl);
            const { confirmed, recovered, deaths, lastUpdate } = result.data;

            const response = {
                confirmed: confirmed.value, 
                recovered: recovered.value, 
                deaths: deaths.value,
                lastUpdate: moment(lastUpdate)
            }

            return response;
            
         } catch (error) {
            throw new Error("get summary report error")
         }
    }

    public async getCountries(): Promise<Array<Country>> {

        const url = '/countries';

        try {
            const result: AxiosResponse = await axios.get(`${this.baseUrl}${url}`);
            return result.data.countries;

        } catch (error) {
            throw new Error("get countries error")
        }
    }
}

export default Covid19Api;