import { useCallback, useState } from 'react';

export default function useToggle(defaultValue = false) {
    const [value, setValue] = useState(defaultValue);

    const toggleValue = useCallback(() => {
        setValue(v => !v);
    }, []);

    return [value, toggleValue];
}
