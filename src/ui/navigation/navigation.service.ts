import {
    CommonActions,
    createNavigationContainerRef,
    StackActions,
} from '@react-navigation/core';
import { RootStackParamsList } from './navigation';

export const navigationRef =
    createNavigationContainerRef<RootStackParamsList>();

export function navigate(name: keyof RootStackParamsList) {
    if (navigationRef?.isReady()) {
        navigationRef.navigate(name);
    }
}

export function replace(name: keyof RootStackParamsList) {
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(StackActions.replace(name));
    }
}

export function reset(name: keyof RootStackParamsList) {
    if (navigationRef?.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name }],
            }),
        );
    }
}

export function goBack() {
    if (navigationRef?.isReady() && navigationRef?.canGoBack()) {
        navigationRef?.goBack();
    }
}
