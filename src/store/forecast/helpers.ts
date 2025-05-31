import {
    ForecastedWeatherResponse,
    ParsedWeatherForecast,
    UnitsSystems,
} from '@models/weather-model.ts';
import {
    getFormattedShortDateString,
    getFormattedTimeString,
} from '@utils/date-util.ts';
import { getWeatherType } from '@store/current-weather/helpers.ts';

export const getParsedWeatherForecastList = (
    weatherForecastResponse: ForecastedWeatherResponse,
    unitsSystem: UnitsSystems,
): ParsedWeatherForecast[] => {
    const { forecastHours } = weatherForecastResponse;
    return forecastHours.map(weatherForecastItem => {
        const {
            weatherCondition,
            wind,
            isDaytime,
            temperature,
            displayDateTime,
        } = weatherForecastItem;

        const { type } = weatherCondition;
        const { year, month, day, hours, minutes, seconds, nanos } =
            displayDateTime;

        const weatherType = getWeatherType(
            type,
            wind.speed.value,
            temperature.degrees,
            isDaytime,
            unitsSystem,
        );

        const date = new Date(
            year,
            month - 1,
            day,
            hours,
            minutes,
            seconds,
            nanos / 1e6,
        );

        const dateText = getFormattedShortDateString(date);
        const timeText = getFormattedTimeString(date);

        return {
            dateText,
            timeText,
            weatherType,
            temperature: temperature.degrees,
        };
    });
};

export const getWeatherForecastElementKey = (item: ParsedWeatherForecast) =>
    `${item.dateText}-${item.timeText}`;
