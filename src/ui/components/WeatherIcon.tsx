import React from 'react';
import { WeatherType } from '@styles/colors';
import { WeatherIcons } from '@styles/icons';

interface WeatherIconProps {
    weather?: string;
    color?: string;
    size?: number;
}
export default function WeatherIcon({
    weather = 'clear',
    color = 'white',
    size = 24,
}: WeatherIconProps) {
    const WeatherIconSvg = WeatherIcons[(weather as WeatherType) ?? 'clearDay'];

    return <WeatherIconSvg width={size} height={size} color={color} />;
}
