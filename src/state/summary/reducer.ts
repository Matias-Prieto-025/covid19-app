import { SummaryResponse } from '../../types';

export type State = { summary: SummaryResponse, error: string };

type SetSummary = {
    readonly type: 'SET_SUMMARY',
    readonly summary: SummaryResponse
}

type SetError = {
    readonly type: 'SET_ERROR',
    readonly error: string
}

export type Action = SetSummary | SetError;
 

export const initialSummaryState: State = {
    summary: {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: undefined
    },
    error:''
}

export const summaryReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'SET_SUMMARY':
            return { ...state, summary: action.summary}
        case 'SET_ERROR': 
            return { ...state, error: action.error}
        default:
            return state;

    }
} 
