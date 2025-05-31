import React, { useCallback } from 'react';
import { globalActions } from '@store/global/slice.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/types';
import ToastView from '@components/Toast/ToastView.tsx';

function Toast() {
    const dispatch = useDispatch();

    const toastData = useSelector(
        (rootState: RootState) => rootState.global.toast,
    );

    const closeToast = useCallback(() => {
        dispatch(globalActions.clearToastMessage());
    }, []);

    if (!toastData.message) {
        return <></>;
    }

    return (
        <ToastView
            message={toastData.message}
            type={toastData.type}
            closeToast={closeToast}
        />
    );
}

export default React.memo(Toast);
