import { useSelector } from 'react-redux';
import { RootState } from '@store/types';
import { WeatherSpecificColors, WeatherType } from '@styles/colors.ts';
import { useEffect, useState } from 'react';

export default function useWeatherColorScheme() {
    const [currentWeatherType, setCurrentWeatherType] =
        useState<WeatherType>('undefined');

    const weatherType = useSelector(
        (rootState: RootState) =>
            rootState?.currentWeather?.weatherInfo?.data?.weatherType ??
            'undefined',
    );
    useEffect(() => {
        if (weatherType && weatherType !== 'undefined') {
            setCurrentWeatherType(weatherType);
        }
    }, [weatherType]);
    return WeatherSpecificColors[currentWeatherType];
}
