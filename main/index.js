import {createWeatherWidget} from "../widget/widget.js";
import {createHeader} from "../header/header.js";
import {createStats} from "../stats/stats.js";
import {getRandomInt} from "./helpers.js";

function index() {
    const root = document.getElementById("app");

    const current_weather_type = getRandomInt(0, 6);

    createHeader(root);
    createWeatherWidget(root, current_weather_type);
    createStats(root, current_weather_type);
    // createWeekWeatherTable(root);
    // createFooter(root);
}

index();