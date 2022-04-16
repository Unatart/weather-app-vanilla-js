import {getRandomInt} from "../main/helpers.js";

const DAYS_PER_WEEK = 7;

const WEEKDAYS = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "thursday",
    4: "friday",
    5: "saturday",
    6: "sunday"
}

export function createTable(root) {
    const table = document.createElement("table");
    table.className = "table";

    const tr_day = document.createElement("tr");
    for (let i = 0; i < DAYS_PER_WEEK; i++) {
        const th = document.createElement("th");
        th.innerText = WEEKDAYS[i];
        tr_day.appendChild(th);
    }
    table.appendChild(tr_day);

    const tr_temp = document.createElement("tr");
    for (let i = 0; i < DAYS_PER_WEEK; i++) {
        const td = document.createElement("td");
        td.innerText = `${getRandomInt(-20, 20)}°C`;
        tr_temp.appendChild(td);
    }
    table.appendChild(tr_temp);

    root.appendChild(table);
}