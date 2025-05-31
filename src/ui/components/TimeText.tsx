import { FontClasses, getFontStyles } from '@styles/fonts';
import React from 'react';
import { Text, TextStyle } from 'react-native';
import useTime from '@hooks/useTime.ts';
import { getFormattedTimeString } from '@utils/date-util.ts';
interface TimeTextProps {
    timeZoneOffset?: number;
    dstOffset?: number;
    style?: TextStyle | TextStyle[];
}
export default function TimeText({
    timeZoneOffset = 0,
    dstOffset = 0,
    style,
}: TimeTextProps) {
    const time = useTime({ timeZoneOffset, dstOffset });
    const formattedTime = getFormattedTimeString(new Date(time));

    return (
        <Text style={[getFontStyles(FontClasses.S14L20), style]}>
            {formattedTime}
        </Text>
    );
}
