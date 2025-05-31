import { FlatList, SafeAreaView, View } from 'react-native';
import React, { useCallback } from 'react';
import LocationSearchBar from '@components/LocationSearchBar.tsx';
import getStyles from '@pages/LocationSearch/styles.ts';
import SearchIcon from '@svg/SearchIcon.svg';
import DetectLocationIcon from '@svg/DetectLocationIcon.svg';
import LocationCard from '@components/LocationCard.tsx';
import LocalityIcon from '@svg/LocalityIcon.svg';
import CityImage from '@svg/CityIcon.svg';

import NetworkLoaderWithError from '@components/NetworkLoaderWithError.tsx';
import useWeatherColorScheme from '@hooks/useWeatherColorScheme.ts';
import Strings from '@constants/strings.ts';
import {
    ParsedLocationAutocompleteResult,
    ParsedLocationAutocompleteResultList,
} from '@models/geocoding-model.ts';
import { useDispatch } from 'react-redux';
import { geocodingActions } from '@store/geocoding/slice.ts';

interface LocationSearchViewProps {
    isLoading?: boolean;
    errorMessage?: string | null;
    noResultsFound?: boolean;
    results?: ParsedLocationAutocompleteResultList | null;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    detectLocation?: () => void;
}

const noResultsFoundErrorProps = {
    errorTitle: Strings.noLocationResultFoundTitle,
    errorSubtitle: Strings.noLocationResultFoundSubtitle,
    displayIcon: CityImage,
};

function LocationSearchView({
    results = [],
    noResultsFound,
    errorMessage,
    isLoading,
    searchQuery,
    setSearchQuery,
    detectLocation,
}: LocationSearchViewProps) {
    const weatherColorScheme = useWeatherColorScheme();
    const styles = getStyles(weatherColorScheme);
    const noResultsProps = noResultsFound ? noResultsFoundErrorProps : {};
    const dispatch = useDispatch();

    const renderItem = useCallback(
        ({ item }: { item: ParsedLocationAutocompleteResult }) => {
            const handleLocationSelect = () => {
                dispatch(
                    geocodingActions.getGeocodingData({
                        locationName: item.mainText,
                        placeId: item.placeId,
                    }),
                );
            };
            return (
                <LocationCard
                    key={item.placeId}
                    DisplayIcon={LocalityIcon}
                    title={item.mainText}
                    subtitle={item.secondaryText}
                    textColor={weatherColorScheme.complementaryForeground}
                    backgroundColor={weatherColorScheme.complementaryBackground}
                    onPress={handleLocationSelect}
                />
            );
        },
        [weatherColorScheme],
    );

    return (
        <SafeAreaView style={styles.safeViewContainer}>
            <View style={styles.container}>
                <LocationSearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    leftButtonIcon={SearchIcon}
                    rightButtonIcon={DetectLocationIcon}
                    onPressRightButton={detectLocation}
                    textColor={weatherColorScheme.foreground}
                />
                <NetworkLoaderWithError
                    isLoading={isLoading}
                    errorSubtitle={errorMessage}
                    {...noResultsProps}>
                    <View style={styles.cardListContainer}>
                        <FlatList
                            contentContainerStyle={styles.cardListContainer}
                            data={results}
                            renderItem={renderItem}
                        />
                    </View>
                </NetworkLoaderWithError>
            </View>
        </SafeAreaView>
    );
}

export default React.memo(LocationSearchView);
