import { FontClasses, getFontStyles } from '@styles/fonts';
import React from 'react';
import { Pressable, StyleSheet, View, TextInput } from 'react-native';
import { SvgProps } from 'react-native-svg';
import GlobalStyles from '@styles/global-styles';
import { Colors } from '@styles/colors';
import Strings from '@constants/strings.ts';

interface LocationSearchBarProps {
    leftButtonIcon?: React.FC<SvgProps> | null;
    rightButtonIcon?: React.FC<SvgProps> | null;
    value?: string;
    textColor?: string;
    onChangeText?: (text: string) => void;
    onPressLeftButton?: () => void;
    onPressRightButton?: () => void;
}

function LocationSearchBar({
    leftButtonIcon: LeftButtonIcon,
    rightButtonIcon: RightButtonIcon,
    value,
    textColor = Colors.white,
    onChangeText,
    onPressLeftButton,
    onPressRightButton,
}: LocationSearchBarProps) {
    const styles = getStyles(textColor, !!LeftButtonIcon, !!RightButtonIcon);
    return (
        <View style={GlobalStyles.positionRelative}>
            {!!LeftButtonIcon && (
                <Pressable
                    style={styles.leftButton}
                    onPress={onPressLeftButton}>
                    <LeftButtonIcon width={24} height={24} color={textColor} />
                </Pressable>
            )}
            <TextInput
                onChangeText={onChangeText}
                placeholder={Strings.locationSearchPlaceholder}
                placeholderTextColor={Colors.placeholderGrey}
                style={styles.textInput}
                value={value}
            />
            {!!RightButtonIcon && (
                <Pressable
                    style={styles.rightButton}
                    onPress={onPressRightButton}>
                    <RightButtonIcon width={24} height={24} color={textColor} />
                </Pressable>
            )}
        </View>
    );
}

const getStyles = (
    textColor: string,
    isLeftButtonPresent: boolean,
    isRightButtonPresent: boolean,
) =>
    StyleSheet.create({
        textInput: {
            ...getFontStyles(FontClasses.S20L24, textColor),
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            height: 48,
            borderRadius: 8,
            paddingVertical: 12,
            paddingLeft: isLeftButtonPresent ? 40 : 16,
            paddingRight: isRightButtonPresent ? 40 : 16,
            color: textColor,
        },
        leftButton: {
            position: 'absolute',
            left: 8,
            top: 8,
            padding: 4,
        },
        rightButton: {
            position: 'absolute',
            right: 8,
            top: 8,
            padding: 4,
        },
    });

export default React.memo(LocationSearchBar);
