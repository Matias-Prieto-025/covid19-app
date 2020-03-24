import axios, { AxiosResponse} from 'axios';
import moment  from 'moment';
import { SummaryResponse } from '../types';


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
            throw new Error("request error")
         }
    }
}

export default Covid19Api;