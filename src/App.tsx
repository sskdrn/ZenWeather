import React from 'react';
import store from './store/rootReducer';
import { Provider } from 'react-redux';

import Toast from '@components/Toast';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './ui/navigation/navigation.service.ts';
import RootNavigationStack from './ui/navigation';

export default function App() {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <RootNavigationStack />
                </NavigationContainer>
                <Toast />
            </Provider>
        </React.StrictMode>
    );
}
