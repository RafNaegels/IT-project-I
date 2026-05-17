const Weergeef = {
    BESCHRIJVING: "beschrijving",
    ANTWOORD: "antwoord",
}

const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_OEFENINGEN: 0,
    ANTWOORD_OPTIES: 6,
    VOLGEND_SCHERM: Weergeef.BESCHRIJVING,
    DUUR_OEFENING: 4*60*1000,
    TIMER: null,
}

const setup = () => {
    addEventListeners();
    toonScherm("startScherm");
}

const startTest = () => {
    resetGlobVars();
    nieuwOefening();
    volgendeScherm();
    //setTime-out
}

const nieuwOefening = () => {
    renderOpgave();
    markCorrect();
}

const volgendeScherm = () => {
    switch (global.VOLGEND_SCHERM) {
        case Weergeef.BESCHRIJVING:
            toonScherm("opgave", "beschrijving");
            global.VOLGEND_SCHERM = Weergeef.ANTWOORD;
            break;

        case Weergeef.ANTWOORD:
            toonScherm("opgave", "antwoord");
            global.VOLGEND_SCHERM = Weergeef.BESCHRIJVING;
            break;
    }
}

const resetGlobVars = () => {
    global.AANTAL_FOUTEN = 0;
    global.AANTAL_PUNTEN = 0;
    global.AANTAL_OEFENINGEN = 0;
    global.TIMER = null;
    global.VOLGEND_SCHERM = Weergeef.BESCHRIJVING;
}

const renderOpgave = () => {
    let pijlPrentjes = [];
    let pijlParameters = [];
    let selectedIndexes = new Set();


    while (pijlParameters.length < global.ANTWOORD_OPTIES) {
        let willekeurigeIndex = Math.floor(Math.random() * pijltjes.length);
        if (!selectedIndexes.has(willekeurigeIndex)) {
            selectedIndexes.add(willekeurigeIndex);
            pijlParameters.push(pijltjes[willekeurigeIndex]);
        }
    }

    pijlParameters.forEach(parameter => {
        pijlPrentjes.push(maakPijlPrentje(parameter));
    });

    let correctAntwoord = Math.floor(Math.random() * pijlParameters.length);
    document.getElementById("beschrijving").innerHTML = genereerWillekeurigeBeschrijving(pijlParameters[correctAntwoord]);
    let antwoordOpties = document.getElementById("antwoordOpties");
    antwoordOpties.innerHTML = "";
    global.CORRECT_ANTWOORD = pijlParameters[correctAntwoord].ID;

    for (let i = 0; i < global.ANTWOORD_OPTIES; i++) {
        let combo = createEl("div", "combo");
        combo.dataset.id = pijlParameters[i].ID;

        let pijlen = createEl("div", "pijlen");
        pijlen.innerHTML = pijlPrentjes[i];

        combo.appendChild(pijlen);

        antwoordOpties.appendChild(combo);
    }
}

const maakPijlPrentje = (pijltjesBeschrijving) => {
    let kleurBoven;
    let kleurOnder
    if (pijltjesBeschrijving.zwartBoven) {
        kleurBoven = "black";
        kleurOnder = "white";
    } else {
        kleurOnder = "black";
        kleurBoven = "white";
    }

    return `
        <svg class="pijl ${pijltjesBeschrijving.richtingBoven}" viewBox="0 0 24 24">
                                <path d="M21 3H11l4 4-12 12 2 2 12-12 4 4V3z"
                                      fill="${kleurBoven}"
                                      stroke="black"
                                      stroke-width="1"/>
                            </svg>
                            
        <svg class="pijl ${pijltjesBeschrijving.richtingOnder}" viewBox="0 0 24 24">
                                <path d="M21 3H11l4 4-12 12 2 2 12-12 4 4V3z"
                                      fill="${kleurOnder}"
                                      stroke="black"
                                      stroke-width="1"/>
                            </svg>
    `
}

const genereerWillekeurigeBeschrijving = (juistePijl) => {
    let kleurOptie1 = juistePijl.zwartBoven ? "Zwart BOVEN Wit" : "Zwart ONDER Wit";
    let kleurOptie2 = juistePijl.zwartBoven ? "Wit ONDER Zwart" : "Wit BOVEN Zwart";

    let kleurTekst = Math.random() < 0.5 ? kleurOptie1 : kleurOptie2;


    let bovenNaam = vertaalRichting(juistePijl.richtingBoven);
    let onderNaam = vertaalRichting(juistePijl.richtingOnder);

    let plaatsOptie1 = `${bovenNaam} BOVEN ${onderNaam}`;
    let plaatsOptie2 = `${onderNaam} ONDER ${bovenNaam}`;

    let plaatsTekst = Math.random() < 0.5 ? plaatsOptie1 : plaatsOptie2;


    if (Math.random() < 0.5) {
        return `${kleurTekst}<br>${plaatsTekst}`;
    } else {
        return `${plaatsTekst}<br>${kleurTekst}`;
    }
};


const vertaalRichting = (richting) => {
    const vertalingen = {
        "rechtsOp": "Rechts Op",
        "rechtsNeer": "Rechts Neer",
        "linksOp": "Links Op",
        "linksNeer": "Links Neer"
    };
    return vertalingen[richting];
};

const createEl = (element, className, content) => {
    let el = document.createElement(element);
    if (className) el.className = className;
    if (content) el.appendChild(document.createTextNode(content));
    return el;
};

const toonScherm = (id, binnenscherm = null) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        console.log("element ", el);
        el.classList.toggle("hidden", el.id !== id);
    });
    if (id === "opgave") {
        console.log("binnenvenster " , binnenscherm);
        document.querySelectorAll(".venster").forEach(el => {
            el.classList.toggle("hidden", el.id !== binnenscherm);
        })
    }
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
}

window.addEventListener("load", setup);