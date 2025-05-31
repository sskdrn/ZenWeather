import { useCallback, useState } from 'react';

export default function useBoolean(
    defaultValue = false,
): [boolean, () => void, () => void] {
    const [value, setValue] = useState(defaultValue);

    const setValueTrue = useCallback(() => {
        setValue(true);
    }, []);

    const setValueFalse = useCallback(() => {
        setValue(false);
    }, []);

    return [value, setValueTrue, setValueFalse];
}
