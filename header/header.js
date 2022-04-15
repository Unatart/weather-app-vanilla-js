export function createHeader(root_id) {
    const header = document.createElement("div");
    header.className = "header";

    root_id.appendChild(header);

    return header;
}