import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import CautionIcon from '@svg/CautionIcon.svg';

interface AlertCardProps {
    DisplayIcon?: React.FC<SvgProps>;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
}

function AlertCard({
    DisplayIcon = CautionIcon,
    title,
    subtitle,
    backgroundColor,
    textColor,
}: AlertCardProps) {
    const styles = getStyles(backgroundColor, textColor);
    return (
        <Pressable
            android_ripple={{ color: '#ffffff' }}
            style={({ pressed }) => [
                styles.container,
                pressed && { opacity: 0.9 },
            ]}>
            <DisplayIcon width={40} height={40} color={'white'} />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>
        </Pressable>
    );
}

const getStyles = (backgroundColor = '#CE5454', textColor = 'white') =>
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
        textContainer: {},
        titleText: getFontStyles(
            FontClasses.S16L24,
            textColor,
            FontStyles.Bold,
        ),
        subtitleText: getFontStyles(FontClasses.S14L20, textColor),
    });

export default React.memo(AlertCard);
