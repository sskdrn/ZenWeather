import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import LocalityIcon from '@svg/LocalityIcon.svg';
import { Colors } from '@styles/colors';

interface LocationCardProps {
    DisplayIcon?: React.FC<SvgProps>;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
    onPress?: () => void;
}

function LocationCard({
    DisplayIcon = LocalityIcon,
    title,
    subtitle,
    backgroundColor,
    textColor,
    onPress,
}: LocationCardProps) {
    const styles = getStyles(backgroundColor, textColor);

    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: '#ffffff' }}
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.9 },
            ]}>
            <DisplayIcon width={32} height={32} color={textColor} />
            <View style={styles.textContainer}>
                <Text style={styles.titleText} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.subtitleText} numberOfLines={1}>
                    {subtitle}
                </Text>
            </View>
        </Pressable>
    );
}

const getStyles = (backgroundColor = Colors.white, textColor = Colors.black) =>
    StyleSheet.create({
        container: {
            backgroundColor,
            flexDirection: 'row',
            gap: 8,
            alignItems: 'center',
            shadowColor: '#000000',
            elevation: 4,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            padding: 16,
            borderRadius: 8,
        },
        textContainer: {
            flex: 1,
        },
        titleText: getFontStyles(
            FontClasses.S16L24,
            textColor,
            FontStyles.Bold,
        ),
        subtitleText: getFontStyles(FontClasses.S14L20, textColor),
    });

export default React.memo(LocationCard);
