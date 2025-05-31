import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import React, { useCallback } from 'react';
import { WeatherColorScheme } from '@styles/colors.ts';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import RadioOption from '@components/RadioOption.tsx';
import Strings from '@constants/strings.ts';
import { Divider } from '@components/Divider.tsx';
import { UnitsSystems } from '@models/weather-model.ts';

interface UnitsSettingsViewParams {
    selectedOption: UnitsSystems;
    handleOptionSelect?: (selectedUnitType: UnitsSystems) => void;
}
export default function UnitsSettingsView({
    selectedOption,
    handleOptionSelect,
}: UnitsSettingsViewParams) {
    const weatherColorScheme = useWeatherColorScheme();
    const styles = getStyles(weatherColorScheme);

    const isMetricSelected = selectedOption === UnitsSystems.Metric;
    const isImperialSelected = selectedOption === UnitsSystems.Imperial;

    const getOptionSelectHandler = useCallback(
        (selectedUnitType: UnitsSystems) => () => {
            handleOptionSelect?.(selectedUnitType);
        },
        [],
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.container}>
                <RadioOption
                    isSelected={isMetricSelected}
                    foregroundColor={weatherColorScheme.foreground}
                    mainText={Strings.metric}
                    subText={Strings.metricUnits}
                    onPress={getOptionSelectHandler(UnitsSystems.Metric)}
                />
                <Divider color={weatherColorScheme.foreground} />
                <RadioOption
                    isSelected={isImperialSelected}
                    foregroundColor={weatherColorScheme.foreground}
                    mainText={Strings.imperial}
                    subText={Strings.imperialUnits}
                    onPress={getOptionSelectHandler(UnitsSystems.Imperial)}
                />
                <Divider color={weatherColorScheme.foreground} />
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
            gap: 8,
            padding: 16,
        },
    });
