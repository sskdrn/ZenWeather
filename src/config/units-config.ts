import { UnitsSystems } from '@models/weather-model.ts';

export enum TemperatureUnits {
    Fahrenheit = '°F',
    Celsius = '°C',
    Kelvin = 'K',
}

export enum WindSpeedUnits {
    KilometersPerHour = 'km/h',
    MilesPerHour = 'mph',
}

export const TemperatureUnitsMap: Record<UnitsSystems, TemperatureUnits> = {
    [UnitsSystems.Metric]: TemperatureUnits.Celsius,
    [UnitsSystems.Imperial]: TemperatureUnits.Fahrenheit,
};

export const WindSpeedUnitsMap: Record<UnitsSystems, WindSpeedUnits> = {
    [UnitsSystems.Metric]: WindSpeedUnits.KilometersPerHour,
    [UnitsSystems.Imperial]: WindSpeedUnits.MilesPerHour,
};

export const MinWindyWindSpeedMap: Record<UnitsSystems, number> = {
    [UnitsSystems.Metric]: 82,
    [UnitsSystems.Imperial]: 50,
};

export const MinExtremeHeatTemperatureMap: Record<UnitsSystems, number> = {
    [UnitsSystems.Metric]: 35,
    [UnitsSystems.Imperial]: 95,
};
