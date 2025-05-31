import { useEffect, useState } from 'react';
import { getTimeZoneConvertedTime } from '@utils/date-util.ts';

interface TimeConfig {
    startTime?: number;
    timeZoneOffset?: number;
    dstOffset?: number;
}
export default function useTime(config: TimeConfig) {
    const {
        startTime = Date.now(),
        timeZoneOffset = 0,
        dstOffset = 0,
    } = config;
    const [time, setTime] = useState(
        getTimeZoneConvertedTime(startTime, timeZoneOffset, dstOffset),
    );

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(currentDate => currentDate + 1000);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    return time;
}
