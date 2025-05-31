import { watchCurrentWeatherSagaRequests } from './current-weather/saga.ts';
import { all, fork } from 'redux-saga/effects';
import { watchGeocodingSagaRequests } from '@store/geocoding/saga.ts';
import { watchGlobalSagaRequests } from '@store/global/saga.ts';
import { watchForecastSagaRequests } from '@store/forecast/saga.ts';
export default function* rootSaga() {
    yield all([
        fork(watchCurrentWeatherSagaRequests),
        fork(watchGeocodingSagaRequests),
        fork(watchGlobalSagaRequests),
        fork(watchForecastSagaRequests),
    ]);
}
