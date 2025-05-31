import { OnActionDoneParams } from '@store/types';

interface LocalNames {
    ta: string;
}

export interface GeocodedCountry {
    name: string;
    local_names: LocalNames;
    lat: string;
    long: string;
    country: string;
    state?: string;
}

export interface LocationSearchParams
    extends OnActionDoneParams<ParsedLocationAutocompleteResultList> {
    query: string;
}

export interface PlacePrediction {
    placeId: string;
    text: {
        text: string;
    };
    structuredFormat: {
        mainText: {
            text: string;
        };
        secondaryText: {
            text: string;
        };
    };
}

export interface LocationAutoCompleteSuggestionsResponse {
    suggestions: {
        placePrediction: PlacePrediction;
    }[];
}

export interface ParsedLocationAutocompleteResult {
    placeId: string;
    fullText: string;
    mainText: string;
    secondaryText: string;
}

export type ParsedLocationAutocompleteResultList =
    ParsedLocationAutocompleteResult[];

export interface GeocodingRequestParams {
    placeId: string;
    locationName: string;
}

export interface GeocodingResponse {
    location: {
        latitude: number;
        longitude: number;
    };
}

export interface TimeZoneResponse {
    dstOffset: number;
    rawOffset: number;
    status: string;
    timeZoneId: string;
    timeZoneName: string;
}
