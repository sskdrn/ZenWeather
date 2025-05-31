import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { CurrentWeather, UnitsSystems } from '@models/weather-model';
import { Colors, WeatherColorScheme } from '@styles/colors';
import AlertCard from '@components/AlertCard';
import WeatherInformationSection from './WeatherInformationSection';
import Strings from '@constants/strings';
import LocationButton from '@components/LocationButton.tsx';
import Button from '@components/Button.tsx';
import {
    TemperatureUnitsMap,
    WindSpeedUnitsMap,
} from '@config/units-config.ts';
import NetworkLoaderWithError from '@components/NetworkLoaderWithError.tsx';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import { TimeZoneResponse } from '@models/geocoding-model.ts';
import TransparentButton from '@components/TransparentButton.tsx';
import SettingsIcon from '@svg/SettingsIcon.svg';

interface CurrentWeatherViewProps {
    data?: CurrentWeather | null;
    isLoading?: boolean;
    showAlert?: boolean;
    timeZone?: Omit<TimeZoneResponse, 'timeZoneName' | 'status'>;
    retryHandler?: () => void;
    errorMessage?: string | null;
    currentLocationName?: string | null;
    onLocationButtonPress: () => void;
    onSettingsButtonPress: () => void;
    openWeatherForecastModal: () => void;
}
export default function CurrentWeatherView({
    data,
    isLoading,
    showAlert,
    timeZone,
    errorMessage,
    retryHandler,
    currentLocationName = '',
    onLocationButtonPress,
    onSettingsButtonPress,
    openWeatherForecastModal,
}: CurrentWeatherViewProps) {
    const {
        weather,
        humidity,
        windSpeed,
        weatherType = 'overcast',
        feelsLikeTemperature,
        currentTemperature,
        maximumTemperature,
        minimumTemperature,
        unitsSystem = UnitsSystems.Metric,
    } = data || {};

    const weatherColorScheme = useWeatherColorScheme();
    const styles = getStyles(weatherColorScheme);

    return (
        <SafeAreaView style={styles.safeViewContainer}>
            <NetworkLoaderWithError
                isLoading={isLoading}
                onRetryPress={retryHandler}
                errorContainerStyle={styles.errorContainer}
                errorSubtitle={errorMessage}>
                <View style={styles.container}>
                    <View style={styles.mainContainer}>
                        <View style={styles.topButtonRow}>
                            <LocationButton
                                onPress={onLocationButtonPress}
                                style={styles.locationButton}
                                buttonText={currentLocationName ?? ''}
                                colorScheme={weatherColorScheme}
                            />
                            <TransparentButton
                                onPress={onSettingsButtonPress}
                                style={styles.settingsButton}
                                leadingIcon={
                                    <SettingsIcon
                                        color={weatherColorScheme.foreground}
                                        width={24}
                                        height={24}
                                    />
                                }
                            />
                        </View>
                        {showAlert && (
                            <AlertCard
                                backgroundColor={
                                    weatherColorScheme.alertBackground
                                }
                                textColor={weatherColorScheme.alertForeground}
                                title="Alert"
                                subtitle={Strings.tapToKnowMore}
                            />
                        )}

                        <WeatherInformationSection
                            textColor={weatherColorScheme.foreground}
                            weatherType={weatherType}
                            weather={weather}
                            humidity={humidity}
                            windSpeed={windSpeed}
                            timeZone={timeZone}
                            feelsLikeTemperature={feelsLikeTemperature}
                            temperatureUnit={TemperatureUnitsMap[unitsSystem]}
                            windSpeedUnit={WindSpeedUnitsMap[unitsSystem]}
                            temperature={currentTemperature}
                            maxTemperature={maximumTemperature}
                            minTemperature={minimumTemperature}
                        />
                    </View>
                    <Button
                        onPress={openWeatherForecastModal}
                        buttonText={Strings.viewForecast}
                        backgroundColor={weatherColorScheme.foreground}
                        textColor={
                            weatherColorScheme.ctaText ||
                            weatherColorScheme.background
                        }
                    />
                </View>
            </NetworkLoaderWithError>
        </SafeAreaView>
    );
}

const getStyles = (colorScheme: WeatherColorScheme) =>
    StyleSheet.create({
        safeViewContainer: {
            flex: 1,
            backgroundColor: colorScheme.background,
        },
        errorContainer: {
            padding: 24,
        },
        container: {
            flex: 1,
            gap: 32,
            padding: 24,
        },
        mainContainer: {
            flex: 1,
            gap: 24,
        },
        button: {
            backgroundColor: colorScheme.foreground,
            alignItems: 'center',
            shadowColor: '#000000',
            elevation: 4,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            width: '100%',
            paddingVertical: 8,
            borderRadius: 8,
        },
        topButtonRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            position: 'relative',
        },
        locationButton: {
            flexDirection: 'row',
            backgroundColor: Colors.locationButtonBackground,
            borderRadius: 8,
            alignSelf: 'center',
            paddingVertical: 8,
            paddingHorizontal: 12,
            gap: 4,
            alignItems: 'center',
        },
        settingsButton: {
            position: 'absolute',
            right: 0,
            backgroundColor: Colors.locationButtonBackground,
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 12,
        },
    });
