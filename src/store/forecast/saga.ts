import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from '@store/types';
import { makeApiCall } from '@api/api.requestor.ts';
import { BaseUrls, urls } from '@api/api.constants.ts';
import {
    Coordinates,
    ForecastedWeatherResponse,
    UnitsSystems,
} from '@models/weather-model.ts';

import { getParsedWeatherForecastList } from '@store/forecast/helpers.ts';
import { forecastActions } from '@store/forecast/slice.ts';
import { getErrorMessage } from '@utils/generic-util.ts';

function* getWeatherForecast() {
    try {
        const {
            coordinates,
            unitsSystem,
        }: { coordinates: Coordinates; unitsSystem: UnitsSystems } =
            yield select((rootState: RootState) => ({
                coordinates:
                    rootState.currentWeather.currentLocation.coordinates,
                unitsSystem: rootState.global.appSettings.unitsSystem,
            }));

        const { latitude, longitude } = coordinates;

        const response: ForecastedWeatherResponse = yield call(makeApiCall, {
            baseUrl: BaseUrls.GoogleWeatherUrl,
            endpoint: urls.getForecastUrl(),
            params: {
                'location.latitude': latitude,
                'location.longitude': longitude,
                hours: 13,
                unitsSystem,
            },
        });

        const parsedList = getParsedWeatherForecastList(response, unitsSystem);

        yield put(
            forecastActions.setWeatherForecastSuccess({ forecast: parsedList }),
        );
    } catch (error) {
        const errorMessage = getErrorMessage(error as Error);
        yield put(forecastActions.setWeatherForecastError(errorMessage));
    }
}

export function* watchForecastSagaRequests() {
    yield takeLatest(
        forecastActions.getWeatherForecast.type,
        getWeatherForecast,
    );
}
