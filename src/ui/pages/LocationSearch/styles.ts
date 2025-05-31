import { WeatherColorScheme } from '@styles/colors.ts';

const getStyles = (colorScheme: WeatherColorScheme) => ({
    safeViewContainer: {
        flex: 1,
        backgroundColor: colorScheme.background,
        gap: 20,
    },
    container: {
        flex: 1,
        gap: 32,
        padding: 24,
    },
    cardListContainer: {
        gap: 16,
    },
});

export default getStyles;
