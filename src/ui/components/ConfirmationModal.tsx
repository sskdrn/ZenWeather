import React, { useEffect } from 'react';
import {
    Animated,
    Dimensions,
    Easing,
    Modal,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    useAnimatedValue,
    View,
} from 'react-native';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import { WeatherColorScheme } from '@styles/colors.ts';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';
import Button from '@components/Button.tsx';
import GlobalStyles from '@styles/global-styles.ts';
import CloseIcon from '@svg/CloseIcon.svg';

interface ConfirmationModalProps {
    headingText?: string;
    descriptionText?: string;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    onPrimaryButtonPress?: () => void;
    onSecondaryButtonPress?: () => void;
    onCloseButtonPress?: () => void;
}

export default function ConfirmationModal({
    headingText,
    descriptionText,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryButtonPress,
    onSecondaryButtonPress,
    onCloseButtonPress,
}: ConfirmationModalProps) {
    const weatherColorScheme = useWeatherColorScheme();
    const styles = getStyles(weatherColorScheme);
    const { height: screenHeight } = Dimensions.get('window');
    const animatedPosition = useAnimatedValue(screenHeight);

    useEffect(() => {
        Animated.timing(animatedPosition, {
            toValue: 0,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, [animatedPosition]);

    return (
        <Modal transparent={true}>
            <View style={styles.modalBackground}>
                <Animated.View
                    style={[
                        styles.container,
                        { transform: [{ translateY: animatedPosition }] },
                    ]}>
                    <SafeAreaView>
                        <View style={styles.modalHeader}>
                            <Text
                                style={getFontStyles(
                                    FontClasses.S18L24,
                                    weatherColorScheme.complementaryNavigationBarText,
                                    FontStyles.Bold,
                                )}>
                                {headingText}
                            </Text>
                            {!!onCloseButtonPress && (
                                <Pressable
                                    style={({ pressed }) =>
                                        pressed && GlobalStyles.pressedStyle
                                    }
                                    hitSlop={4}
                                    onPress={onCloseButtonPress}>
                                    <CloseIcon
                                        color={
                                            weatherColorScheme.complementaryNavigationBarText
                                        }
                                        width={24}
                                        height={24}
                                    />
                                </Pressable>
                            )}
                        </View>
                        <View style={styles.mainSection}>
                            <Text
                                style={getFontStyles(
                                    FontClasses.S18L24,
                                    weatherColorScheme.complementaryForeground,
                                    FontStyles.Regular,
                                )}>
                                {descriptionText}
                            </Text>
                        </View>
                        <View style={styles.buttonSection}>
                            {!!primaryButtonText && (
                                <Button
                                    style={styles.primaryButton}
                                    buttonText={primaryButtonText}
                                    textColor={
                                        weatherColorScheme.complementaryBackground
                                    }
                                    onPress={onPrimaryButtonPress}
                                />
                            )}
                            {!!secondaryButtonText && (
                                <Button
                                    style={styles.secondaryButton}
                                    buttonText={secondaryButtonText}
                                    textColor={
                                        weatherColorScheme.complementaryForeground
                                    }
                                    onPress={onSecondaryButtonPress}
                                />
                            )}
                        </View>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
}

const getStyles = (weatherColorScheme: WeatherColorScheme) =>
    StyleSheet.create({
        modalBackground: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'relative',
        },
        container: {
            backgroundColor: weatherColorScheme.complementaryBackground,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            paddingBottom: 16,
        },
        modalHeader: {
            paddingHorizontal: 16,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingVertical: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: weatherColorScheme.complementaryNavigationBar,
        },
        mainSection: {
            minHeight: 100,
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        buttonSection: {
            flexDirection: 'row',
            gap: 8,
            paddingHorizontal: 16,
        },
        primaryButton: {
            backgroundColor: weatherColorScheme.complementaryForeground,
            flex: 1,
        },
        secondaryButton: {
            backgroundColor: weatherColorScheme.complementaryBackground,
            flex: 1,
            shadowColor: 'transparent',
            borderColor: weatherColorScheme.complementaryForeground,
            borderWidth: 1,
        },
    });
