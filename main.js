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
    return await fetch("requests_data_mocks/weather_img.json")
        .then((response) => response.json());
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

async function createWeatherWidget(root_id) {
    const weather_data = (await loadWeatherData()).weather;
    const weather_map = {};
    for (let i = 0; i < weather_data.length; i++) {
        weather_map[weather_data[i].status] = weather_data[i].url;
    }

    const widget = createMain();
    const current_weather_type = getRandomInt(0, weather_data.length);
    const background = createBackground(weather_map[WEATHER_RECORD[current_weather_type]]);

    widget.appendChild(background);
    root_id.appendChild(widget);
}

function main() {
    const root_id = document.getElementById("app");
    // createNav(root_id);
    createWeatherWidget(root_id);
    // createWeekWeatherTable(root_id);
    // createFooter(root_id);
}

main();