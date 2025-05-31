import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WeatherColorScheme } from '@styles/colors.ts';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import AppLogo from '@svg/AppLogo.svg';
import Strings, { AppInfoStrings } from '@constants/strings.ts';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';
import LinkText from '@components/LinkText.tsx';
import { AppInfoLinks } from '@constants/links.ts';

interface AppInfoSettingsViewProps {
    getLinkPressHandler?: (url: string) => () => void;
}

export default function AppInfoSettingsView({
    getLinkPressHandler,
}: AppInfoSettingsViewProps) {
    const weatherColorScheme = useWeatherColorScheme();
    const styles = getStyles(weatherColorScheme);
    const genericTextStyle = getFontStyles(
        FontClasses.S18L24,
        weatherColorScheme.foreground,
        FontStyles.Regular,
    );

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <View style={styles.logoRow}>
                        <AppLogo
                            color={weatherColorScheme.foreground}
                            width={64}
                            height={64}
                        />
                        <Text
                            style={getFontStyles(
                                FontClasses.S48L64,
                                weatherColorScheme.foreground,
                                FontStyles.Black,
                            )}>
                            {Strings.appTitle}
                        </Text>
                    </View>
                    <Text
                        style={getFontStyles(
                            FontClasses.S24L28,
                            weatherColorScheme.foreground,
                            FontStyles.Regular,
                        )}>
                        {AppInfoStrings.tagline}
                    </Text>
                </View>
                <View style={styles.creditsSection}>
                    <View style={styles.textRow}>
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.designedAndDevelopedBy}
                        </Text>
                        <LinkText
                            textStyle={[genericTextStyle, styles.linkTopMargin]}
                            onPress={getLinkPressHandler?.(
                                AppInfoLinks.developerName,
                            )}
                            linkText={AppInfoStrings.developerName}
                        />
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.fullStop}
                        </Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.builtWith}
                        </Text>
                        <LinkText
                            textStyle={[genericTextStyle, styles.linkTopMargin]}
                            onPress={getLinkPressHandler?.(
                                AppInfoLinks.reactNative,
                            )}
                            linkText={AppInfoStrings.reactNative}
                        />
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.fullStop}
                        </Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.weatherAndLocationServices}
                        </Text>
                        <LinkText
                            textStyle={[genericTextStyle, styles.linkTopMargin]}
                            onPress={getLinkPressHandler?.(
                                AppInfoLinks.googleApis,
                            )}
                            linkText={AppInfoStrings.googleApis}
                        />
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.fullStop}
                        </Text>
                    </View>
                    <View style={styles.textRow}>
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.fontsAndIcons}
                        </Text>
                        <LinkText
                            textStyle={[genericTextStyle, styles.linkTopMargin]}
                            onPress={getLinkPressHandler?.(
                                AppInfoLinks.googleFonts,
                            )}
                            linkText={AppInfoStrings.googleFonts}
                        />
                        <Text style={genericTextStyle}>
                            {AppInfoStrings.fullStop}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const getStyles = (weatherColorScheme: WeatherColorScheme) =>
    StyleSheet.create({
        safeAreaView: {
            flex: 1,
            backgroundColor: weatherColorScheme.background,
        },
        logoRow: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 20,
        },
        container: {
            flex: 1,
            gap: 56,
            padding: 16,
            alignItems: 'center',
        },
        linkTopMargin: {
            marginTop: 0,
        },
        creditsSection: {
            alignSelf: 'flex-start',
            gap: 4,
        },
        textRow: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
    });
