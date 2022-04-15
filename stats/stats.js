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
            "direction": stats[i].direction,
            "sunset": stats[i].sunset,
            "dawn": stats[i].dawn,
            "fallout_probability": stats[i].fallout_probability,
            "fallout_time": stats[i].fallout_time,
            "tomorrow": stats[i].tomorrow,
            "advice": advices[i].advice,
        }
    }

    return weather_map;
}

// TODO: style it properly!
function createStatsPart(weather_stats) {
    console.log(weather_stats);
    const stats = document.createElement("div")
    stats.className = "stats";
    stats.innerText = `
            wind: ${weather_stats.wind}m/s | direction: ${weather_stats.direction} 
            sunset: ${weather_stats.sunset} | dawn: ${weather_stats.dawn}
            fallout_probability: ${weather_stats.fallout_probability}
            
            tomorrow: ${weather_stats.tomorrow}
    `;

    const advice = weather_stats.advice;

    return stats;
}

export async function createStats(root, current_weather_type) {
    const weather_map = await loadStatsAndAdvices();
    const stats = createStatsPart(weather_map[WEATHER_RECORD[current_weather_type]]);

    root.appendChild(stats);
}