import React from 'react';
import { SvgProps } from 'react-native-svg';
import MathIcon from '@svg/MathIcon.svg';
import InfoIcon from '@svg/InfoIcon.svg';
import { RootStackParamsList } from '@navigation/navigation';

interface SettingsOption {
    type: SettingsType;
    displayName: string;
    icon: React.FC<SvgProps>;
}

export enum SettingsType {
    AppInfo = 'appInfo',
    Units = 'units',
}

export const SettingsOptionScreenKeys: Record<
    SettingsType,
    keyof RootStackParamsList
> = {
    units: 'UnitsSettings',
    appInfo: 'AppInfoSettings',
};

export const SettingsOptions: SettingsOption[] = [
    {
        type: SettingsType.Units,
        displayName: 'Units',
        icon: MathIcon,
    },
    {
        type: SettingsType.AppInfo,
        displayName: 'About ZenWeather',
        icon: InfoIcon,
    },
];
