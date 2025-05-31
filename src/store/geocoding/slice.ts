import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    GeocodingRequestParams,
    LocationSearchParams,
    ParsedLocationAutocompleteResultList,
} from '@models/geocoding-model';
import { GenericStoreData } from '@store/types';
import { Coordinates } from '@models/weather-model.ts';
import { GeolocationResponse } from '@react-native-community/geolocation';

interface LocationAutocompleteState
    extends GenericStoreData<ParsedLocationAutocompleteResultList> {
    noResultsFound: boolean;
}
interface GeocodingSliceState {
    locationAutocomplete: LocationAutocompleteState;
    geocoding: Pick<GenericStoreData<Coordinates>, 'isLoading'>;
    reverseGeocoding: Pick<GenericStoreData<never>, 'isLoading'>;
}
const initialState: GeocodingSliceState = {
    locationAutocomplete: {
        isLoading: false,
        data: null,
        error: null,
        noResultsFound: false,
    },
    geocoding: {
        isLoading: false,
    },
    reverseGeocoding: {
        isLoading: false,
    },
};

export const geocodingSlice = createSlice({
    name: 'geocoding',
    initialState,
    reducers: {
        getLocationAutocompleteResults: {
            reducer: state => {
                state.locationAutocomplete.isLoading = true;
                state.locationAutocomplete.data = null;
                state.locationAutocomplete.error = null;
                state.locationAutocomplete.noResultsFound = false;
            },
            prepare: (payload: LocationSearchParams) => {
                return { payload };
            },
        },
        setLocationAutocompleteSuccess: (
            state,
            action: PayloadAction<ParsedLocationAutocompleteResultList>,
        ) => {
            state.locationAutocomplete.isLoading = false;
            state.locationAutocomplete.data = action.payload;
            state.locationAutocomplete.error = null;
            state.locationAutocomplete.noResultsFound = !action.payload?.length;
        },
        setLocationAutocompleteError: (
            state,
            action: PayloadAction<string>,
        ) => {
            state.locationAutocomplete.isLoading = false;
            state.locationAutocomplete.data = null;
            state.locationAutocomplete.error = action.payload;
        },

        resetLocationAutoCompleteData: state => {
            state.locationAutocomplete.isLoading = false;
            state.locationAutocomplete.data = null;
            state.locationAutocomplete.error = null;
            state.locationAutocomplete.noResultsFound = false;
        },

        getGeocodingData: {
            reducer: state => {
                state.geocoding.isLoading = true;
            },
            prepare: (payload: GeocodingRequestParams) => {
                return { payload };
            },
        },

        clearGeocodingDataLoading: state => {
            state.geocoding.isLoading = false;
        },

        getReverseGeocodingData: {
            reducer: state => {
                state.reverseGeocoding.isLoading = true;
            },
            prepare: (payload: GeolocationResponse) => {
                return { payload };
            },
        },

        clearReverseGeocodingLoader: state => {
            state.reverseGeocoding.isLoading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const geocodingActions = geocodingSlice.actions;

export default geocodingSlice.reducer;
