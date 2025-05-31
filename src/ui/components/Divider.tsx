import React from 'react';
import { ViewStyleProps } from '@components/types';
import { DimensionValue, View } from 'react-native';

interface DividerProps {
    style?: ViewStyleProps;
    width?: DimensionValue;
    height?: DimensionValue;
    color?: string;
}

export function Divider({
    style,
    width = '100%',
    height = 1,
    color,
}: DividerProps) {
    const defaultStyle = { width, height, backgroundColor: color };
    return <View style={[defaultStyle, style]} />;
}
