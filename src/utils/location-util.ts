import { getStore } from '@store/rootReducer.ts';
import { geocodingActions } from '@store/geocoding/slice.ts';
import { debounce } from '@utils/generic-util.ts';

export const fetchLocationResults = debounce((inputSearchQuery: string) => {
    const store = getStore();
    const processedQuery = inputSearchQuery.trim();
    if (processedQuery) {
        store.dispatch(
            geocodingActions.getLocationAutocompleteResults({
                query: processedQuery,
            }),
        );
    }
}, 1500);
