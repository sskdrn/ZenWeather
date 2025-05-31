import { call, put, select, takeLatest } from 'redux-saga/effects';
import { RootState } from '@store/types';
import { makeApiCall } from '@api/api.requestor.ts';
import { BaseUrls, urls } from '@api/api.constants.ts';
import {
    CurrentLocation,
    CurrentWeather,
    UnitsSystems,
    WeatherData,
} from '@models/weather-model.ts';
import { currentWeatherActions } from '@store/current-weather/slice.ts';
import { getWeatherType } from '@store/current-weather/helpers.ts';
import { WeatherStrings } from '@constants/strings.ts';
import { getErrorMessage } from '@utils/generic-util.ts';

function* getCurrentWeather() {
    try {
        const {
            currentLocation,
            unitsSystem,
        }: { currentLocation: CurrentLocation; unitsSystem: UnitsSystems } =
            yield select((rootState: RootState) => ({
                currentLocation: rootState.currentWeather.currentLocation,
                unitsSystem: rootState.global.appSettings.unitsSystem,
            }));
        const { coordinates, timeZone } = currentLocation;
        const { latitude, longitude } = coordinates ?? {};

        const response: WeatherData = yield call(makeApiCall, {
            baseUrl: BaseUrls.GoogleWeatherUrl,
            endpoint: urls.getCurrentWeatherUrl(),
            params: {
                'location.latitude': latitude,
                'location.longitude': longitude,
                unitsSystem,
            },
        });

        const {
            weatherCondition,
            wind,
            isDaytime,
            temperature,
            feelsLikeTemperature,
            currentConditionsHistory,
            relativeHumidity,
        } = response;

        const { type } = weatherCondition;
        const { maxTemperature, minTemperature } = currentConditionsHistory;

        const weatherType = getWeatherType(
            type,
            wind.speed.value,
            temperature.degrees,
            isDaytime,
            unitsSystem,
        );

        const weatherTitle = WeatherStrings[weatherType];

        const weatherInfo: CurrentWeather = {
            currentTemperature: temperature.degrees,
            feelsLikeTemperature: feelsLikeTemperature.degrees,
            humidity: relativeHumidity,
            maximumTemperature: maxTemperature.degrees,
            minimumTemperature: minTemperature.degrees,
            weather: weatherTitle,
            weatherType: weatherType,
            windSpeed: wind.speed.value,
            timezoneOffset: timeZone?.rawOffset ?? 0,
            unitsSystem,
        };

        yield put(currentWeatherActions.setCurrentWeatherSuccess(weatherInfo));
    } catch (error) {
        const errorMessage = getErrorMessage(error as Error);
        yield put(currentWeatherActions.setCurrentWeatherError(errorMessage));
    }
}

export function* watchCurrentWeatherSagaRequests() {
    yield takeLatest(
        currentWeatherActions.getCurrentWeather.type,
        getCurrentWeather,
    );
}
