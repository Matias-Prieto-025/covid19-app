import moment from 'moment';

export interface SummaryResponse {
    confirmed: number,
    recovered: number,
    deaths: number,
    lastUpdate?: moment.Moment
}