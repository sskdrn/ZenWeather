export const trimDecimals = (num: number, decimalPlaces = 2) => {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.trunc(num * multiplier) / multiplier;
};

// Converts temperature from celsius to fahrenheit;
export const convertCelsiusToFahrenheit = (
    temperatureInCelsius: number,
    roundValue = true,
) => {
    const temperatueInFahrenheit = temperatureInCelsius * 1.8 + 32;
    return roundValue
        ? Math.round(temperatueInFahrenheit)
        : temperatueInFahrenheit;
};

export const convertFahrenheitToCelsius = (
    temperatureInFahrenheit: number,
    roundValue = true,
) => {
    const temperatureInCelsius = temperatureInFahrenheit * 1.8 + 32;
    return roundValue ? Math.round(temperatureInCelsius) : temperatureInCelsius;
};
