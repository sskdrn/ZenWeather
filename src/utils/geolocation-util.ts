import Geolocation, {
    GeolocationConfiguration,
    GeolocationError,
    GeolocationOptions,
    GeolocationResponse,
} from '@react-native-community/geolocation';

export interface CurrentLocationFetchParams {
    onSuccess: (position: GeolocationResponse) => void;
    onFailure?: (error: GeolocationError) => void;
    options?: GeolocationOptions;
}

export const setGeolocationConfig = (config: GeolocationConfiguration) => {
    Geolocation.setRNConfiguration(config);
};

export const detectCurrentLocationCoordinates = ({
    onSuccess,
    onFailure,
    options,
}: CurrentLocationFetchParams) => {
    Geolocation.getCurrentPosition(onSuccess, onFailure, options);
};
