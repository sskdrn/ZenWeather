import {
    OPEN_WEATHER_API_KEY,
    API_NINJA_API_KEY,
    GOOGLE_MAPS_API_KEY,
    OPEN_WEATHER_URL,
    API_NINJA_API_URL,
    GOOGLE_MAPS_URL,
    GOOGLE_PLACES_URL,
    GOOGLE_WEATHER_URL,
} from '@env';
export const OpenWeatherApiKey = OPEN_WEATHER_API_KEY;
export const ApiNinjaApiKey = API_NINJA_API_KEY;
export const GoogleMapsApiKey = GOOGLE_MAPS_API_KEY;

export const BaseUrls = {
    OpenWeatherUrl: OPEN_WEATHER_URL,
    ApiNinjaUrl: API_NINJA_API_URL,
    GoogleMapsUrl: GOOGLE_MAPS_URL,
    GooglePlacesUrl: GOOGLE_PLACES_URL,
    GoogleWeatherUrl: GOOGLE_WEATHER_URL,
};

export enum RequestMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Patch = 'PATCH',
    Delete = 'DELETE',
}

export interface NetworkRequestConfig {
    endpoint: string;
    method?: RequestMethods;
    baseUrl?: string;
    params?: Record<string, string | number | boolean | null | undefined>;
    headers?: Record<string, string | number | boolean | null | undefined>;
}

export const ErrorCodes = {
    locationPermissionError: 'PERMISSION_DENIED',
};

export const LocationAutocompleteResponseFieldParams = [
    'suggestions.placePrediction.placeId',
    'suggestions.placePrediction.text.text',
    'suggestions.placePrediction.structuredFormat.mainText.text',
    'suggestions.placePrediction.structuredFormat.secondaryText.text',
].join(',');

export const urls = {
    getForecastUrl: () => `/v1/forecast/hours:lookup`,

    getCurrentWeatherUrl: () => `/v1/currentConditions:lookup`,

    getLocationSearchAutoCompleteUrl: () => `/v1/places:autocomplete`,

    getLocationCoordinatesUrl: (placeId: string) => `/v1/places/${placeId}`,

    getTimeZoneUrl: () => '/maps/api/timezone/json',

    getNinjaCurrentWeatherUrl: () => `/v1/weather?`,

    getReverseGeocodingUrl: () => `/maps/api/geocode/json`,
};
