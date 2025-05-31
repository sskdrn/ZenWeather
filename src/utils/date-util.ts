export const getFormattedDateTime = (dateObj: Date) => {
    const now = dateObj;

    const day = String(now.getDate()).padStart(2, '0'); // Ensure day is two digits
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits (months are 0-indexed)
    const year = now.getFullYear();

    const hours = String(now.getHours()).padStart(2, '0'); // Ensure hours are two digits
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Ensure minutes are two digits
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Ensure seconds are two digits

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

export const getConvertedTime = (dt: number, timezone: number) => {
    const utc_seconds = dt + timezone;
    const utc_milliseconds = utc_seconds * 1000;
    return new Date(utc_milliseconds).getTime();
};

export const getTimeZoneConvertedTime = (
    time: number,
    timeZoneOffset = 0,
    dstOffset = 0,
) => time + (timeZoneOffset - 330 * 60) * 1000 + dstOffset * 1000;

export const getFormattedTimeString = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};

export const getFormattedShortDateString = (date: Date) => {
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short', // Abbreviated month
    });
};
