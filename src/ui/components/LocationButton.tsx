import LocationIcon from '@svg/LocationIcon.svg';
import { FontClasses, getFontStyles } from '@styles/fonts.ts';
import ChevronDownIcon from '@svg/ChevronDownIcon.svg';
import React from 'react';
import { WeatherColorScheme } from '@styles/colors.ts';
import { ViewStyleProps } from '@components/types';
import TransparentButton from '@components/TransparentButton.tsx';

interface LocationButtonProps {
    onPress?: () => void;
    rippleColor?: string;
    buttonText?: string;
    colorScheme: WeatherColorScheme;
    style?: ViewStyleProps;
}

function LocationButton({
    onPress,
    buttonText = '',
    style,
    colorScheme,
}: LocationButtonProps) {
    return (
        <TransparentButton
            onPress={onPress}
            style={style}
            leadingIcon={
                <LocationIcon
                    width={24}
                    height={24}
                    color={colorScheme.foreground}
                />
            }
            trailingIcon={
                <ChevronDownIcon
                    width={24}
                    height={24}
                    color={colorScheme.foreground}
                />
            }
            textStyle={getFontStyles(
                FontClasses.S20L24,
                colorScheme.foreground,
            )}
            buttonText={buttonText}
        />
    );
}

export default React.memo(LocationButton);
