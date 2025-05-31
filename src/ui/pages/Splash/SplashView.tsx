import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@styles/colors.ts';
import AppLogo from '@svg/AppLogo.svg';
import Strings from '@constants/strings.ts';
import { FontClasses, FontStyles, getFontStyles } from '@styles/fonts.ts';

function SplashView() {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <AppLogo color={Colors.white} />
                <Text
                    style={getFontStyles(
                        FontClasses.S48L64,
                        Colors.white,
                        FontStyles.Black,
                    )}>
                    {Strings.appTitle}
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: Colors.logoColor,
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
});
export default React.memo(SplashView);
