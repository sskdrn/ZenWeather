import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '@styles/colors';

import Strings from '@constants/strings';
import ActivityIndicator from '@components/ActivityIndicator.tsx';
import CautionIcon from '@svg/CautionIcon.svg';
import { FontClasses, getFontStyles } from '@styles/fonts.ts';
import Button from '@components/Button.tsx';
import { SvgProps } from 'react-native-svg';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import { ViewStyleProps } from '@components/types';

interface CurrentWeatherViewProps {
    isLoading?: boolean;
    errorTitle?: string;
    errorSubtitle?: string | null;
    children: React.JSX.Element;
    displayIcon?: React.FC<SvgProps>;
    foregroundColor?: string;
    backgroundColor?: string;
    onRetryPress?: () => void;
    showErrorColors?: boolean;
    errorContainerStyle?: ViewStyleProps;
}
export default function NetworkLoaderWithError({
    isLoading,
    errorTitle = Strings.defaultErrorTitle,
    errorSubtitle,
    children,
    foregroundColor,
    backgroundColor,
    showErrorColors,
    displayIcon: DisplayIcon = CautionIcon,
    errorContainerStyle,
    onRetryPress,
}: CurrentWeatherViewProps) {
    const weatherColorScheme = useWeatherColorScheme();

    const isError = !!errorSubtitle;

    const foregroundDisplayColor =
        isError && showErrorColors
            ? Colors.white
            : foregroundColor || weatherColorScheme.foreground;
    const backgroundDisplayColor =
        isError && showErrorColors
            ? Colors.errorRed
            : backgroundColor || weatherColorScheme.background;

    const styles = getStyles(backgroundDisplayColor);

    if (isLoading) {
        return (
            <View style={[styles.container]}>
                <ActivityIndicator size={80} color={foregroundDisplayColor} />
            </View>
        );
    }

    if (isError) {
        return (
            <View style={[styles.errorContainer, errorContainerStyle]}>
                <DisplayIcon
                    width={150}
                    height={150}
                    color={foregroundDisplayColor}
                />
                {!!errorTitle && (
                    <Text
                        style={getFontStyles(
                            FontClasses.S24L32,
                            foregroundDisplayColor,
                        )}>
                        {errorTitle}
                    </Text>
                )}
                {!!errorSubtitle && (
                    <Text
                        style={getFontStyles(
                            FontClasses.S16L24,
                            foregroundDisplayColor,
                        )}>
                        {errorSubtitle}
                    </Text>
                )}
                {!!onRetryPress && (
                    <Button
                        onPress={onRetryPress}
                        style={styles.tryAgainButton}
                        buttonText={Strings.tryAgain}
                        backgroundColor={foregroundDisplayColor}
                        textColor={backgroundDisplayColor}
                    />
                )}
            </View>
        );
    }

    return children;
}

const getStyles = (backgroundColor: string) =>
    StyleSheet.create({
        safeViewContainer: {
            flex: 1,
            backgroundColor: backgroundColor,
        },
        container: {
            flex: 1,
            gap: 32,
            padding: 24,
            justifyContent: 'center',
            alignItems: 'center',
        },
        errorContainer: {
            flex: 1,
            gap: 16,
            alignItems: 'center',
            justifyContent: 'center',
        },
        tryAgainButton: {
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
    });
