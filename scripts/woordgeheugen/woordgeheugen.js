const Weergeef = {
    CATEGORIE: "categorie",
    WOORDEN: "woord",
    ANTWOORD: "antwoord",
}

const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_OEFENINGEN: 0,
    VOLGEND_SCHERM: Weergeef.CATEGORIE,
    AANTAL_OVEREENKOMSTEN: 0, // dit indiceert het juiste antwoord
    DUUR_OEFENING: 4*60*1000,
    TIMER: 0,
    VISUELE_TIMER: 0,
    RESTERENDE_TIJD: 240,
    DEBUGGING: false,
}

const setup = () => {
    toonScherm("instructie");
    addEventListeners();
}

const startTest = () => {
    resetGlobVars()
    nieuwOefening();
    clearTimeout(global.TIMER);
    document.getElementById("timer").classList.remove("hidden");
    startTimer();
    if(global.DEBUGGING) {
        global.TIMER = setTimeout(verwerkResultaat, 30*1000);
        global.RESTERENDE_TIJD = 30;
    } else {
        global.TIMER = setTimeout(verwerkResultaat, global.DUUR_OEFENING)
    }
}

const nieuwOefening = () => {
    volgendeScherm();
    let woordenKoppels = genereerOpgave();
    renderOpgave(woordenKoppels);
    if (global.DEBUGGING) {
        console.log("correct: ", global.AANTAL_OVEREENKOMSTEN);
    }
}

const renderOpgave = (woordenKoppels) => {
    let categorieen = document.getElementById("categorien");
    let woorden = document.getElementById("woorden");
    wisInhoud(woorden);
    wisInhoud(categorieen);
    woordenKoppels.forEach((koppel) => {
        if (global.DEBUGGING) {
            console.log(koppel);
        }
            let categorieString = createEl("span", "woord", koppel.categorie);
            categorieen.append(categorieString);
            let woordString = createEl("span", "woord", koppel.woord);
            woorden.append(woordString);

    })
}

const verwerkResultaat = () => {
    let aantalOefeningen = document.getElementById("aantalOefeningen");
    let aantalFouten = document.getElementById("aantalFouten");
    let punten = document.getElementById("aantalPunten");
    wisInhoud(aantalOefeningen);
    wisInhoud(punten);
    wisInhoud(aantalFouten);
    aantalOefeningen.appendChild(document.createTextNode(global.AANTAL_PUNTEN + global.AANTAL_FOUTEN));
    aantalFouten.appendChild(document.createTextNode(global.AANTAL_FOUTEN));
    punten.appendChild(document.createTextNode(global.AANTAL_PUNTEN));

    document.getElementById("timer").classList.add("hidden");
    toonScherm("resultaat");
}

const wisInhoud = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

const createEl = (element, className, content) => {
    let el = document.createElement(element);
    if (className) el.className = className;
    if (content) el.appendChild(document.createTextNode(content));
    return el;
};

const resetGlobVars = () => {
        global.AANTAL_PUNTEN = 0;
        global.AANTAL_FOUTEN = 0;
        global.AANTAL_OEFENINGEN = 0;
        global.VOLGEND_SCHERM = Weergeef.CATEGORIE;
}

const genereerOpgave = () => {
    global.AANTAL_OVEREENKOMSTEN = Math.floor(Math.random() * 4);
    let koppels = []
    let categorieNamen = Object.keys(categorieen);

    //selecteren van categorie - woord koppels die overeenkomen
    for (let i = 0; i < global.AANTAL_OVEREENKOMSTEN; i++) {
        let willekeurigeCategorie = categorieNamen[Math.floor(Math.random() * categorieNamen.length)];
        let woordenVanCategorie = categorieen[willekeurigeCategorie];
        let willekeurigWoord = woordenVanCategorie[Math.floor(Math.random() * woordenVanCategorie.length)];
        let koppel = {
            categorie: willekeurigeCategorie,
            woord: willekeurigWoord,
            match: true, //debug info
        }
        koppels.push(koppel);
    }

    //selecteren van categorie - woord koppels die met zekerheid niet overeenkomen
    for (let i = koppels.length; i < 3; i++) {
        let willekeurigeCategorie = categorieNamen[Math.floor(Math.random() * categorieNamen.length)];
        let index = categorieNamen.indexOf(willekeurigeCategorie);
        let willekeurigeIndexSprong =
            1 + Math.floor(Math.random() * (categorieNamen.length - 1));
        let andereIndex =
            (index + willekeurigeIndexSprong) % categorieNamen.length;
        let andereCategorie = categorieNamen[andereIndex];
        let woordenVanCategorie = categorieen[andereCategorie];
        let willekeurigWoord = woordenVanCategorie[Math.floor(Math.random() * woordenVanCategorie.length)];
        koppels.push({
            categorie: willekeurigeCategorie,
            woord: willekeurigWoord,
            match: false,
            }
        );
    }
    koppels.sort(() => Math.random() - 0.5); // zorgt ervoor dat de matching koppels niet steeds vooraan zitten
    return koppels;
}

const verwerkAntwoord = (e) => {
    console.log(global.AANTAL_OVEREENKOMSTEN);
    console.log(e.target.dataset.id);
    console.log(global.AANTAL_OVEREENKOMSTEN === parseInt(e.target.dataset.id));
    if (global.AANTAL_OVEREENKOMSTEN === parseInt(e.target.dataset.id)) {
        global.AANTAL_PUNTEN++;
    } else {
        global.AANTAL_FOUTEN++;
    }
    global.AANTAL_OEFENINGEN++;
    nieuwOefening();
}

const volgendeScherm = () => {
    switch (global.VOLGEND_SCHERM) {
        case Weergeef.CATEGORIE:
            toonScherm("opgave", "categorie");
            global.VOLGEND_SCHERM = Weergeef.WOORDEN;
            break;

        case Weergeef.WOORDEN:
            toonScherm("opgave", "woord");
            global.VOLGEND_SCHERM = Weergeef.ANTWOORD;
            break;

        case Weergeef.ANTWOORD:
            toonScherm(global.VOLGEND_SCHERM);
            global.VOLGEND_SCHERM = Weergeef.CATEGORIE;
            break;
    }
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
    document.getElementById("volgende").addEventListener("click", volgendeScherm);
    document.querySelectorAll(".bedieningspaneel button").forEach(button => {
        button.addEventListener("click", verwerkAntwoord);
    })
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
    let sec = tijd / 60;

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

const toonScherm = (id, binnenscherm) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
    if (id === "opgave" && binnenscherm) {
        document.querySelectorAll(".opgaveVenster").forEach(el => {
            el.classList.toggle("hidden", el.id !== binnenscherm);
        })
    }
};

window.addEventListener("load", setup);