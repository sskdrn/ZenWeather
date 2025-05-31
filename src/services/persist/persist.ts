import { MMKVLoader } from 'react-native-mmkv-storage';
import { CurrentLocation } from '@models/weather-model.ts';
import { AppSettings } from '@models/global-model.ts';

//TODO: Create a new encrypted instance for storing login info later
const Storage = new MMKVLoader().initialize();

const LocationKey = 'LOCATION_KEY';
const AppSettingsKey = 'APP_SETTINGS_KEY';

export const saveCurrentLocation = async (location: CurrentLocation) => {
    try {
        await Storage.setMapAsync(LocationKey, location);
        return true;
    } catch {
        return false;
    }
};

export const getCurrentLocation = async () => {
    try {
        const location = await Storage.getMapAsync(LocationKey);
        if (!location) {
            return null;
        }
        return location as CurrentLocation;
    } catch {
        return null;
    }
};

export const removeCurrentLocation = () => {
    Storage.removeItem(LocationKey);
};

export const saveAppSettings = async (appSettings: AppSettings) => {
    try {
        await Storage.setMapAsync(AppSettingsKey, appSettings);
        return true;
    } catch {
        return false;
    }
};

export const getAppSettings = async () => {
    try {
        const appSettings = await Storage.getMapAsync(AppSettingsKey);
        if (appSettings) {
            return null;
        }
        return appSettings as AppSettings;
    } catch {
        return null;
    }
};

export const removeAppSettings = () => {
    Storage.removeItem(AppSettingsKey);
};
