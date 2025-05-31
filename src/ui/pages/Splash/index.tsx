import React, { useEffect } from 'react';
import SplashView from './SplashView.tsx';
import { useDispatch } from 'react-redux';
import { globalActions } from '@store/global/slice.ts';

function Splash() {
    const dispatch = useDispatch();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(globalActions.instantiateApp());
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, []);
    return <SplashView />;
}

export default React.memo(Splash);
