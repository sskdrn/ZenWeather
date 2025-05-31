import CurrentWeatherView from '@pages/CurrentWeather/CurrentWeatherView.tsx';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { currentWeatherActions } from '@store/current-weather/slice.ts';

import { navigate, replace } from '@navigation/navigation.service.ts';
import { forecastActions } from '@store/forecast/slice.ts';
import { RootStackParamsList } from '@navigation/navigation';
import Strings from '@constants/strings.ts';

function CurrentWeather() {
    const currentWeather = useSelector(
        (rootState: RootState) => rootState.currentWeather,
    );

    const { currentLocation, weatherInfo } = currentWeather || {};
    const { isLoading, data, error: weatherInfoError } = weatherInfo;
    const { locationName, timeZone } = currentLocation;

    const dispatch = useDispatch();

    const goToScreen = useCallback(
        (screen: keyof RootStackParamsList) => () => {
            navigate(screen);
        },
        [],
    );

    const fetchCurrentWeather = useCallback(() => {
        dispatch(currentWeatherActions.getCurrentWeather());
    }, []);

    const forecastModalOpenHandler = useCallback(() => {
        dispatch(forecastActions.getWeatherForecast());
        navigate('WeatherForecastModal');
    }, []);

    useEffect(() => {
        fetchCurrentWeather();
    }, [fetchCurrentWeather]);

    const retryHandler = useCallback(() => {
        if (weatherInfoError === Strings.locationNotSupportedErrorMessage) {
            replace('LocationSearch');
        } else {
            fetchCurrentWeather();
        }
    }, [fetchCurrentWeather, weatherInfoError]);

    return (
        <CurrentWeatherView
            isLoading={isLoading}
            data={data}
            errorMessage={weatherInfoError as string}
            timeZone={timeZone}
            retryHandler={retryHandler}
            currentLocationName={locationName}
            onLocationButtonPress={goToScreen('LocationSearch')}
            onSettingsButtonPress={goToScreen('SettingsList')}
            openWeatherForecastModal={forecastModalOpenHandler}
        />
    );
}

export default React.memo(CurrentWeather);
