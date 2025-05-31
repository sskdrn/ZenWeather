import {
    LocationAutoCompleteSuggestionsResponse,
    ParsedLocationAutocompleteResultList,
} from '@models/geocoding-model.ts';
import { ParsedReverseGeocodingData } from '@models/weather-model.ts';

const reverseGeocodingLocationCategories = [
    'route',
    'neighborhood',
    'sublocality',
    'locality',
];

export const getParsedReverseGeocodedLocationData = (
    data: google.maps.GeocoderResponse,
) => {
    const geoCodedLocationData: ParsedReverseGeocodingData = {
        isValidData: false,
    };
    if (
        !data?.results?.length ||
        !data?.results?.[0]?.address_components?.length
    ) {
        return geoCodedLocationData;
    }
    const result = data?.results[0];
    const addressComponents = result?.address_components;
    const locationName =
        addressComponents?.find(component =>
            reverseGeocodingLocationCategories.includes(component?.types[0]),
        )?.short_name || '';

    if (!locationName) {
        return geoCodedLocationData;
    }
    geoCodedLocationData.isValidData = true;
    geoCodedLocationData.coordinates = {
        latitude: result?.geometry?.location?.lat as unknown as number,
        longitude: result?.geometry?.location?.lng as unknown as number,
    };
    geoCodedLocationData.locationName = locationName;

    return geoCodedLocationData;
};

export const getParsedLocationAutocompleteSearchResults = (
    response: LocationAutoCompleteSuggestionsResponse,
): ParsedLocationAutocompleteResultList => {
    return response.suggestions.map(suggestion => {
        const placeDetails = suggestion.placePrediction;
        const { placeId, text, structuredFormat } = placeDetails;
        const { mainText, secondaryText } = structuredFormat;
        return {
            placeId,
            fullText: text.text,
            mainText: mainText?.text,
            secondaryText: secondaryText?.text,
        };
    });
};
