import { WeatherType } from '@styles/colors.ts';

const Strings = {
    appTitle: 'ZenWeather',
    viewForecast: 'View Forecast',
    tapToKnowMore: 'Tap to know more',
    defaultErrorTitle: 'Error',
    defaultErrorSubtitle: "Something's not right. Please try again.",
    unableToDetectLocation:
        'Unable to detect location. Please try searching for location manually.',
    locationPermissionDenied:
        'Location permission denied. Please enable it in settings to continue.',
    tryAgain: 'Try Again',
    noLocationResultFoundTitle: 'No Location Found',
    noLocationResultFoundSubtitle:
        'We couldn’t find any results for this location. Please try again with a different search term.',
    locationSearchPlaceholder: 'Enter your location',
    metric: 'Metric',
    metricUnits: 'Units will be in °C, km/h, mm',
    imperial: 'Imperial',
    imperialUnits: 'Units will be in °F, mph, inches',
    unitsChangeDialogBoxTitle: 'Apply Unit Changes?',
    unitsChangeDialogBoxDescription:
        'Changing units requires a restart. Save and restart now?',
    save: 'Save',
    cancel: 'Cancel',
    locationNotSupportedErrorMessage:
        'Information is not supported for this location. Please try a different location.',
};

export const AppInfoStrings = {
    appName: 'ZenWeather',
    tagline: 'Just the Weather, Nothing More.',
    designedAndDevelopedBy: 'Designed and developed by ',
    developerName: 'Sakthidharan',
    fullStop: '.',
    builtWith: 'Built with ',
    reactNative: 'React Native',
    weatherAndLocationServices: 'Weather and location services provided by ',
    googleApis: 'Google APIs',
    fontsAndIcons: 'Fonts and icons provided by ',
    googleFonts: 'Google Fonts',
};

export const ScreenTitles = {
    locationSearch: 'Search location',
    settingsList: 'Settings',
    hourlyForecast: 'Hourly Forecast',
    unitsSettings: 'Units',
    appInfoSettings: 'About ZenWeather',
};

export const WeatherStrings: Record<WeatherType, string> = {
    clearDay: 'Clear',
    clearNight: 'Clear',
    partlyCloudyDay: 'Partly Cloudy',
    partlyCloudyNight: 'Partly Cloudy',
    windy: 'Windy',
    overcast: 'Overcast',
    drizzle: 'Drizzle',
    rain: 'Rain',
    thunderstorms: 'Thunderstorms',
    fog: 'Fog',
    mist: 'Mist',
    snow: 'Snow',
    hail: 'Hail',
    extremeHeat: 'Extreme Heat',
    undefined: 'Details not available',
};
export default Strings;
