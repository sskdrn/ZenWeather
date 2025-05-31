import { Colors } from './colors';

export enum FontClasses {
    S12L20 = 'S12L20',
    S14L20 = 'S14L20',
    S16L24 = 'S16L24',
    S18L24 = 'S18L24',
    S20L24 = 'S20L24',
    S24L28 = 'S24L28',
    S24L32 = 'S24L32',
    S32L40 = 'S32L40',
    S40L48 = 'S40L48',
    S48L64 = 'S48L64',
}

export enum FontStyles {
    ExtraLight = 'Outfit-ExtraLight',
    Light = 'Outfit-Light',
    Thin = 'Outfit-Thin',
    Medium = 'Outfit-Medium',
    Regular = 'Outfit-Regular',
    SemiBold = 'Outfit-SemiBold',
    Bold = 'Outfit-Bold',
    ExtraBold = 'Outfit-ExtraBold',
    Black = 'Outfit-Black',
}

export const getFontStyles = (
    fontClass = FontClasses.S14L20,
    color = Colors.black,
    fontStyle = FontStyles.Regular,
) => {
    const [fontSize, lineHeight] = fontClass
        .toString()
        .slice(1)
        .split('L')
        .map(val => +val);
    return {
        fontFamily: fontStyle,
        fontSize,
        lineHeight,
        color: color,
    };
};
