import { Summary } from '../../types';

export type StateSummary = { summary: Summary, error: string };

type SetSummary = {
    readonly type: 'SET_SUMMARY',
    readonly summary: Summary
}

type SetError = {
    readonly type: 'SET_ERROR',
    readonly error: string
}

export type ActionSummary = SetSummary | SetError;
 

export const initialSummaryState: StateSummary = {
    summary: {
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: undefined
    },
    error:''
}

export const summaryReducer = (state: StateSummary, action: ActionSummary): StateSummary => {
    switch(action.type) {
        case 'SET_SUMMARY':
            return { ...state, summary: action.summary}
        case 'SET_ERROR': 
            return { ...state, error: action.error}
        default:
            return state;

    }
} 
