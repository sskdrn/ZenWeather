import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentLocation, CurrentWeather } from '@models/weather-model.ts';
import { GenericStoreData } from '../types';
interface CurrentWeatherData {
    currentLocation: CurrentLocation;
    weatherInfo: GenericStoreData<CurrentWeather>;
}
const initialState: CurrentWeatherData = {
    currentLocation: {
        locationName: null,
        coordinates: null,
    },
    weatherInfo: {
        isLoading: false,
        data: null,
        error: null,
    },
};

export const currentWeatherSlice = createSlice({
    name: 'currentWeather',
    initialState,
    reducers: {
        getCurrentWeather: state => {
            state.weatherInfo.isLoading = true;
            state.weatherInfo.data = null;
            state.weatherInfo.error = null;
        },
        setCurrentWeatherSuccess: (
            state,
            action: PayloadAction<CurrentWeather>,
        ) => {
            state.weatherInfo.isLoading = false;
            state.weatherInfo.data = action.payload;
            state.weatherInfo.error = null;
        },
        setCurrentWeatherError: (state, action: PayloadAction<string>) => {
            state.weatherInfo.isLoading = false;
            state.weatherInfo.data = null;
            state.weatherInfo.error = action.payload;
        },
        setCurrentLocation: (state, action: PayloadAction<CurrentLocation>) => {
            state.currentLocation = action.payload;
        },
        clearCurrentLocation: state => {
            state.currentLocation = { locationName: null, coordinates: null };
        },
    },
});

// Action creators are generated for each case reducer function
export const currentWeatherActions = currentWeatherSlice.actions;

export default currentWeatherSlice.reducer;
