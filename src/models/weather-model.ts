import { WeatherType } from '@styles/colors.ts';
import { TimeZoneResponse } from '@models/geocoding-model.ts';

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export type TimeZoneData = Pick<
    TimeZoneResponse,
    'dstOffset' | 'rawOffset' | 'timeZoneId'
>;

export interface CurrentLocation {
    locationName?: string | null;
    coordinates?: Coordinates | null;
    timeZone?: TimeZoneData;
}
export interface ParsedReverseGeocodingData
    extends Omit<CurrentLocation, 'timeZone'> {
    isValidData?: boolean;
}

export interface CurrentWeather {
    currentTemperature: number;
    feelsLikeTemperature: number;
    maximumTemperature: number;
    minimumTemperature: number;
    humidity: number;
    windSpeed: number;
    weatherType: WeatherType;
    weather: string;
    timezoneOffset: number;
    unitsSystem?: UnitsSystems;
}

export interface ParsedWeatherForecast {
    weatherType: WeatherType;
    temperature: number;
    dateText: string;
    timeText: string;
}

export interface WeatherForecastData {
    forecast: ParsedWeatherForecast[];
}

/* Google weather API models*/

export interface WeatherData {
    currentTime: string;
    timeZone: TimeZone;
    isDaytime: boolean;
    weatherCondition: WeatherCondition;
    temperature: Temperature;
    feelsLikeTemperature: Temperature;
    dewPoint: Temperature;
    heatIndex: Temperature;
    windChill: Temperature;
    relativeHumidity: number;
    uvIndex: number;
    precipitation: Precipitation;
    thunderstormProbability: number;
    airPressure: AirPressure;
    wind: Wind;
    visibility: Visibility;
    cloudCover: number;
    currentConditionsHistory: CurrentConditionsHistory;
}

export interface ForecastedWeatherData
    extends Omit<WeatherData, 'currentTime'> {
    interval: {
        startTime: string;
        endTime: string;
    };
    displayDateTime: {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
        seconds: number;
        nanos: number;
        utcOffset: string;
    };
}

export enum WeatherConditionType {
    Clear = 'CLEAR',
    MostlyClear = 'MOSTLY_CLEAR',
    PartlyCloudy = 'PARTLY_CLOUDY',
    MostlyCloudy = 'MOSTLY_CLOUDY',
    Cloudy = 'CLOUDY',
    Windy = 'WINDY',
    WindAndRain = 'WIND_AND_RAIN',
    LightRainShowers = 'LIGHT_RAIN_SHOWERS',
    ChanceOfShowers = 'CHANCE_OF_SHOWERS',
    ScatteredShowers = 'SCATTERED_SHOWERS',
    RainShowers = 'RAIN_SHOWERS',
    HeavyRainShowers = 'HEAVY_RAIN_SHOWERS',
    LightToModerateRain = 'LIGHT_TO_MODERATE_RAIN',
    ModerateToHeavyRain = 'MODERATE_TO_HEAVY_RAIN',
    Rain = 'RAIN',
    LightRain = 'LIGHT_RAIN',
    HeavyRain = 'HEAVY_RAIN',
    RainPeriodicallyHeavy = 'RAIN_PERIODICALLY_HEAVY',
    LightSnowShowers = 'LIGHT_SNOW_SHOWERS',
    ChanceOfSnowShowers = 'CHANCE_OF_SNOW_SHOWERS',
    ScatteredSnowShowers = 'SCATTERED_SNOW_SHOWERS',
    SnowShowers = 'SNOW_SHOWERS',
    HeavySnowShowers = 'HEAVY_SNOW_SHOWERS',
    LightToModerateSnow = 'LIGHT_TO_MODERATE_SNOW',
    ModerateToHeavySnow = 'MODERATE_TO_HEAVY_SNOW',
    Snow = 'SNOW',
    LightSnow = 'LIGHT_SNOW',
    HeavySnow = 'HEAVY_SNOW',
    Snowstorm = 'SNOWSTORM',
    SnowPeriodicallyHeavy = 'SNOW_PERIODICALLY_HEAVY',
    HeavySnowStorm = 'HEAVY_SNOW_STORM',
    BlowingSnow = 'BLOWING_SNOW',
    RainAndSnow = 'RAIN_AND_SNOW',
    Hail = 'HAIL',
    HailShowers = 'HAIL_SHOWERS',
    Thunderstorm = 'THUNDERSTORM',
    Thundershower = 'THUNDERSHOWER',
    LightThunderstormRain = 'LIGHT_THUNDERSTORM_RAIN',
    ScatteredThunderstorms = 'SCATTERED_THUNDERSTORMS',
    HeavyThunderstorm = 'HEAVY_THUNDERSTORM',
}

export interface TimeZone {
    id: string;
}

export interface WeatherCondition {
    iconBaseUri: string;
    description: WeatherDescription;
    type: WeatherConditionType; // e.g. "CLEAR"
}

export interface WeatherDescription {
    text: string;
    languageCode: string; // e.g. "en"
}

export interface Temperature {
    degrees: number;
    unit: TemperatureUnit; // "FAHRENHEIT", "CELSIUS", etc.
}

export enum TemperatureUnit {
    Fahrenheit = 'FAHRENHEIT',
    Celsius = 'CELSIUS',
}

export interface Precipitation {
    probability: PrecipitationProbability;
    qpf: Quantity; // Quantitative Precipitation Forecast
}

export interface PrecipitationProbability {
    percent: number;
    type: string; // e.g. "RAIN"
}

export interface Quantity {
    quantity: number;
    unit: string; // e.g. "INCHES", "MM"
}

export interface AirPressure {
    meanSeaLevelMillibars: number;
}

export interface Wind {
    direction: WindDirection;
    speed: WindSpeed;
    gust: WindSpeed;
}

export interface WindDirection {
    degrees: number;
    cardinal: string; // e.g. "NORTH_NORTHWEST"
}

export interface WindSpeed {
    value: number;
    unit: string; // e.g. "MILES_PER_HOUR", "KM_PER_HOUR"
}

export interface Visibility {
    distance: number;
    unit: string; // e.g. "MILES", "KM"
}

export interface CurrentConditionsHistory {
    temperatureChange: Temperature;
    maxTemperature: Temperature;
    minTemperature: Temperature;
    qpf: Quantity;
}

export interface ForecastedWeatherResponse {
    forecastHours: ForecastedWeatherData[];
    timeZone: {
        id: string;
        version: string;
    };
    nextPageToken?: string;
}

export enum UnitsSystems {
    Metric = 'METRIC',
    Imperial = 'IMPERIAL',
}
