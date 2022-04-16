import {WEATHER_RECORD} from "../main/helpers.js";

async function loadStatsAndAdvices() {
    const [stats, advices] = await Promise.all([
        fetch("../requests_data_mocks/weather_stats.json").then((data) => data.json()).then((data) => data.result),
        fetch("../requests_data_mocks/weather_advices.json").then((data) => data.json()).then((data) => data.result),
    ]);

    // order guaranteed
    const weather_map = {};
    for (let i = 0; i < stats.length; i++) {
        weather_map[stats[i].status] = {
            "wind": stats[i].wind,
            "wind direction": stats[i].wind_direction,
            "sunset": stats[i].sunset,
            "dawn": stats[i].dawn,
            "rain probability": stats[i].rain_probability,
            "snow probability": stats[i].snow_probability,
            "rain time": stats[i].rain_time,
            "tomorrow": stats[i].tomorrow,
            "advice": advices[i].advice,
        }
    }

    return weather_map;
}


function createStatsPart(weather_stats) {
    const stats = document.createElement("div");
    stats.className = "stats";

    for (let key in weather_stats) {
        const weather_stat = weather_stats[key];
        const new_line_div = document.createElement("div");

        if (key === "advice") {
            const value = document.createElement("div");
            value.className = "stats-advice";
            value.innerText = weather_stat;

            new_line_div.appendChild(value);
            stats.appendChild(new_line_div);

            continue;
        }

        if (weather_stat === undefined) {
            continue;
        }

        const name = document.createElement("div");
        name.className = "stats-names";
        name.innerText = key;

        const value = document.createElement("div");
        value.className = "stats-values";
        value.innerText = weather_stat;

        new_line_div.appendChild(name);
        new_line_div.appendChild(value);

        stats.appendChild(new_line_div);
    }

    return stats;
}

export async function createStats(root, current_weather_type) {
    const weather_map = await loadStatsAndAdvices();
    const stats = createStatsPart(weather_map[WEATHER_RECORD[current_weather_type]]);

    root.appendChild(stats);
}