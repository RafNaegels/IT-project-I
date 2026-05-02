const global = {
    AANTAL_MUTATIES: 0,
}


const setup = () => {
    nieuwOefening();
}

const nieuwOefening = () => {
    global.AANTAL_MUTATIES = Math.floor(Math.random() * 5);
    let stringPaar = createStrings();
    displayStrings(stringPaar);
    deleteContents(document.getElementById("oefeningInhoud"));
}


const displayStrings = (stringPaar) => {
    let baseString = createElement("div", stringPaar[0],"baseString");
    let mutatedString = createElement("div", stringPaar[1],"mutatedString");

    let string1 = document.getElementById("string1");
    let string2 = document.getElementById("string2");
    deleteContents(string1);
    deleteContents(string2);
    string1.appendChild(baseString);
    string2.appendChild(mutatedString);
}


const createStrings = () => {
    let baseString = selectRandomString();

    let mutatedString = createMutatedString(baseString, global.AANTAL_MUTATIES);

    return [baseString, mutatedString];
}

const createMutatedString = (baseString) => {
    const posities = getPosities(baseString, global.AANTAL_MUTATIES);
    return mutate(baseString, posities);
}

const getPosities = (baseString) => {
    let posities = new Set();
    while (posities.size < global.AANTAL_MUTATIES) {
        let positie = Math.floor(Math.random() * baseString.length);
        let char = baseString.charAt(positie);
        if (!" :/.@".includes(char)) {
            posities.add(positie);
        }
    }
    return posities;
}

const selectRandomString = () => {
    return stringPool[Math.floor(Math.random() * stringPool.length)];
}

const deleteContents = (el) => {
    if (el.firstChild) {
        el.firstChild.remove();
    }
}

const createElement = (el, content, className) => {
    let element = document.createElement(el);
    if (className) {
        element.className = className;
    }
    if (content) {
        element.appendChild(document.createTextNode(content));
    }
    return element;
}

// string muteren
const mutate = (baseString, posities) => {

    // string -> array (makkelijk aanpasbaar)
    let chars = baseString.split("");

    for (let i of posities) {

        let c = chars[i];

        let nieuw = randomChar(c);

        chars[i] = nieuw;
    }

    return chars.join("");
}
function randomChar(c) {

    if (c >= '0' && c <= '9') {
        return String.fromCharCode(
            '0'.charCodeAt(0) + Math.floor(Math.random() * 10)
        );
    }

    if (c >= 'A' && c <= 'Z') {
        return String.fromCharCode(
            'A'.charCodeAt(0) + Math.floor(Math.random() * 26)
        );
    }

    if (c >= 'a' && c <= 'z') {
        return String.fromCharCode(
            'a'.charCodeAt(0) + Math.floor(Math.random() * 26)
        );
    }

    return c;
}


import stringPool from "./stringPool.js";
window.addEventListener("load", setup);
