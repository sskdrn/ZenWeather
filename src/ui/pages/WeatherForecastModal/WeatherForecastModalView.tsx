import React, { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import WeatherForecastCard from '@components/WeatherForecastCard.tsx';
import { ParsedWeatherForecast, UnitsSystems } from '@models/weather-model.ts';
import { Colors } from '@styles/colors.ts';
import { getWeatherForecastElementKey } from '@store/forecast/helpers.ts';
import NetworkLoaderWithError from '@components/NetworkLoaderWithError.tsx';
import { TemperatureUnitsMap } from '@config/units-config.ts';

interface WeatherForecastModalViewProps {
    isVisible?: boolean;
    isLoading?: boolean;
    unitsSystem: UnitsSystems;
    forecastList: ParsedWeatherForecast[];
    errorMessage?: string | null;
    retryHandler?: () => void;
}

function WeatherForecastModalView({
    isLoading = false,
    forecastList = [],
    unitsSystem,
    errorMessage,
    retryHandler,
}: WeatherForecastModalViewProps) {
    const weatherColorSchemes = useWeatherColorScheme();

    const {
        complementaryBackground: backgroundColor,
        complementaryForeground: textColor,
    } = weatherColorSchemes;

    const styles = getStyles(backgroundColor, textColor ?? Colors.black);

    const renderWeatherCard = useCallback(
        ({ item }: { item: ParsedWeatherForecast }) => {
            return (
                <WeatherForecastCard
                    key={`${item.dateText}-${item.timeText}`}
                    dateText={item.dateText}
                    timeText={item.timeText}
                    temperature={item.temperature}
                    temperatureUnit={TemperatureUnitsMap[unitsSystem]}
                    weatherType={item.weatherType}
                    textColor={textColor ?? Colors.black}
                />
            );
        },
        [textColor, unitsSystem],
    );

    return (
        <View style={styles.container}>
            <NetworkLoaderWithError
                onRetryPress={retryHandler}
                isLoading={isLoading}
                errorSubtitle={errorMessage}
                foregroundColor={textColor}
                backgroundColor={backgroundColor}>
                <FlatList
                    data={forecastList}
                    renderItem={renderWeatherCard}
                    keyExtractor={getWeatherForecastElementKey}
                />
            </NetworkLoaderWithError>
        </View>
    );
}

const getStyles = (backgroundColor: string, textColor: string) =>
    StyleSheet.create({
        container: {
            backgroundColor: backgroundColor,
            flex: 1,
            paddingHorizontal: 32,
        },
        weatherContainer: {
            paddingVertical: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderBottomColor: textColor,
        },
        weatherSection: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        activityIndicatorContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
        },
        headerSection: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        backButton: {
            width: 40,
            height: 24,
        },
    });

export default WeatherForecastModalView;
