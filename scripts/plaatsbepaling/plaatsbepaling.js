const Weergeef = {
    BESCHRIJVING: "beschrijving",
    ANTWOORD: "antwoord",
}

const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_GEMAAKTE_OEFENINGEN: 0,
    ANTWOORD_OPTIES: 6,
    VOLGEND_SCHERM: Weergeef.BESCHRIJVING,
    GEKOZEN_ANTWOORD_ID: null,
    CORRECT_ANTWOORD_ID: null,
    DUUR_OEFENING: 4*60*1000,
    TIMER: null,
}

const setup = () => {
    addEventListeners();
    toonScherm("startScherm");
}

const startTest = () => {
    resetGlobVars();
    volgendeScherm();
    updateOefeningNummerDisplay();
    global.TIMER = setTimeout(verwerkResultaat, global.DUUR_OEFENING);
}

const nieuwOefening = () => {
    resetOefeningVars();
    renderOpgave();
}

const volgende = () => {
    if (global.GEKOZEN_ANTWOORD_ID === null && global.VOLGEND_SCHERM === Weergeef.BESCHRIJVING) return; // geen antwoord geselecteerd. later UI bericht in onderbalk toevoegen om instructies te geven.
    if(global.VOLGEND_SCHERM === Weergeef.BESCHRIJVING) {
        verwerkAntwoord();
        updateOefeningNummerDisplay();
    }
    volgendeScherm();
}

const volgendeScherm = () => {
    switch (global.VOLGEND_SCHERM) {
        case Weergeef.BESCHRIJVING:
            nieuwOefening();
            toonScherm("opgave", "beschrijving");
            global.VOLGEND_SCHERM = Weergeef.ANTWOORD;
            break;

        case Weergeef.ANTWOORD:
            toonScherm("opgave", "antwoord");
            global.VOLGEND_SCHERM = Weergeef.BESCHRIJVING;
            break;
    }
}

const verwerkAntwoord = () => {
    global.GEKOZEN_ANTWOORD_ID === global.CORRECT_ANTWOORD_ID ? global.AANTAL_PUNTEN++ : global.AANTAL_FOUTEN++;
    global.AANTAL_GEMAAKTE_OEFENINGEN++;
}

const verwerkResultaat = () => {
    clearTimeout(global.TIMER);
    global.TIMER = null;

    let aantalOefeningen = document.getElementById("aantalOefeningen");
    let aantalFouten = document.getElementById("aantalFouten");
    let punten = document.getElementById("aantalPunten");

    aantalOefeningen.textContent = global.AANTAL_GEMAAKTE_OEFENINGEN;
    aantalFouten.textContent = global.AANTAL_FOUTEN;
    punten.textContent = global.AANTAL_PUNTEN;

    toonScherm("resultaat");
}

const resetGlobVars = () => {
    global.AANTAL_FOUTEN = 0;
    global.AANTAL_PUNTEN = 0;
    global.AANTAL_GEMAAKTE_OEFENINGEN = 0;
    global.VOLGEND_SCHERM = Weergeef.BESCHRIJVING;
    clearTimeout(global.TIMER);
    global.TIMER = null;
}

const resetOefeningVars = () => {
    global.CORRECT_ANTWOORD_ID = null;
    global.GEKOZEN_ANTWOORD_ID = null;
}

const renderOpgave = () => {
    let pijlPrentjes = [];
    let pijlParameters = [];
    let selectedIndexes = new Set();

    while (pijlParameters.length < global.ANTWOORD_OPTIES) {
        let willekeurigeIndex = Math.floor(Math.random() * pijltjes.length);
        if (!selectedIndexes.has(willekeurigeIndex)) {  // voorkomt dat dezelfde prent wordt gekozen.
            selectedIndexes.add(willekeurigeIndex);
            pijlParameters.push(pijltjes[willekeurigeIndex]);
        }
    }

    pijlParameters.forEach(parameter => {
        pijlPrentjes.push(maakPijlPrentje(parameter));
    });

    let correctAntwoord = Math.floor(Math.random() * pijlParameters.length);
    let beschrijvingsDiv = document.getElementById("beschrijving");
    beschrijvingsDiv.innerHTML = "";
    let beschrijvingsTekst = genereerWillekeurigeBeschrijving(pijlParameters[correctAntwoord])
    let beschrijvingEl = createEl("p", "beschrijving");
    beschrijvingEl.innerHTML = beschrijvingsTekst;
    beschrijvingsDiv.appendChild(beschrijvingEl);

    let antwoordOpties = document.getElementById("antwoordOpties");
    antwoordOpties.innerHTML = "";
    global.CORRECT_ANTWOORD_ID = pijlParameters[correctAntwoord].ID;

    for (let i = 0; i < global.ANTWOORD_OPTIES; i++) {
        let combo = createEl("button", "combo");
        combo.dataset.id = pijlParameters[i].ID;
        combo.type = "button";

        let pijlen = createEl("div", "pijlen");
        pijlen.innerHTML = pijlPrentjes[i];
        combo.appendChild(pijlen);

        combo.addEventListener("click", selecteerAntwoord);

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

const selecteerAntwoord = (e) => {
    document.querySelectorAll(".combo").forEach(el => {
        el.classList.remove("geselecteerd");
    });

    e.currentTarget.classList.add("geselecteerd");
    global.GEKOZEN_ANTWOORD_ID = Number(e.currentTarget.dataset.id);
}


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

const updateOefeningNummerDisplay = () => {
    let huidigeOefening = global.AANTAL_GEMAAKTE_OEFENINGEN + 1;
    let progressie = document.getElementById("oefeningNummer");
    if (huidigeOefening < 10) {
        progressie.textContent = "0" + huidigeOefening;
    } else {
        progressie.textContent = huidigeOefening.toString();
    }
}

const toonScherm = (id, binnenscherm = null) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
    if (id === "opgave") {
        document.querySelectorAll(".venster").forEach(el => {
            el.classList.toggle("hidden", el.id !== binnenscherm);
        })
    }
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
    document.getElementById("volgende").addEventListener("click", volgende);
    document.getElementById("opnieuw").addEventListener("click", startTest);
}

window.addEventListener("load", setup);