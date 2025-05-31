import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    getAppSettings,
    getCurrentLocation,
    saveAppSettings,
} from '../../services/persist/persist.ts';
import { CurrentLocation } from '@models/weather-model.ts';
import { currentWeatherActions } from '@store/current-weather/slice.ts';
import { replace, reset } from '@navigation/navigation.service.ts';
import { globalActions, SetAppSettingsPayload } from '@store/global/slice.ts';
import { AppSettings } from '@models/global-model.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@store/types';
import Strings from '@constants/strings.ts';
import { ToastType } from '@components/Toast/config.ts';

function* instantiateApp() {
    const appSettings: AppSettings | null = yield call(getAppSettings);

    if (appSettings) {
        yield put(globalActions.setAppSettings(appSettings));
    }

    const currentLocation: CurrentLocation | null =
        yield call(getCurrentLocation);
    if (currentLocation) {
        yield put(currentWeatherActions.setCurrentLocation(currentLocation));
        yield call(replace, 'CurrentWeather');
    } else {
        yield call(replace, 'LocationSearch');
    }
}

function* triggerSaveAppSettings({
    payload,
}: PayloadAction<SetAppSettingsPayload>) {
    try {
        const { data, resetApp } = payload;
        const currentAppSettings: AppSettings = yield select(
            (rootState: RootState) => rootState.global.appSettings,
        );
        const newAppSettings = { ...currentAppSettings, ...data };

        const isSaveSuccess: boolean = yield call(
            saveAppSettings,
            newAppSettings,
        );

        if (!isSaveSuccess) {
            throw new Error(Strings.defaultErrorTitle);
        }

        yield put(globalActions.setAppSettings(newAppSettings));

        if (resetApp) {
            yield call(reset, 'Splash');
        }
    } catch {
        yield put(
            globalActions.setToastMessage({
                type: ToastType.error,
                message: Strings.defaultErrorSubtitle,
            }),
        );
    }
}

export function* watchGlobalSagaRequests() {
    yield takeLatest(globalActions.instantiateApp.type, instantiateApp);
    yield takeLatest(
        globalActions.triggerSaveAppSettings.type,
        triggerSaveAppSettings,
    );
}
