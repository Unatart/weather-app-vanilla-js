import {WEATHER_RECORD} from "../main/helpers.js";

async function loadWeatherData() {
    const [urls, temperature] = await Promise.all([
        fetch("../requests_data_mocks/weather_img.json")
        .then((response) => response.json()).then((data) => data.result),
        fetch("../requests_data_mocks/weather_temperature.json")
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

    return weather_map;
}

async function loadStatsAndAdvices() {
    const advices = await fetch("../requests_data_mocks/weather_advices.json").then((data) => data.json()).then((data) => data.result);

    // order guaranteed
    const advice_map = {};
    for (let i = 0; i < advices.length; i++) {
        advice_map[advices[i].status] = advices[i].advice;
    }

    return advice_map;
}

function createMain() {
    const widget = document.createElement("div");
    widget.className = "main";

    return widget
}

function createBackground(url) {
    const background = document.createElement("div");

    const image = document.createElement("div");
    image.className = "image";
    image.style.backgroundImage = `url(${url})`;

    const overlay = document.createElement("div");
    overlay.className = "overlay";

    background.appendChild(image);
    background.appendChild(overlay);

    return background;
}

function createTemperature(celsius, fahrenheit) {
    const div = document.createElement("div");
    div.className = "temperature"

    const temperature = document.createElement("div");
    temperature.className = "main_temperature";
    temperature.innerText = `${celsius}°C/`

    const minor_temperature = document.createElement("div");
    minor_temperature.className = "minor_temperature";
    minor_temperature.innerText = `${fahrenheit}°F`;

    div.appendChild(temperature);
    div.appendChild(minor_temperature);

    return div;
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

    const hello = document.createElement("div");
    hello.className = "greeting-hello";
    hello.innerText = "Hello, Natalie";

    const location = document.createElement("div");
    location.className = "greeting-location";
    location.innerText = "this is current weather at your location";

    greeting.appendChild(hello);
    greeting.appendChild(location);

    return greeting;
}

function createDate() {
    const date = document.createElement("div");
    date.className = "date";

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();

    const day = document.createElement("div");
    day.className = "day";
    day.innerText = today.toLocaleDateString("en-US", options);

    const time = document.createElement("div");
    time.className = "time";
    time.innerText = today.toLocaleTimeString("en-US");

    date.appendChild(day);
    date.appendChild(time);

    return date;
}

function createAdvice(advice) {
    const value = document.createElement("div");
    value.className = "advice";
    value.innerText = advice;

    return value;
}

export async function createWeatherWidget(root, current_weather_type) {
    const weather_map = await loadWeatherData();
    const current_weather = weather_map[WEATHER_RECORD[current_weather_type]];

    const widget = createMain();
    const temperature = createTemperature(current_weather.celsius, current_weather.fahrenheit);
    const status = createStatus(WEATHER_RECORD[current_weather_type]);
    const background = createBackground(current_weather.url);
    const greeting = createGreeting();
    const date = createDate();

    const advice_map = await loadStatsAndAdvices();
    const advice = await createAdvice(advice_map[WEATHER_RECORD[current_weather_type]]);
    widget.appendChild(advice);

    widget.appendChild(background);
    widget.appendChild(temperature);
    widget.appendChild(status);
    widget.appendChild(greeting);
    widget.appendChild(date);

    root.appendChild(widget);
}