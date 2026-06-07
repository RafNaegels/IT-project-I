const global = {
    BOVENSTE_UITKOMST: 0,
    ONDERSTE_UITKOMST: 0,
    OPGAVE1: "",
    OPGAVE2: "",
    OEFENING_NUMMER: 0,
    AANTAL_OEFENINGEN: 0,
    VOLGEND_SCHERM: "b",
    CORRECT_ANTWOORD: null,
    TIMER_ID: 0,
    VISUELE_TIMER: 0,
    RESTERENDE_TIJD: 240,
    DUUR_OEFENING: 4*60000,
    AANTAL_FOUTEN: 0,
    AANTAL_PUNTEN: 0,
}

const setup = () => {
    addEventListeners();
    toonScherm("startScherm");
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest)
    document.getElementById("volgende").addEventListener("click", volgende);
    document.querySelectorAll(".antwoordBediening button").forEach((button) => {
        button.addEventListener("click", verwerkAntwoord);
    });
    document.getElementById("opnieuw").addEventListener("click", startTest);
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
    nieuwOefenreeks();
    clearTimeout(global.TIMER_ID);
    clearInterval(global.VISUELE_TIMER);
    global.TIMER_ID = setTimeout(eindeOefening, global.DUUR_OEFENING);
    startTimer();
}


const nieuwOefenreeks = () => {
    resetGlobVars();
    nieuwOefening();
    weergeefOpgave("bovenVenster", global.OPGAVE1);
}

const nieuwOefening = () => {
    global.OEFENING_NUMMER++;
    resetOefeningVars();
    genereerOpgaves();
    markCorrect();
    weergeefOefeningNummer();
    weergeefOpgave("bovenVenster", global.OPGAVE1);
    global.VOLGEND_SCHERM = "o";
    toonScherm("opgave");
}

const weergeefOpgave = (venster, opgave) => {
    wisInhoudVensters();
    let vensterDiv = document.getElementById(venster);
    vensterDiv.appendChild(createEl("div", "rekenopgave", opgave));
}

const volgende = () => {
    if(global.VOLGEND_SCHERM === "b") {
        weergeefOpgave("bovenVenster", global.OPGAVE1);
        global.VOLGEND_SCHERM = "o";
    } else if (global.VOLGEND_SCHERM === 'o') {
        weergeefOpgave("onderVenster", global.OPGAVE2);
        global.VOLGEND_SCHERM = "a";

    } else if (global.VOLGEND_SCHERM === 'a') {
        toonScherm("antwoord");
        global.VOLGEND_SCHERM = "b";
    }
};

const eindeOefening = () => {
    resetGlobVars();
    document.getElementById("aantalOefeningen").textContent = (global.AANTAL_OEFENINGEN).toString();
    document.getElementById("aantalFouten").textContent = (global.AANTAL_FOUTEN).toString();
    document.getElementById("aantalPunten").textContent = (global.AANTAL_PUNTEN.toString());
    toonScherm("resultaat");
}

const weergeefOefeningNummer = () => {
    let span = document.getElementById("oefeningNummer")
    let nummerWeergave = "";
    let oefeningNummer = global.AANTAL_OEFENINGEN + 1;
    if(oefeningNummer < 10) {
        nummerWeergave = "0" + oefeningNummer;
    } else {
        nummerWeergave = oefeningNummer;
    }
    span.innerHTML = nummerWeergave;
}

const createEl = (el, className, text) => {
    let element = document.createElement(el);
    if(className) {
        element.classList.add(className);
    }
    if(text) {
        element.appendChild(document.createTextNode(text));
    }
    return element;
};

const resetOefeningVars = () => {
    global.BOVENSTE_UITKOMST = 0;
    global.ONDERSTE_UITKOMST = 0;
    global.OPGAVE1 = "";
    global.OPGAVE2 = "";
    global.CORRECT_ANTWOORD = null;
}

const resetGlobVars = () => {
    global.OEFENING_NUMMER = 0;
    global.VOLGEND_SCHERM = "o";
    global.TIMER_ID = 0;
    global.VISUELE_TIMER = null;
    global.AANTAL_PUNTEN = 0;
    global.AANTAL_FOUTEN = 0;
    global.AANTAL_OEFENINGEN = 0;
    global.RESTERENDE_TIJD = 240;
}

const verwerkAntwoord = (event) => {
    let antwoord = event.target.dataset.id;
    let correct = global.CORRECT_ANTWOORD;
    wisInhoudVensters();
    global.VOLGEND_SCHERM = "b";
    global.AANTAL_OEFENINGEN++;
    if (antwoord === correct) {
        global.AANTAL_PUNTEN++;
        nieuwOefening();
    } else {
        global.AANTAL_FOUTEN++;
        nieuwOefening();
    }
}

const markCorrect = () => {
    if (global.BOVENSTE_UITKOMST > global.ONDERSTE_UITKOMST) {
        global.CORRECT_ANTWOORD = "boven"
    } else if (global.ONDERSTE_UITKOMST > global.BOVENSTE_UITKOMST) {
        global.CORRECT_ANTWOORD = "onder"
    } else {
        global.CORRECT_ANTWOORD = "gelijk"
    }
}

