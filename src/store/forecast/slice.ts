import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GenericStoreData } from '@store/types';
import { WeatherForecastData } from '@models/weather-model';

const initialState: GenericStoreData<WeatherForecastData> = {
    isLoading: false,
    data: null,
    error: null,
};

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {
        getWeatherForecast: state => {
            state.isLoading = true;
            state.data = null;
            state.error = null;
        },
        setWeatherForecastSuccess: (
            state,
            action: PayloadAction<WeatherForecastData>,
        ) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        },
        setWeatherForecastError: (
            state,
            action: PayloadAction<Error | string>,
        ) => {
            state.isLoading = false;
            state.data = null;
            state.error = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const forecastActions = forecastSlice.actions;

export default forecastSlice.reducer;
