// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
import { AxiosError } from 'axios';
import Strings from '@constants/strings.ts';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const debounce = (fn: Function, timeout = 300) => {
    let timeoutId: NodeJS.Timeout | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (...args: any) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, timeout);
    };
};

export const getErrorMessage = (error: Error) => {
    let errorMessage;
    if (error instanceof AxiosError) {
        errorMessage = error?.response?.data?.error?.message;
    } else {
        errorMessage = error?.message;
    }
    return errorMessage || Strings.defaultErrorSubtitle;
};