const wisInhoudVensters = () => {
    let schermen = Array.from(document.getElementsByClassName("venster"));
    // = [...document.getElementsByClassName("venster")] korte notatie om array te maken HTMLcollection
    schermen.forEach(el => {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    })
}

const genereerOpgaves = () => {
    let eersteOperandSelectie = Math.random();
    let tweedeOperandSelectie = Math.random();

    const r = Math.random();

    global.OPGAVE1 =
        eersteOperandSelectie < 0.25 ? maakOptelling() :
        eersteOperandSelectie < 0.5 ? maakVerschil() :
        eersteOperandSelectie < 0.75 ? maakProduct() :
        maakDeling();

    global.OPGAVE2 =
        tweedeOperandSelectie < 0.25 ? maakOptelling2() :
        tweedeOperandSelectie < 0.5 ? maakVerschil2() :
        tweedeOperandSelectie < 0.75 ? maakProduct2() :
        maakDeling2();

}

const maakOptelling = () => {
    let uitkomstVerdeling = Math.random();
    global.BOVENSTE_UITKOMST =
        uitkomstVerdeling < .85 ? Math.floor(5 + Math.random() * 51) :
            Math.floor(51 + Math.random() * 50);
    const term1 = Math.floor(Math.random() * (global.BOVENSTE_UITKOMST - 1)) + 1;
    const term2 = global.BOVENSTE_UITKOMST - term1;
    return term1 + " + " + term2;
}

const maakVerschil = () => {
    let uitkomstVerdeling = Math.random();
    global.BOVENSTE_UITKOMST =
        uitkomstVerdeling < .85 ? 5 + Math.floor(Math.random() * 61) :
            66 + Math.floor(Math.random() * 50);
    const term1 = Math.floor(Math.random() * (global.BOVENSTE_UITKOMST - 1)) + 1;
    const term2 = global.BOVENSTE_UITKOMST + term1;
    return term2 + " - " + term1;
}

const maakProduct = () => {
    const product1 = Math.floor(Math.random() * 9) + 2;
    const product2 = Math.random() < .9 ? Math.floor(Math.random() * 9) + 2 :
        Math.floor(Math.random() * 5) + 11;
    global.BOVENSTE_UITKOMST = product1 * product2;
    return product1 + " x " + product2;
}

const maakDeling = () => {
    const term1 = Math.floor(Math.random() * 9) + 2;
    const term2 = Math.random() < .9 ? Math.floor(Math.random() * 9) + 2 :
        Math.floor(Math.random() * 10) + 11;
    if(Math.random() < 0.7) {
        global.BOVENSTE_UITKOMST = term2;
        return term1 * term2 + " / " + term1;
    } else {
        global.BOVENSTE_UITKOMST = term1;
        return term1 * term2 + " / " + term2;
    }
}

const maakOptelling2 = () => {
    global.ONDERSTE_UITKOMST = genereerNabijgelegenUitkomst();

    const term1 = Math.floor(Math.random() * (global.ONDERSTE_UITKOMST - 1)) + 1;
    const term2 = Math.floor(global.ONDERSTE_UITKOMST - term1);

    return term1 + " + " + term2;
}

const maakVerschil2 = () => {
    global.ONDERSTE_UITKOMST = genereerNabijgelegenUitkomst();

    const term1 = Math.floor(Math.random() * (global.ONDERSTE_UITKOMST - 1)) + 1;
    const term2 = global.ONDERSTE_UITKOMST + term1;

    return term2 + " - " + term1;
}

const maakProduct2 = () => {
    const term1 = Math.floor(Math.random() * (15 - 1)) + 1;
    const term2 = genereerFactor(term1);
    global.ONDERSTE_UITKOMST = term1 * term2;

    return term1 + " x " + term2;
}

const maakDeling2 = () => {
    const { factor, quotient } = genereerFactoren();
    const product = factor * quotient;

    global.ONDERSTE_UITKOMST = quotient;
    return product + " / " + factor;

}

const genereerNabijgelegenUitkomst = () => {
    const min = Math.max(1, global.BOVENSTE_UITKOMST - 5);
    const max = global.BOVENSTE_UITKOMST + 5;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genereerFactor = (term1) => {
    if(global.BOVENSTE_UITKOMST < term1 ) {
        return 1;
    }
    let i = 1;
    do {
        i++
    } while (i*term1 < global.BOVENSTE_UITKOMST - 5);
    return i;
}

const genereerFactoren = () => {
    const minQuotient = Math.max(2, global.BOVENSTE_UITKOMST - 5);
    const maxQuotient = global.BOVENSTE_UITKOMST + 5;

    const quotient =
        Math.floor(Math.random() * (maxQuotient - minQuotient + 1)) + minQuotient;

    const factor = Math.floor(Math.random() * 11) + 2;

    return {
        factor,
        quotient
    };
};

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
    let oefeningContainer = document.getElementById("oefeningContainer");
    oefeningContainer.classList.toggle("hidden", id !== "antwoord" && id !== "opgave");
};

window.addEventListener("load", setup);