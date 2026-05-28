const global = {
    AANTAL_MUTATIES: 0,
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_OEFENINGEN: 0,
    AANTAL_ANTWOORDEN: 5,
    TIMER_ID: 0,
    VISUELE_TIMER: 0,
    DUUR_OEFENING: 4*60*1000,
    RESTERENDE_TIJD: 240,
    DEBUGGING: false
}

const setup = () => {
    addEventListeners();
    toonScherm("startScherm");
    document.getElementById("timer").classList.add("hidden");
}

const addEventListeners = () => {
    document.getElementById("volgendePagina").addEventListener('click', () => {
        toonScherm("antwoordPaneel");
    });
    document.querySelectorAll(".bediening button").forEach(el => {
        el.addEventListener('click', verwerkAntwoord);
    })
    document.getElementById("startOefening").addEventListener('click', () => {
        startTest();
    })
    document.getElementById("opnieuw").addEventListener('click', () => {
        startTest();
    })
}

const startTest = () => {
    resetOefening();
    global.TIMER_ID = setTimeout(eindeOefening, global.DUUR_OEFENING);
    document.getElementById("timer").classList.remove("hidden");
    startTimer();
    nieuwOefening();
}

const nieuwOefening = () => {
    global.AANTAL_MUTATIES = Math.floor(Math.random() * global.AANTAL_ANTWOORDEN);
    markCorrectAnswer();
    toonScherm("oefeningDisplayFD");
    let stringPaar = createStrings();
    displayStrings(stringPaar);
}

const eindeOefening = () => {
    document.getElementById("aantalOefeningen").textContent = global.AANTAL_OEFENINGEN;
    document.getElementById("aantalFouten").textContent = global.AANTAL_FOUTEN;
    document.getElementById("aantalPunten").textContent = global.AANTAL_PUNTEN;

    document.getElementById("timer").classList.add("hidden");
    toonScherm("resultaat");

}

const startTimer = () => {
    updateTimerDisplay();
    global.VISUELE_TIMER = setInterval(updateResterendeTijd, 1000);
}

const updateResterendeTijd = () => {
    global.RESTERENDE_TIJD--;
    if(global.RESTERENDE_TIJD <= 0) {
        clearInterval(global.VISUELE_TIMER);
        clearTimeout(global.TIMER_ID);
    }
    updateTimerDisplay();
}

const updateTimerDisplay = () => {
    let tijd = global.RESTERENDE_TIJD;
    let min = Math.floor(tijd / 60);
    let sec = tijd % 60;

    document.getElementById("minuten").textContent = String(min).padStart(2, '0');
    document.getElementById("seconden").textContent = String(sec).padStart(2, '0');
}

const verwerkAntwoord = (event) => {
    (event.target.classList.contains("correct")) ? global.AANTAL_PUNTEN++ : global.AANTAL_FOUTEN++;
    global.AANTAL_OEFENINGEN++;
    console.log("klik")
    if(global.DEBUGGING) {
        console.log("geselecteerd antwoord: ", event.target.dataset.id);
        console.log("juiste antwoord: ", global.AANTAL_MUTATIES);
        console.log("punten: " + global.AANTAL_PUNTEN);

        console.log("fouten " + global.AANTAL_FOUTEN);
        console.log("totaal pogingen " + global.AANTAL_OEFENINGEN);
        console.log();
    }
    nieuwOefening();
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

const resetOefening = () => {
        global.AANTAL_OEFENINGEN = 0;
        global.AANTAL_PUNTEN = 0;
        global.AANTAL_FOUTEN = 0;
        global.RESTERENDE_TIJD = 240;

        clearInterval(global.VISUELE_TIMER);
        clearTimeout(global.TIMER_ID);
}

const getPosities = (baseString) => { //risico op infinite-loop nakijken
    let posities = new Set();
    while (posities.size < global.AANTAL_MUTATIES) {
        let positie = Math.floor(Math.random() * baseString.length);
        let char = baseString.charAt(positie);
        if (!" -:/.@".includes(char)) {
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


const mutate = (baseString, posities) => {

    let chars = baseString.split("");

    for (let i of posities) {
        chars[i] = randomChar(chars[i]);
    }

    return chars.join("");
}


function randomChar(c) {
    if (c >= '0' && c <= '9') {
        let newChar;
        do {
        newChar = String.fromCharCode(
            '0'.charCodeAt(0) + Math.floor(Math.random() * 10)
        );
        } while (newChar === c);
        return newChar;
    }

    if (c >= 'A' && c <= 'Z') {
        let newChar;
        do {
            newChar = String.fromCharCode(
                'A'.charCodeAt(0) + Math.floor(Math.random() * 26)
            );

        } while (newChar === c);
        return newChar;
    }

    if (c >= 'a' && c <= 'z') {
        let newChar;
        do {
            newChar = String.fromCharCode(
                'a'.charCodeAt(0) + Math.floor(Math.random() * 26)
            );
        } while (newChar === c);
        return newChar;
    }
}


import stringPool from "./stringPool.js";
window.addEventListener("load", setup);
