function createHeaderPart() {
    const header = document.createElement("div");
    header.className = "header";

    return header;
}

function createProfilePart() {
    const profile = document.createElement("div");
    profile.className = "profile";

    return profile;
}

export function createHeader(root) {
    const header = createHeaderPart();
    const profile = createProfilePart();

    root.appendChild(header);
    root.appendChild(profile);
}