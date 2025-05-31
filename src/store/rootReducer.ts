import { configureStore } from '@reduxjs/toolkit';
import currentWeatherReducer from './current-weather/slice';
import forecastReducer from './forecast/slice';
import geocodingReducer from './geocoding/slice';
import globalReducer from './global/slice';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '@store/rootSaga.ts';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
export function createStore() {
    const store = configureStore({
        reducer: {
            currentWeather: currentWeatherReducer,
            forecast: forecastReducer,
            geocoding: geocodingReducer,
            global: globalReducer,
        },

        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                thunk: false,
                serializableCheck: {
                    ignoredActionPaths: [
                        'payload.onSuccess',
                        'payload.onFailure',
                    ],
                },
            }).concat(middleware),
    });
    sagaMiddleware.run(rootSaga);
    return store;
}

let store = createStore();

export const getStore = () => {
    if (store) {
        return store;
    } else {
        store = createStore();
        return store;
    }
};

export default store;
