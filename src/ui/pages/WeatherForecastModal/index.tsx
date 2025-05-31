import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forecastActions } from '@store/forecast/slice.ts';
import { RootState } from '@store/types';
import WeatherForecastModalView from '@pages/WeatherForecastModal/WeatherForecastModalView.tsx';

export function WeatherForecastModal() {
    const dispatch = useDispatch();

    const {
        isLoading: isForecastLoading,
        data: forecastData,
        error: forecastError,
    } = useSelector((rootState: RootState) => rootState.forecast);

    const unitsSystem = useSelector(
        (rootState: RootState) => rootState.global.appSettings.unitsSystem,
    );

    const retryHandler = useCallback(() => {
        dispatch(forecastActions.getWeatherForecast());
    }, []);

    return (
        <WeatherForecastModalView
            forecastList={forecastData?.forecast ?? []}
            errorMessage={forecastError as string}
            unitsSystem={unitsSystem}
            isLoading={isForecastLoading}
            retryHandler={retryHandler}
        />
    );
}

export default WeatherForecastModal;
