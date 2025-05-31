import store from './rootReducer';

export interface OnActionDoneParams<T> {
    onSuccess?: (data?: T) => void;
    onFailure?: (error?: string | Error) => void;
}

export interface GenericStoreData<T> {
    isLoading: boolean;
    data?: T | null;
    error?: Error | null | string;
}

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
