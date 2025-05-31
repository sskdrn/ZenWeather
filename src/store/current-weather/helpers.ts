import { UnitsSystems, WeatherConditionType } from '@models/weather-model.ts';
import { WeatherType } from '@styles/colors.ts';
import {
    MinExtremeHeatTemperatureMap,
    MinWindyWindSpeedMap,
} from '@config/units-config.ts';

export const getWeatherType = (
    condition: WeatherConditionType,
    windSpeed: number,
    temperature: number,
    isDaytime = true,
    unitsSystem = UnitsSystems.Metric,
): WeatherType => {
    if (windSpeed > MinWindyWindSpeedMap[unitsSystem]) {
        return 'windy';
    }

    if (isDaytime && temperature > MinExtremeHeatTemperatureMap[unitsSystem]) {
        return 'extremeHeat';
    }

    switch (condition) {
        case WeatherConditionType.Thunderstorm:
        case WeatherConditionType.Thundershower:
        case WeatherConditionType.LightThunderstormRain:
        case WeatherConditionType.ScatteredThunderstorms:
        case WeatherConditionType.HeavyThunderstorm:
            return 'thunderstorms';

        case WeatherConditionType.LightRainShowers:
        case WeatherConditionType.ChanceOfShowers:
        case WeatherConditionType.ScatteredShowers:
        case WeatherConditionType.RainShowers:
        case WeatherConditionType.HeavyRainShowers:
        case WeatherConditionType.LightToModerateRain:
        case WeatherConditionType.ModerateToHeavyRain:
        case WeatherConditionType.Rain:
        case WeatherConditionType.LightRain:
        case WeatherConditionType.HeavyRain:
        case WeatherConditionType.RainPeriodicallyHeavy:
            return 'rain';

        case WeatherConditionType.Hail:
        case WeatherConditionType.HailShowers:
            return 'hail';

        case WeatherConditionType.LightSnowShowers:
        case WeatherConditionType.ChanceOfSnowShowers:
        case WeatherConditionType.ScatteredSnowShowers:
        case WeatherConditionType.SnowShowers:
        case WeatherConditionType.HeavySnowShowers:
        case WeatherConditionType.LightToModerateSnow:
        case WeatherConditionType.ModerateToHeavySnow:
        case WeatherConditionType.Snow:
        case WeatherConditionType.LightSnow:
        case WeatherConditionType.HeavySnow:
        case WeatherConditionType.Snowstorm:
        case WeatherConditionType.SnowPeriodicallyHeavy:
        case WeatherConditionType.HeavySnowStorm:
        case WeatherConditionType.BlowingSnow:
            return 'snow';

        case WeatherConditionType.Clear:
        case WeatherConditionType.MostlyClear:
            return isDaytime ? 'clearDay' : 'clearNight';

        case WeatherConditionType.PartlyCloudy:
        case WeatherConditionType.MostlyCloudy:
            return isDaytime ? 'partlyCloudyDay' : 'partlyCloudyNight';

        case WeatherConditionType.Cloudy:
            return 'overcast';

        case WeatherConditionType.Windy:
        case WeatherConditionType.WindAndRain:
            return 'windy';

        case WeatherConditionType.RainAndSnow:
            return 'rain';

        default:
            return 'clearDay';
    }
};
