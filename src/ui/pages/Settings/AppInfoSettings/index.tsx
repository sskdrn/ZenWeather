import React, { useCallback } from 'react';
import AppInfoSettingsView from '@pages/Settings/AppInfoSettings/AppInfoSettingsView.tsx';
import { Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import { globalActions } from '@store/global/slice.ts';
import Strings from '@constants/strings.ts';
import { ToastType } from '@components/Toast/config.ts';

export default function AppInfoSettings() {
    const dispatch = useDispatch();

    const handleOpenLinkFailure = useCallback(() => {
        dispatch(
            globalActions.setToastMessage({
                type: ToastType.error,
                message: Strings.defaultErrorSubtitle,
            }),
        );
    }, []);
    const getLinkPressHandler = useCallback(
        (url: string) => () => {
            Linking.canOpenURL(url).then(canOpenUrl => {
                if (canOpenUrl) {
                    Linking.openURL(url).catch(handleOpenLinkFailure);
                } else {
                    handleOpenLinkFailure();
                }
            });
        },
        [handleOpenLinkFailure],
    );
    return <AppInfoSettingsView getLinkPressHandler={getLinkPressHandler} />;
}
