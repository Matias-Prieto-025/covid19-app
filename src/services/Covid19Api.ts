import axios, { AxiosResponse} from 'axios';
import { SummaryResponse } from '../types';



class Covid19Api {

    private baseUrl = "https://covid19.mathdro.id/api"

    public async summary(): Promise<SummaryResponse> {

         try {
            const result: AxiosResponse = await axios.get(this.baseUrl);
            const { confirmed, recovered, deaths } = result.data;

            const response = {
                confirmed, recovered, deaths
            }
            return response;
            
         } catch (error) {
            throw new Error("request error")
         }
    }
}

export default Covid19Api;