import React, { useCallback, useEffect } from 'react';
import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    useAnimatedValue,
} from 'react-native';

import { Colors } from '@styles/colors.ts';
import CloseIcon from '@svg/CloseIcon.svg';
import { FontClasses, getFontStyles } from '@styles/fonts.ts';
import GlobalStyles from '@styles/global-styles.ts';
import { ToastStyles, ToastType } from '@components/Toast/config.ts';

interface ToastViewProps {
    message: string;
    type?: ToastType | null;
    closeToast: () => void;
}
function ToastView({
    message,
    type = ToastType.information,
    closeToast,
}: ToastViewProps) {
    const opacity = useAnimatedValue(0);

    const toastStyle = ToastStyles[type ?? ToastType.information];

    const handleToastClose = useCallback(() => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        closeToast();
    }, [message, opacity, closeToast]);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [opacity]);

    useEffect(() => {
        const timeoutId = setTimeout(closeToast, 3000);
        return () => clearTimeout(timeoutId);
    }, [message, type]);

    return (
        <Animated.View
            style={[
                styles.container,
                toastStyle,
                { transform: [{ scale: opacity }] },
            ]}>
            <Text
                style={[
                    getFontStyles(FontClasses.S14L20, Colors.white),
                    GlobalStyles.flex1,
                ]}>
                {message}
            </Text>
            <Pressable
                onPress={handleToastClose}
                hitSlop={4}
                style={styles.closeButton}>
                <CloseIcon height={20} width={20} color={Colors.white} />
            </Pressable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.alertBlack,
        zIndex: 10000,
        position: 'absolute',
        bottom: 48,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginHorizontal: 16,
        borderRadius: 4,
        alignSelf: 'center',
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: Colors.black, // Shadow color
        shadowOffset: { width: 0, height: 2 }, // Shadow direction
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Shadow spread
        elevation: 3, // Android shadow
        gap: 24,
    },
    message: {
        color: Colors.white,
        textAlign: 'center',
        borderWidth: 1,
    },
    closeButton: {},
});

export default React.memo(ToastView);
