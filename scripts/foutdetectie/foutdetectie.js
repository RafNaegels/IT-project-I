const global = {
    AANTAL_MUTATIES: 0,
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_OEFENINGEN: 0,
    TIMER_ID: 0,
    DUUR_OEFENING: 4*60*1000
}

const setup = () => {
    addEventListeners();
    toonScherm("startScherm");
}

const addEventListeners = () => {
    document.getElementById("volgendePagina").addEventListener('click', () => {
        toonScherm("antwoordPaneel");
    });
    document.querySelectorAll(".variant1 > button").forEach(el => {
        el.addEventListener('click', verwerkAntwoord);
    })
    document.getElementById("startOefening").addEventListener('click', () => {
        startTest();
    })
}

const startTest = () => {
    global.TIMER_ID = setTimeout(eindeOefening, global.DUUR_OEFENING);
    nieuwOefening();
}

const nieuwOefening = () => {
    global.AANTAL_MUTATIES = Math.floor(Math.random() * 5);
    toonScherm("oefeningDisplayFD");
    markCorrectAnswer();
    let stringPaar = createStrings();
    displayStrings(stringPaar);
}

const eindeOefening = () => {
    document.getElementById("aantalOefeningen").appendChild(document.createTextNode(global.AANTAL_OEFENINGEN));
    document.getElementById("aantalFouten").appendChild(document.createTextNode(global.AANTAL_FOUTEN));
    document.getElementById("aantalPunten").appendChild(document.createTextNode(global.AANTAL_PUNTEN));
    toonScherm("resultaat");
}

const verwerkAntwoord = () => {
    (event.target.classList.contains("correct")) ? global.AANTAL_PUNTEN++ : global.AANTAL_FOUTEN++;
    global.AANTAL_OEFENINGEN++;
    nieuwOefening();
    console.log("punten: " + global.AANTAL_PUNTEN);
    console.log("fouten " + global.AANTAL_FOUTEN);
    console.log("totaal pogingen "+ global.AANTAL_OEFENINGEN);
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

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplayFD").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
};

const markCorrectAnswer = () => {
    document.querySelectorAll(".variant1 > button").forEach(el => {
        const id = Number(el.dataset.id);

        el.classList.toggle("correct", id === global.AANTAL_MUTATIES);
    });
};

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
        chars[i] = randomChar(chars[i]);
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
