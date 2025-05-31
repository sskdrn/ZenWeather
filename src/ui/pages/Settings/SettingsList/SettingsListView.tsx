import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import { WeatherColorScheme } from '@styles/colors.ts';
import {
    SettingsOptions,
    SettingsType,
} from '@pages/Settings/SettingsList/config.ts';
import Button from '@components/Button.tsx';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';

interface SettingsListViewProps {
    settingsOptionClickHandler?: (option: SettingsType) => void;
}

export default function SettingsListView({
    settingsOptionClickHandler,
}: SettingsListViewProps) {
    const weatherColorScheme = useWeatherColorScheme();
    const styles = getStyles(weatherColorScheme);
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.container}>
                {SettingsOptions.map(option => {
                    const { type, icon: Icon, displayName } = option;
                    const onOptionClick = () => {
                        settingsOptionClickHandler?.(type);
                    };
                    return (
                        <Button
                            key={type}
                            style={styles.option}
                            onPress={onOptionClick}
                            leadingIcon={
                                <Icon
                                    color={weatherColorScheme.ctaText}
                                    width={24}
                                    height={24}
                                />
                            }
                            buttonText={displayName}
                            textStyle={getFontStyles(
                                FontClasses.S18L24,
                                weatherColorScheme.ctaText,
                                FontStyles.Regular,
                            )}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (weatherColorScheme: WeatherColorScheme) =>
    StyleSheet.create({
        safeAreaView: {
            flex: 1,
            backgroundColor: weatherColorScheme.background,
        },
        container: {
            flex: 1,
            gap: 16,
            padding: 16,
        },
        optionTextContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        option: {
            backgroundColor: weatherColorScheme.foreground,
            borderRadius: 4,
            gap: 16,
            justifyContent: 'flex-start',
            paddingHorizontal: 8,
            paddingVertical: 20,
        },
    });
