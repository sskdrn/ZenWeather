import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RadioButtonCheckedIcon from '@svg/RadioButtonChecked.svg';
import RadioButtonUncheckedIcon from '@svg/RadioButtonUnchecked.svg';
import { TextStyleProps, ViewStyleProps } from '@components/types';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';
import { Colors } from '@styles/colors.ts';
import GlobalStyles from '@styles/global-styles.ts';

interface RadioOptionProps {
    isSelected?: boolean;
    mainText?: string;
    subText?: string;
    showDivider?: boolean;
    style?: ViewStyleProps;
    textContainerStyle?: ViewStyleProps;
    mainTextStyle?: TextStyleProps;
    subTextStyle?: TextStyleProps;
    foregroundColor: string;
    radioIconSize?: number;
    onPress?: () => void;
}
export default function RadioOption({
    isSelected,
    mainText,
    subText,
    radioIconSize = 28,
    subTextStyle,
    mainTextStyle,
    textContainerStyle,
    style,
    foregroundColor,
    onPress,
}: RadioOptionProps) {
    const RadioIcon = isSelected
        ? RadioButtonCheckedIcon
        : RadioButtonUncheckedIcon;
    const styles = getStyles();

    const defaultMainTextStyle = getFontStyles(
        FontClasses.S24L28,
        foregroundColor,
        FontStyles.Regular,
    );

    const defaultSubTextStyle = getFontStyles(
        FontClasses.S16L24,
        foregroundColor,
        FontStyles.Regular,
    );

    const rippleStyle = { color: Colors.white };

    return (
        <Pressable
            onPress={onPress}
            android_ripple={rippleStyle}
            style={({ pressed }) => [
                style,
                styles.container,
                pressed && GlobalStyles.radioPressedStyle,
            ]}>
            <RadioIcon
                color={foregroundColor}
                width={radioIconSize}
                height={radioIconSize}
            />
            <View style={textContainerStyle}>
                <Text style={[mainTextStyle, defaultMainTextStyle]}>
                    {mainText}
                </Text>
                <Text style={[subTextStyle, defaultSubTextStyle]}>
                    {subText}
                </Text>
            </View>
        </Pressable>
    );
}

const getStyles = () =>
    StyleSheet.create({
        container: {
            gap: 8,
            flexDirection: 'row',
            padding: 8,
        },
    });
