import React, { useCallback } from 'react';
import SettingsListView from '@pages/Settings/SettingsList/SettingsListView.tsx';
import { navigate } from '@navigation/navigation.service.ts';
import {
    SettingsOptionScreenKeys,
    SettingsType,
} from '@pages/Settings/SettingsList/config.ts';

export default function SettingsList() {
    const settingsOptionClickHandler = useCallback((option: SettingsType) => {
        const screenKey = SettingsOptionScreenKeys[option];
        if (screenKey) {
            navigate(screenKey);
        }
    }, []);
    return (
        <SettingsListView
            settingsOptionClickHandler={settingsOptionClickHandler}
        />
    );
}
