const WEATHER_RECORD = {
    0: "sunny",
    1: "dull",
    2: "rain",
    3: "storm",
    4: "cloudy",
    5: "fair"
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function loadWeatherData() {
    const [urls, temperature] = await Promise.all([
        fetch("./requests_data_mocks/weather_img.json")
        .then((response) => response.json()).then((data) => data.result),
        fetch("./requests_data_mocks/weather_temperature.json")
        .then((response) => response.json()).then((data) => data.result)
    ]);

    // order guaranteed
    const weather_map = {};
    for (let i = 0; i < urls.length; i++) {
        weather_map[urls[i].status] = {
            "url": urls[i].url,
            "celsius": temperature[i].celsius,
            "fahrenheit": temperature[i].fahrenheit
        }
    }

    return [weather_map, urls.length - 1];
}

function createMain() {
    const widget = document.createElement("div");
    widget.className = "main";

    return widget
}

function createBackground(url) {
    const background = document.createElement("div");
    background.className = "image";
    background.style.backgroundImage = `url(${url})`;

    return background;
}

function createTemperature(celsius, fahrenheit) {
    const temperature = document.createElement("div");
    temperature.className = "temperature";
    temperature.innerText = `${celsius}°C/${fahrenheit}°F` // TODO: I want Fahrenheit temperature to be more small

    return temperature;
}

function createStatus(status_string) {
    const status = document.createElement("div");
    status.className = "status";
    status.innerText = status_string;

    return status;
}

function createGreeting() {
    const greeting = document.createElement("div");
    greeting.className = "greeting";
    greeting.innerText = "Current weather";

    return greeting;
}

export async function createWeatherWidget(root_id) {
    const [weather_map, weather_map_length] = await loadWeatherData();

    const current_weather_type = getRandomInt(0, weather_map_length);
    const current_weather = weather_map[WEATHER_RECORD[current_weather_type]];

    const widget = createMain();
    const temperature = createTemperature(current_weather.celsius, current_weather.fahrenheit);
    const status = createStatus(WEATHER_RECORD[current_weather_type]);
    const background = createBackground(current_weather.url);
    const greeting = createGreeting();

    widget.appendChild(background);
    widget.appendChild(temperature);
    widget.appendChild(status);
    widget.appendChild(greeting);
    root_id.appendChild(widget);
}