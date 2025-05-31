import React from 'react';
import { FontClasses, getFontStyles } from '@styles/fonts';
import { Text, TextStyle } from 'react-native';
import { TemperatureUnits } from '@config/units-config.ts';

interface TemperatureTextProps {
    unit: TemperatureUnits;
    value: number;
    style?: TextStyle | TextStyle[];
}

export default function TemperatureText({
    unit,
    value,
    style,
}: TemperatureTextProps) {
    const formattedValue = `${value.toFixed(0).toString()} ${unit.toString()}`;
    return (
        <Text style={[getFontStyles(FontClasses.S14L20), style]}>
            {formattedValue}
        </Text>
    );
}
