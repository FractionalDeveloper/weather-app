export interface Weather {
    current: CurrentWeatherData;
}

interface CurrentWeatherData {
    temperature_2m: number;
}