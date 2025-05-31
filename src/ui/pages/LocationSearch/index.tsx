import WeatherSearchView from './LocationSearchView.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/types';
import React, { useCallback, useEffect, useState } from 'react';
import { geocodingActions } from '@store/geocoding/slice.ts';
import { useFocusEffect } from '@react-navigation/core';
import { detectCurrentLocationCoordinates } from '@utils/geolocation-util';
import { fetchLocationResults } from '@utils/location-util';
import {
    GeolocationError,
    GeolocationResponse,
} from '@react-native-community/geolocation';
import { globalActions } from '@store/global/slice.ts';
import Strings from '@constants/strings.ts';
import { ToastType } from '@components/Toast/config.ts';

function WeatherSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const {
        locationAutocomplete: locationAutocompleteData,
        geocoding: geocodingData,
    } = useSelector((rootState: RootState) => rootState.geocoding);

    const {
        isLoading: isAutocompleteLoading,
        data: autocompleteData,
        error: autoCompleteError,
        noResultsFound,
    } = locationAutocompleteData;
    const { isLoading: isGeocodingLoading } = geocodingData;

    useFocusEffect(
        useCallback(() => {
            dispatch(geocodingActions.resetLocationAutoCompleteData());
        }, []),
    );

    const locationDetectSuccessHandler = (data: GeolocationResponse) => {
        dispatch(geocodingActions.getReverseGeocodingData(data));
    };

    const locationDetectFailureHandler = (error: GeolocationError) => {
        if (error.code === error.PERMISSION_DENIED) {
            dispatch(
                globalActions.setToastMessage({
                    message: Strings.locationPermissionDenied,
                    type: ToastType.information,
                }),
            );
        } else {
            dispatch(
                globalActions.setToastMessage({
                    message: Strings.unableToDetectLocation,
                    type: ToastType.information,
                }),
            );
        }
    };

    const detectLocation = () => {
        detectCurrentLocationCoordinates({
            onSuccess: locationDetectSuccessHandler,
            onFailure: locationDetectFailureHandler,
        });
    };

    useEffect(() => {
        fetchLocationResults(searchQuery);
    }, [searchQuery]);

    return (
        <WeatherSearchView
            isLoading={isAutocompleteLoading || isGeocodingLoading}
            results={autocompleteData}
            searchQuery={searchQuery}
            noResultsFound={noResultsFound}
            errorMessage={autoCompleteError as string}
            setSearchQuery={setSearchQuery}
            detectLocation={detectLocation}
        />
    );
}

export default React.memo(WeatherSearch);
