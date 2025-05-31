export interface WeatherColorScheme {
    background: string;
    foreground: string;
    alertBackground: string;
    alertForeground: string;
    ctaText?: string;
    lightCtaText?: string;
    darkCtaText?: string;
    navigationBar?: string;
    navigationBarText?: string;
    complementaryBackground: string;
    complementaryForeground: string;
    complementaryCtaText?: string;
    complementaryNavigationBar?: string;
    complementaryNavigationBarText?: string;
}

export type WeatherType =
    | 'clearDay'
    | 'clearNight'
    | 'partlyCloudyDay'
    | 'partlyCloudyNight'
    | 'windy'
    | 'overcast'
    | 'drizzle'
    | 'rain'
    | 'thunderstorms'
    | 'fog'
    | 'mist'
    | 'snow'
    | 'hail'
    | 'extremeHeat'
    | 'undefined';

export type WeatherColorSet = Record<WeatherType, WeatherColorScheme>;

export const Colors = {
    black: '#000000',
    white: '#FFFFFF',
    errorRed: '#a64343',
    logoColor: '#4D23CB',
    locationButtonBackground: '#FFFFFF33',
    alertRed: '#8a1e1e',
    alertGreen: '#235915',
    alertBlack: '#242424',
    placeholderGrey: '#545454',
};

export const WeatherSpecificColors: WeatherColorSet = {
    clearDay: {
        background: '#87CEEB',
        foreground: '#003366',
        alertBackground: '#961B1B',
        alertForeground: '#FFFFFF',
        ctaText: '#FFFFFF',
        navigationBar: '#001F33',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#003366',
        complementaryForeground: '#FFFFFF',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#001F33',
        complementaryNavigationBarText: '#FFFFFF',
    },
    clearNight: {
        background: '#1C2355',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#1C2355',
        navigationBar: '#141B40',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#003366',
        complementaryForeground: '#FFFFFF',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#001F33',
        complementaryNavigationBarText: '#FFFFFF',
    },
    windy: {
        background: '#7D7D7D',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#000000',
        navigationBar: '#5C5C5C',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#E6E6E6',
        complementaryForeground: '#1C1C1C',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#5C5C5C',
        complementaryNavigationBarText: '#FFFFFF',
    },
    overcast: {
        background: '#454444',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#000000',
        navigationBar: '#2B2B2B',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#CCCCCC',
        complementaryForeground: '#1A1A1A',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#2B2B2B',
        complementaryNavigationBarText: '#FFFFFF',
    },
    drizzle: {
        background: '#244368',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#244368',
        navigationBar: '#1B314D',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#D9E6F2',
        complementaryForeground: '#244368',
        complementaryCtaText: '#244368',
        complementaryNavigationBar: '#1B314D',
        complementaryNavigationBarText: '#FFFFFF',
    },
    rain: {
        background: '#244368',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#244368',
        navigationBar: '#1B314D',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#D9E6F2',
        complementaryForeground: '#244368',
        complementaryCtaText: '#244368',
        complementaryNavigationBar: '#1B314D',
        complementaryNavigationBarText: '#FFFFFF',
    },
    thunderstorms: {
        background: '#3A094F',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#3A094F',
        navigationBar: '#2B063C',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#EAD6F2',
        complementaryForeground: '#3A094F',
        complementaryCtaText: '#3A094F',
        complementaryNavigationBar: '#2B063C',
        complementaryNavigationBarText: '#FFFFFF',
    },
    fog: {
        background: '#7D7D7D',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#000000',
        navigationBar: '#5C5C5C',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#E6E6E6',
        complementaryForeground: '#1C1C1C',
        complementaryCtaText: '#1C1C1C',
        complementaryNavigationBar: '#5C5C5C',
        complementaryNavigationBarText: '#FFFFFF',
    },
    mist: {
        background: '#7D7D7D',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#000000',
        navigationBar: '#5C5C5C',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#E6E6E6',
        complementaryForeground: '#1C1C1C',
        complementaryCtaText: '#1C1C1C',
        complementaryNavigationBar: '#5C5C5C',
        complementaryNavigationBarText: '#FFFFFF',
    },
    snow: {
        background: '#4B7083',
        foreground: '#FFFFFF',
        alertBackground: '#D32F2F',
        alertForeground: '#FFFFFF',
        ctaText: '#2C3E50',
        navigationBar: '#2C3E50',
        navigationBarText: '#ECF0F1',
        complementaryBackground: '#D5D9DC',
        complementaryForeground: '#34495E',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#2C3E50',
        complementaryNavigationBarText: '#ECF0F1',
    },
    hail: {
        background: '#5D6D7E',
        foreground: '#FFFFFF',
        alertBackground: '#D32F2F',
        alertForeground: '#FFFFFF',
        ctaText: '#34495E',
        navigationBar: '#34495E',
        navigationBarText: '#ECF0F1',
        complementaryBackground: '#BCC6D3',
        complementaryForeground: '#2C3E50',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#34495E',
        complementaryNavigationBarText: '#ECF0F1',
    },
    partlyCloudyDay: {
        background: '#87CEEB',
        foreground: '#003366',
        alertBackground: '#961B1B',
        alertForeground: '#FFFFFF',
        ctaText: '#FFFFFF',
        navigationBar: '#001F33',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#003366',
        complementaryForeground: '#FFFFFF',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#001F33',
        complementaryNavigationBarText: '#FFFFFF',
    },
    partlyCloudyNight: {
        background: '#1C2355',
        foreground: '#FFFFFF',
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: '#1C2355',
        navigationBar: '#141B40',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#003366',
        complementaryForeground: '#FFFFFF',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#001F33',
        complementaryNavigationBarText: '#FFFFFF',
    },
    extremeHeat: {
        background: '#fc8e55',
        foreground: '#800000',
        alertBackground: '#B71C1C',
        alertForeground: '#FFFFFF',
        ctaText: '#FFFFFF',
        navigationBar: '#992600',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#FFE5D0',
        complementaryForeground: '#992600',
        complementaryCtaText: '#FFFFFF',
        complementaryNavigationBar: '#992600',
        complementaryNavigationBarText: '#FFFFFF',
    },
    undefined: {
        background: Colors.logoColor,
        foreground: Colors.white,
        alertBackground: '#CE5454',
        alertForeground: '#FFFFFF',
        ctaText: Colors.logoColor,
        navigationBar: '#333333',
        navigationBarText: '#FFFFFF',
        complementaryBackground: '#FFFFFF',
        complementaryForeground: Colors.logoColor,
        complementaryCtaText: Colors.logoColor,
        complementaryNavigationBar: '#CCCCCC',
        complementaryNavigationBarText: '#333333',
    },
};
