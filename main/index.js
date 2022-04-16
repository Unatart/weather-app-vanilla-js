import {createWeatherWidget} from "../widget/widget.js";
import {createStats} from "../stats/stats.js";
import {getRandomInt} from "./helpers.js";
import {createTable} from "../table/table.js";

function index() {
    const root = document.getElementById("app");

    const current_weather_type = getRandomInt(0, 6);

    createWeatherWidget(root, current_weather_type);
    createStats(root, current_weather_type);
    createTable(root);
}

index();