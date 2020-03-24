export interface SummaryResponse {
    confirmed: SummaryResponseItem,
    recovered: SummaryResponseItem,
    deaths: SummaryResponseItem,
}

export interface SummaryResponseItem {
    value: number,
    detail: string
}
