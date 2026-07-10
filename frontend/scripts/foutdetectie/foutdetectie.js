import strings from "./stringPool.js";


const global = {
    AANTAL_MUTATIES: 0,
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_OEFENINGEN: 0,
    AANTAL_ANTWOORDEN: 5,
    TIMER_ID: 0,
    VISUELE_TIMER: 0,
    DUUR_OEFENING: 0.5*60*1000,
    RESTERENDE_TIJD: 240,
    DEBUGGING: true
}

const setup = () => {
    toonScherm("startScherm");
    addEventListeners();
    document.getElementById("timer").classList.add("hidden");
}

const addEventListeners = () => {
    document.getElementById("volgendePagina").addEventListener('click', () => {
        toonScherm("oefenreeks", "antwoordPaneel");
    });
    document.getElementById("startOefening").addEventListener('click', () => {
        startTest();
    })
    document.getElementById("opnieuw").addEventListener('click', () => {
        startTest();
    })
    document.querySelectorAll(".bediening button").forEach(el => {
        el.addEventListener('click', verwerkAntwoord);
    })

    document.getElementById("instellingenKnop").addEventListener('click', toggleMenu);
    document.getElementById("duur").addEventListener('change', spelduurInstellen);
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
    let sec = Math.floor(tijd % 60);


    document.getElementById("minuten").textContent = String(min).padStart(2, '0');
    document.getElementById("seconden").textContent = String(sec).padStart(2, '0');
}


const spelduurInstellen = () => {
    let tijd = document.getElementById("duur").value;

    global.DUUR_OEFENING = tijd * 60000;
    global.RESTERENDE_TIJD = tijd * 60;
}

const toggleMenu = () => {
    document.getElementById("instellingenMenu").classList.toggle('hidden');
}

const startTest = () => {
    global.TIMER_ID = setTimeout(eindeOefening, global.DUUR_OEFENING);
    document.getElementById("timer").classList.remove("hidden");
    startTimer();
    nieuwOefening();
}

const nieuwOefening = () => {
    global.AANTAL_MUTATIES = Math.floor(Math.random() * global.AANTAL_ANTWOORDEN);
    markCorrectAnswer();
    toonScherm("oefenreeks", "opgave");
    let stringPaar = createStrings();
    displayStrings(stringPaar);
}

const eindeOefening = () => {
    resetOefening();
    document.getElementById("aantalOefeningen").textContent = global.AANTAL_OEFENINGEN;
    document.getElementById("aantalFouten").textContent = global.AANTAL_FOUTEN;
    document.getElementById("aantalPunten").textContent = global.AANTAL_PUNTEN;
    document.getElementById("timer").classList.add("hidden");
    toonScherm("resultaat");
}

const verwerkAntwoord = (event) => {
    (event.target.classList.contains("correct")) ? global.AANTAL_PUNTEN++ : global.AANTAL_FOUTEN++;
    global.AANTAL_OEFENINGEN++;

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

const toonScherm = (id, binnenscherm) => {
    document.querySelectorAll(".oefeningDisplayFD").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
    if (id === "oefenreeks") {
        document.querySelectorAll(".oefening").forEach(el => {
            el.classList.toggle("hidden", el.id !== binnenscherm);
        })
    }
};

const markCorrectAnswer = () => {
    document.querySelectorAll(".bediening button").forEach(el => {
        const id = Number(el.dataset.id);
        el.classList.toggle("correct", id === global.AANTAL_MUTATIES);
    });
};

const createStrings = () => {
    let baseString = selectRandomString();

    let mutatedString = createMutatedString(baseString);

    return [baseString, mutatedString];
}

const createMutatedString = (baseString) => {
    const posities = getPosities(baseString);
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
        if (!" ,-:/.@".includes(char)) {
            posities.add(positie);
        }
    }
    return posities;
}

const selectRandomString = () => {
    if(Math.random() < .85) {
        return bouwBaseStringOp();
    } else {
        return strings.stringPool[Math.floor(Math.random() * strings.stringPool.length)];
    }
}

const bouwBaseStringOp = () => {
    const random = Math.random();
    let string = "";


    if (random < 0.3) { //nummerplaat
        string += Math.floor(Math.random() * 10) + " - ";
        for (let i = 0; i<3; i++) {
            string += randomChar("A"); // geeft drie keer een hoofdletter terug
        }
        string += " - ";
        for (let i = 0; i<3; i++) {
            string += randomChar("0"); // drie willekeurige cijfers
        }
        return string;
    }
    else if (random < 0.7) {
        let string = "https//www.";
        let domainLength = 6 + Math.floor(Math.random() * 6);
        let suffix = strings.webSuffixs[Math.floor(Math.random() * strings.webSuffixs.length)];
        for (let i = 0; i<domainLength; i++) {
            string += randomChar('a');
        }
        string += suffix;
        if(Math.random() < .3) { // pagina toevoegen aan domeinadres
            let paginaLengte = 4 + Math.floor(Math.random() * 6);
            string += '/';
            for(let i = 0; i < paginaLengte; i++) {
                string += randomChar('a');
            }
        }
        return string;
    }
    else {
        let string = "";
        let voornaamLengte = 1 + Math.floor(Math.random() * 8);
        let achternaamLengte = 6 + Math.floor(Math.random() * 8);
        for (let i = 0; i < voornaamLengte; i++) {
            (i===0) ? string += randomChar('A') : string += randomChar('a');
        }
        for (let i = 0; i<achternaamLengte; i++) {
            (i===0) ? string += randomChar('A') : string += randomChar('a');
        }
        return string + strings.mailSuffixs[Math.floor(Math.random() * strings.mailSuffixs.length)];
    }
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


window.addEventListener("load", setup);
