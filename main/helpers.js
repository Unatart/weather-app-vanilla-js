export const WEATHER_RECORD = {
    0: "sunny",
    1: "dull",
    2: "rainy",
    3: "storm",
    4: "cloudy",
    5: "fair",
    6: "snow",
};

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}