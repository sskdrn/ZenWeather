import { Pressable, Text } from 'react-native';
import React from 'react';
import { Colors } from '@styles/colors.ts';
import { TextStyleProps, ViewStyleProps } from '@components/types';

interface TransparentButtonProps {
    onPress?: () => void;
    rippleColor?: string;
    leadingIcon?: React.JSX.Element;
    buttonText?: string;
    trailingIcon?: React.JSX.Element;
    style?: ViewStyleProps;
    textStyle?: TextStyleProps;
}

function LocationButton({
    onPress,
    buttonText = '',
    style,
    textStyle,
    leadingIcon,
    trailingIcon,
    rippleColor = Colors.white,
}: TransparentButtonProps) {
    const rippleStyle = { color: rippleColor };
    const pressedStyle = { opacity: 0.7 };
    return (
        <Pressable
            onPress={onPress}
            android_ripple={rippleStyle}
            style={({ pressed }) => [style, pressed && pressedStyle]}>
            {leadingIcon}
            {buttonText && <Text style={textStyle}>{buttonText}</Text>}
            {trailingIcon}
        </Pressable>
    );
}

export default React.memo(LocationButton);
