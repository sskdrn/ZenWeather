import { call, put, takeLatest } from 'redux-saga/effects';
import { makeApiCall } from '@api/api.requestor.ts';
import {
    BaseUrls,
    LocationAutocompleteResponseFieldParams,
    RequestMethods,
    urls,
} from '@api/api.constants.ts';
import { Coordinates } from '@models/weather-model.ts';
import { currentWeatherActions } from '@store/current-weather/slice.ts';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    GeocodingRequestParams,
    GeocodingResponse,
    LocationAutoCompleteSuggestionsResponse,
    LocationSearchParams,
    ParsedLocationAutocompleteResultList,
    TimeZoneResponse,
} from '@models/geocoding-model.ts';
import {
    getParsedLocationAutocompleteSearchResults,
    getParsedReverseGeocodedLocationData,
} from '@store/helpers.ts';
import { geocodingActions } from '@store/geocoding/slice.ts';
import { globalActions } from '@store/global/slice.ts';
import { ToastType } from '@components/Toast/config.ts';
import { saveCurrentLocation } from '../../services/persist/persist.ts';
import { reset } from '../../ui/navigation/navigation.service.ts';
import { getErrorMessage } from '@utils/generic-util.ts';
import strings from '@constants/strings.ts';
import { GeolocationResponse } from '@react-native-community/geolocation';

function* getLocationAutocompleteSearchResults(
    action: PayloadAction<LocationSearchParams>,
) {
    const { payload } = action;
    const { query, onSuccess, onFailure } = payload;
    try {
        const response: LocationAutoCompleteSuggestionsResponse = yield call(
            makeApiCall,
            {
                baseUrl: BaseUrls.GooglePlacesUrl,
                method: RequestMethods.Post,
                endpoint: urls.getLocationSearchAutoCompleteUrl(),
                params: {
                    includedPrimaryTypes: 'geocode',
                    input: query,
                    fields: LocationAutocompleteResponseFieldParams,
                },
            },
        );

        let parsedAutocompleteData: ParsedLocationAutocompleteResultList = [];

        if (response?.suggestions?.length) {
            parsedAutocompleteData = yield call(
                getParsedLocationAutocompleteSearchResults,
                response,
            );
        }

        if (onSuccess) {
            yield call(onSuccess, parsedAutocompleteData);
        }

        yield put(
            geocodingActions.setLocationAutocompleteSuccess(
                parsedAutocompleteData,
            ),
        );
    } catch (error) {
        const errorMessage = getErrorMessage(error as Error);
        if (onFailure) {
            yield call(onFailure, error as Error);
        }
        yield put(geocodingActions.setLocationAutocompleteError(errorMessage));
    }
}

function* getGeocodingData(action: PayloadAction<GeocodingRequestParams>) {
    const { payload } = action;
    const { placeId, locationName } = payload;
    try {
        const response: GeocodingResponse = yield call(makeApiCall, {
            baseUrl: BaseUrls.GooglePlacesUrl,
            method: RequestMethods.Get,
            endpoint: urls.getLocationCoordinatesUrl(placeId),
            params: {
                fields: 'location',
            },
        });

        const { location } = response;
        const { latitude, longitude } = location;

        const timeZoneResponse: TimeZoneResponse = yield call(makeApiCall, {
            baseUrl: BaseUrls.GoogleMapsUrl,
            method: RequestMethods.Get,
            endpoint: urls.getTimeZoneUrl(),
            params: {
                location: `${latitude},${longitude}`,
                timestamp: Date.now() / 1000,
            },
        });

        const { timeZoneId, dstOffset, rawOffset } = timeZoneResponse;

        const coordinates: Coordinates = { latitude, longitude };

        yield put(geocodingActions.clearGeocodingDataLoading());

        const currentLocation = {
            coordinates,
            locationName,
            timeZone: {
                timeZoneId,
                dstOffset,
                rawOffset,
            },
        };

        yield call(saveCurrentLocation, currentLocation);

        yield put(currentWeatherActions.setCurrentLocation(currentLocation));
        yield call(reset, 'CurrentWeather');
    } catch (error) {
        yield put(geocodingActions.clearGeocodingDataLoading());

        const errorMessage = getErrorMessage(error as Error);

        yield put(
            globalActions.setToastMessage({
                type: ToastType.error,
                message: errorMessage,
            }),
        );
    }
}

function* getReverseGeocodingData(action: PayloadAction<GeolocationResponse>) {
    try {
        const { latitude, longitude } = action.payload.coords;
        const coordinatesParameter = `${latitude},${longitude}`;
        const response: google.maps.GeocoderResponse = yield call(makeApiCall, {
            baseUrl: BaseUrls.GoogleMapsUrl,
            endpoint: urls.getReverseGeocodingUrl(),
            params: {
                latlng: coordinatesParameter,
            },
        });

        const { isValidData, coordinates, locationName } =
            getParsedReverseGeocodedLocationData(response);

        if (!isValidData) {
            throw new Error(strings.unableToDetectLocation);
        }

        const timeZoneResponse: TimeZoneResponse = yield call(makeApiCall, {
            baseUrl: BaseUrls.GoogleMapsUrl,
            method: RequestMethods.Get,
            endpoint: urls.getTimeZoneUrl(),
            params: {
                location: `${coordinates?.latitude},${coordinates?.longitude}`,
                timestamp: Date.now() / 1000,
            },
        });

        const { timeZoneId, dstOffset, rawOffset } = timeZoneResponse;

        const currentLocation = {
            coordinates,
            locationName,
            timeZone: {
                timeZoneId,
                dstOffset,
                rawOffset,
            },
        };

        yield call(saveCurrentLocation, currentLocation);

        yield put(currentWeatherActions.setCurrentLocation(currentLocation));
        yield call(reset, 'CurrentWeather');
    } catch (error) {
        if ((error as Error)?.message === strings.unableToDetectLocation) {
            yield put(
                globalActions.setToastMessage({
                    message: strings.unableToDetectLocation,
                    type: ToastType.information,
                }),
            );
        } else {
            yield put(
                globalActions.setToastMessage({
                    message: strings.defaultErrorSubtitle,
                    type: ToastType.error,
                }),
            );
        }
    } finally {
        yield put(geocodingActions.clearReverseGeocodingLoader());
    }
}

export function* watchGeocodingSagaRequests() {
    yield takeLatest(
        geocodingActions.getLocationAutocompleteResults.type,
        getLocationAutocompleteSearchResults,
    );
    yield takeLatest(geocodingActions.getGeocodingData.type, getGeocodingData);
    yield takeLatest(
        geocodingActions.getReverseGeocodingData.type,
        getReverseGeocodingData,
    );
}
