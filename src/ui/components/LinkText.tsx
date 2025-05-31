import React from 'react';
import { TextStyleProps, ViewStyleProps } from '@components/types';
import { Pressable, Text, StyleSheet } from 'react-native';

interface LinkTextProps {
    linkText?: string;
    onPress?: () => void;
    style?: ViewStyleProps;
    textStyle?: TextStyleProps;
}

export default function LinkText({
    linkText,
    style,
    textStyle,
    onPress,
}: LinkTextProps) {
    return (
        <Pressable onPress={onPress} style={style}>
            <Text style={[styles.underline, textStyle]}>{linkText}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline',
    },
});
