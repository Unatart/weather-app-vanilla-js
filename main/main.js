import {createWeatherWidget} from "../widget/widget.js";
import {createHeader} from "../header/header.js";

function main() {
    const root_id = document.getElementById("app");
    createHeader(root_id);
    createWeatherWidget(root_id);
    // createWeekWeatherTable(root_id);
    // createFooter(root_id);
}

main();