import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TemperatureText from '@components/TemperatureText.tsx';
import { WeatherType } from '@styles/colors.ts';
import { WeatherIcons } from '@styles/icons.ts';
import { TemperatureUnits } from '@config/units-config.ts';

interface WeatherForecastCardProps {
    dateText: string;
    timeText: string;
    temperature: number;
    temperatureUnit: TemperatureUnits;
    weatherType: WeatherType;
    textColor: string;
}

function WeatherForecastCard({
    weatherType,
    temperature,
    dateText,
    timeText,
    textColor,
    temperatureUnit = TemperatureUnits.Celsius,
}: WeatherForecastCardProps) {
    const styles = getStyles(textColor);
    const DisplayIcon = WeatherIcons[weatherType];

    return (
        <View style={[styles.weatherContainer]}>
            <View style={styles.weatherSection}>
                <DisplayIcon width={48} height={48} color={textColor} />
                <TemperatureText
                    unit={temperatureUnit}
                    value={temperature}
                    style={getFontStyles(FontClasses.S24L32, textColor)}
                />
            </View>
            <View>
                <Text
                    style={getFontStyles(
                        FontClasses.S14L20,
                        textColor,
                        FontStyles.Bold,
                    )}>
                    {timeText.toLowerCase()}
                </Text>
                <Text style={getFontStyles(FontClasses.S12L20, textColor)}>
                    {dateText}
                </Text>
            </View>
        </View>
    );
}

const getStyles = (textColor = 'white') =>
    StyleSheet.create({
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
        textContainer: {},
        titleText: getFontStyles(
            FontClasses.S16L24,
            textColor,
            FontStyles.Bold,
        ),
        subtitleText: getFontStyles(FontClasses.S14L20, textColor),
    });

export default React.memo(WeatherForecastCard);
