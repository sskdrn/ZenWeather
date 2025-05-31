import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './navigation';
import Splash from '@pages/Splash';
import CurrentWeather from '@pages/CurrentWeather';
import LocationSearch from '@pages/LocationSearch';
import { ScreenTitles } from '@constants/strings.ts';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';
import WeatherForecastModal from '@pages/WeatherForecastModal';
import { Colors, WeatherColorScheme } from '@styles/colors.ts';
import SettingsList from '@pages/Settings/SettingsList';
import UnitsSettings from '@pages/Settings/UnitsSettings';
import AppInfoSettings from '@pages/Settings/AppInfoSettings';

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function RootNavigationStack() {
    const colorScheme = useWeatherColorScheme();
    const screenOptions = getScreenOptions(colorScheme);

    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={screenOptions.global}>
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={screenOptions.splash}
            />
            <Stack.Screen
                name="CurrentWeather"
                component={CurrentWeather}
                options={screenOptions.currentWeather}
            />
            <Stack.Screen
                name="LocationSearch"
                component={LocationSearch}
                options={screenOptions.locationSearch}
            />
            <Stack.Screen
                name="WeatherForecastModal"
                // @ts-expect-error - modal type is not defined properly
                options={screenOptions.weatherForecastModal}
                component={WeatherForecastModal}
            />
            <Stack.Group>
                <Stack.Screen
                    name={'SettingsList'}
                    component={SettingsList}
                    options={screenOptions.settingsList}
                />
                <Stack.Screen
                    name={'UnitsSettings'}
                    component={UnitsSettings}
                    options={screenOptions.unitsSettings}
                />
                <Stack.Screen
                    name={'AppInfoSettings'}
                    component={AppInfoSettings}
                    options={screenOptions.appInfoSettings}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const getScreenOptions = (colorScheme: WeatherColorScheme) => ({
    global: {
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: colorScheme.navigationBar },
        statusBarColor: colorScheme.navigationBar,
        headerTintColor: colorScheme.navigationBarText,
        headerTitleStyle: getFontStyles(
            FontClasses.S18L24,
            colorScheme.navigationBarText,
            FontStyles.Bold,
        ),
    },
    locationSearch: {
        headerTitle: ScreenTitles.locationSearch,
    },
    weatherForecastModal: {
        presentation: 'modal',
        headerBackVisible: true,
        headerTitle: ScreenTitles.hourlyForecast,
        headerTintColor: colorScheme?.complementaryNavigationBarText,
        statusBarColor: colorScheme.complementaryNavigationBar,
        headerStyle: {
            backgroundColor: colorScheme?.complementaryNavigationBar,
        },
        headerTitleStyle: getFontStyles(
            FontClasses.S18L24,
            colorScheme?.complementaryNavigationBarText,
            FontStyles.Bold,
        ),
    },
    splash: {
        headerShown: false,
        statusBarColor: Colors.logoColor,
    },
    settingsList: {
        headerTitle: ScreenTitles.settingsList,
    },
    unitsSettings: {
        headerTitle: ScreenTitles.unitsSettings,
    },
    appInfoSettings: {
        headerTitle: ScreenTitles.appInfoSettings,
    },
    currentWeather: {
        headerShown: false,
        statusBarColor: colorScheme.background,
    },
});
