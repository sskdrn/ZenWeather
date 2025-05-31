import { Colors } from '@styles/colors.ts';

export enum ToastType {
    information = 'information',
    success = 'success',
    error = 'error',
}

export const ToastStyles: Record<ToastType, object> = {
    [ToastType.success]: {
        backgroundColor: Colors.alertGreen,
    },
    [ToastType.information]: {
        backgroundColor: Colors.alertBlack,
    },
    [ToastType.error]: {
        backgroundColor: Colors.alertRed,
    },
};
