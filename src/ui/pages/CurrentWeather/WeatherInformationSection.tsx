import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WeatherType } from '@styles/colors';
import { FontClasses, getFontStyles } from '@styles/fonts';
import TimeText from '@components/TimeText';
import TemperatureText from '@components/TemperatureText';
import WeatherIcon from '@components/WeatherIcon';
import MaxTemperatureIcon from '@svg/MaxTemperatureIcon.svg';
import MinTemperatureIcon from '@svg/MinTemperatureIcon.svg';
import FeelsLikeTemperatureIcon from '@svg/FeelsLikeTemperatureIcon.svg';
import HumidityIcon from '@svg/HumidityIcon.svg';
import AirIcon from '@svg/AirIcon.svg';
import { TimeZoneResponse } from '@models/geocoding-model.ts';
import { TemperatureUnits, WindSpeedUnits } from '@config/units-config.ts';

interface WeatherInformationSectionProps {
    textColor?: string;
    weatherDescription?: string;
    weatherType?: WeatherType;
    temperatureUnit: TemperatureUnits;
    windSpeedUnit: WindSpeedUnits;
    humidity?: number;
    temperature?: number;
    maxTemperature?: number;
    minTemperature?: number;
    feelsLikeTemperature?: number;
    weather?: string;
    windSpeed?: number;
    timeZone?: Omit<TimeZoneResponse, 'status' | 'timeZoneName'>;
}

export default function WeatherInformationSection({
    textColor,
    weatherType = 'clearNight',
    temperatureUnit = TemperatureUnits.Celsius,
    windSpeedUnit = WindSpeedUnits.KilometersPerHour,
    temperature = 0,
    maxTemperature = 0,
    minTemperature = 0,
    feelsLikeTemperature = 0,
    humidity,
    weather,
    windSpeed,
    timeZone,
}: WeatherInformationSectionProps) {
    const styles = getStyles();

    return (
        <View style={styles.container}>
            <View style={styles.timeTemperatureContainer}>
                <TemperatureText
                    unit={temperatureUnit}
                    value={temperature}
                    style={getFontStyles(FontClasses.S48L64, textColor)}
                />
                <TimeText
                    timeZoneOffset={timeZone?.rawOffset}
                    dstOffset={timeZone?.dstOffset}
                    style={getFontStyles(FontClasses.S32L40, textColor)}
                />
            </View>
            <View style={styles.weatherStatusContainer}>
                <WeatherIcon
                    size={150}
                    weather={weatherType}
                    color={textColor}
                />
                <Text style={getFontStyles(FontClasses.S24L32, textColor)}>
                    {weather}
                </Text>
            </View>
            <View style={styles.weatherMetricsContainer}>
                <View style={styles.maxMinContainer}>
                    <View style={styles.maxMinTile}>
                        <MinTemperatureIcon
                            color={textColor}
                            width={24}
                            height={24}
                        />
                        <TemperatureText
                            value={minTemperature}
                            unit={temperatureUnit}
                            style={getFontStyles(FontClasses.S24L32, textColor)}
                        />
                    </View>
                    <View style={styles.maxMinTile}>
                        <MaxTemperatureIcon
                            color={textColor}
                            width={24}
                            height={24}
                        />
                        <TemperatureText
                            value={maxTemperature}
                            unit={temperatureUnit}
                            style={getFontStyles(FontClasses.S24L32, textColor)}
                        />
                    </View>
                </View>
                <View style={styles.otherMetricsContainer}>
                    <View style={styles.otherMetricTile}>
                        <FeelsLikeTemperatureIcon
                            color={textColor}
                            width={32}
                            height={32}
                        />
                        <TemperatureText
                            value={feelsLikeTemperature}
                            unit={temperatureUnit}
                            style={getFontStyles(FontClasses.S16L24, textColor)}
                        />
                    </View>
                    <View style={styles.otherMetricTile}>
                        <HumidityIcon
                            color={textColor}
                            width={32}
                            height={32}
                        />
                        <Text
                            style={getFontStyles(
                                FontClasses.S16L24,
                                textColor,
                            )}>
                            {`${humidity}%`}
                        </Text>
                    </View>
                    <View style={styles.otherMetricTile}>
                        <AirIcon color={textColor} width={32} height={32} />
                        <Text
                            style={getFontStyles(
                                FontClasses.S16L24,
                                textColor,
                            )}>
                            {`${windSpeed} ${windSpeedUnit}`}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const getStyles = () =>
    StyleSheet.create({
        container: {
            gap: 32,
        },
        timeTemperatureContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
        },
        weatherStatusContainer: {
            gap: 32,
            alignItems: 'center',
        },
        weatherMetricsContainer: {
            gap: 40,
            alignItems: 'center',
        },
        maxMinContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 50,
        },
        maxMinTile: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
        },
        otherMetricsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            gap: 36,
        },
        otherMetricTile: {
            gap: 24,
            alignItems: 'center',
        },
    });
