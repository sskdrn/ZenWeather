import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';
import React from 'react';
import { Colors } from '@styles/colors.ts';
import { TextStyleProps, ViewStyleProps } from '@components/types';
import GlobalStyles from '@styles/global-styles.ts';

interface ButtonProps {
    buttonText?: string | React.JSX.Element;
    leadingIcon?: React.JSX.Element;
    trailingIcon?: React.JSX.Element;
    textColor?: string;
    backgroundColor?: string;
    style?: ViewStyleProps;
    textStyle?: TextStyleProps;
    onPress?: (event?: GestureResponderEvent) => void;
}
function Button({
    buttonText,
    leadingIcon,
    trailingIcon,
    textColor = Colors.black,
    backgroundColor = Colors.white,
    style,
    textStyle,
    onPress,
}: ButtonProps) {
    const styles = getStyles(backgroundColor);
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.button,
                pressed && GlobalStyles.pressedStyle,
                style,
            ]}>
            {leadingIcon}
            {typeof buttonText === 'string' ? (
                <Text
                    style={[
                        getFontStyles(
                            FontClasses.S18L24,
                            textColor,
                            FontStyles.Bold,
                        ),
                        textStyle,
                    ]}>
                    {buttonText}
                </Text>
            ) : (
                buttonText
            )}
            {trailingIcon}
        </Pressable>
    );
}

const getStyles = (backgroundColor: string) =>
    StyleSheet.create({
        button: {
            backgroundColor: backgroundColor,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000000',
            gap: 4,
            elevation: 4,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            width: '100%',
            paddingVertical: 8,
            borderRadius: 8,
        },
    });

export default React.memo(Button);
