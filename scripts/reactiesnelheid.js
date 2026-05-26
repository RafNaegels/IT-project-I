const global = {
    GRID_DIMENSIE: 15,
    AANTAL_OPLICHTENDE_VAKJES: 25,
    AANTAL_FOUTEN: 0,
    GEMARKEERDE_VAKJES: null,
    OPGELICHT_VAKJE: null,
    LAATST_AANGEKLIKT: null, //fouten bij snelle input voorkomen
    START_TIJD: null,
}

const setup = () => {
    toonScherm("startScherm");
    addEventListeners();
}

const startTest = () => {
    toonScherm("opgave");
    resetGlobVars();
    gridSetup();
    document.getElementById("totaalVakjes").innerText = global.AANTAL_OPLICHTENDE_VAKJES.toString();
    global.START_TIJD = Date.now();
    lichtVolgendeVakjeOp();
}

const lichtVolgendeVakjeOp = () => {
    if(global.GEMARKEERDE_VAKJES.length === 0) {
        verwerkResultaat(Date.now());
        return;
    }
    global.OPGELICHT_VAKJE = global.GEMARKEERDE_VAKJES.pop();
    document.getElementById(global.OPGELICHT_VAKJE).classList.add("opgelicht");
}

const resetGlobVars = () => {
    global.AANTAL_FOUTEN = 0;
    global.LAATST_AANGEKLIKT = null;
    global.OPGELICHT_VAKJE = null;
    global.GEMARKEERDE_VAKJES = null;
    updateFoutDisplay();
}

const gridSetup = () => {
    let rooster = document.getElementById("rooster");
    rooster.innerHTML = "";
    rooster.style.gridTemplateColumns = `repeat(${global.GRID_DIMENSIE}, 15px)`;
    rooster.style.gridTemplateRows = `repeat(${global.GRID_DIMENSIE}, 15px)`
    let totaalAanVakjes = Math.pow(global.GRID_DIMENSIE, 2);
    global.GEMARKEERDE_VAKJES = selecteerWillekeurigeVakjes(totaalAanVakjes);

    for (let i = 0; i < totaalAanVakjes; i++) {
        let vakje = createEl("div", "vakje");
        if (global.GEMARKEERDE_VAKJES.includes(i.toString())) vakje.classList.add("gemarkeerd");
        vakje.id = i.toString();
        rooster.appendChild(vakje);
    }
}

const selecteerWillekeurigeVakjes = (vakjes) => {
    let geselecteerd = [];
    let i = 0;

    while (i < global.AANTAL_OPLICHTENDE_VAKJES) {
        let randomIndex = Math.floor(Math.random() * vakjes);
        if (!geselecteerd.includes(randomIndex)) {
            geselecteerd.push(randomIndex.toString());
            i++
        }
    }
    return geselecteerd;
}

const roosterInput = (e) => {
    let vakje = e.target
    if(e.target.id === global.OPGELICHT_VAKJE && vakje.id !== global.LAATST_AANGEKLIKT) {
        global.LAATST_AANGEKLIKT = vakje.id;
        vakje.className = "vakje";
        updateAantalHits();
        lichtVolgendeVakjeOp();
    } else {
        global.AANTAL_FOUTEN++
        updateFoutDisplay();
    }
}

const updateAantalHits = () => {
    let aantalHits = document.getElementById("aantalHits");
    aantalHits.innerHTML = (global.AANTAL_OPLICHTENDE_VAKJES - global.GEMARKEERDE_VAKJES.length).toString();
}

const verwerkResultaat = (eindTijd) => {
    toonScherm("resultaat");
    let duur = eindTijd - global.START_TIJD;
    document.getElementById("tijdsduur").innerText = (duur / 1000).toFixed(2);
    document.getElementById("aantalFouten").innerText = global.AANTAL_FOUTEN;
}

const updateFoutDisplay = () => {
    document.getElementById("liveFeedbackFouten").innerText = global.AANTAL_FOUTEN;
}

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
}

const createEl = (element, className, content) => {
    let el = document.createElement(element);
    if (className) el.className = className;
    if (content) el.appendChild(document.createTextNode(content));
    return el;
};

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
    document.getElementById("rooster").addEventListener("click", (e) => roosterInput(e));
    document.getElementById("opnieuw").addEventListener("click", startTest);
}

window.addEventListener("load", setup);