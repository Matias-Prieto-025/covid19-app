import { AppState } from '../../types';

export const initialAppState: AppState = {
    isLoading: true,
    hasError: false,
    errorMessage: ''
} 

type SetLoading = {
    readonly type: 'SET_LOADING',
    readonly isLoading: boolean
}

type SetError = {
    readonly type: 'SET_ERROR',
    readonly error: {
        hasError: boolean,
        errorMessage: string
    }
}


export type ActionApp = SetLoading | SetError;
export type StateApp = AppState

export const appReducer = (state: AppState, action: ActionApp): StateApp => {

    switch(action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.isLoading }
        case 'SET_ERROR':
            return { ...state,  
                    hasError: action.error.hasError,
                    errorMessage: action.error.errorMessage
            }
        default: 
            return state;
    }
}