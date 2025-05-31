import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastType } from '@components/Toast/config.ts';
import { AppSettings } from '@models/global-model.ts';
import { UnitsSystems } from '@models/weather-model.ts';

interface ToastState {
    message?: string | null;
    type?: ToastType | null;
}

export type ToastParams = Required<ToastState>;

const initialToastState = {
    message: null,
    type: null,
};

const initialAppSettings = {
    unitsSystem: UnitsSystems.Metric,
};

interface GlobalState {
    toast: ToastState;
    appSettings: AppSettings;
}
const initialState: GlobalState = {
    toast: initialToastState,
    appSettings: initialAppSettings,
};

export interface SetAppSettingsPayload {
    data: Partial<AppSettings>;
    resetApp?: boolean;
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setToastMessage: (state, action: PayloadAction<ToastParams>) => {
            state.toast = action.payload;
        },
        clearToastMessage: state => {
            state.toast = initialToastState;
        },
        instantiateApp: () => {},

        triggerSaveAppSettings: {
            reducer: () => {},
            prepare: (payload: SetAppSettingsPayload) => {
                return {
                    payload,
                };
            },
        },

        setAppSettings: (state, action: PayloadAction<AppSettings>) => {
            state.appSettings = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const globalActions = globalSlice.actions;

export default globalSlice.reducer;
