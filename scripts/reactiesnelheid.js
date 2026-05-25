const global = {
    GRID_DIMENSIE: 15,
    AANTAL_OPLICHTENDE_VAKJES: 35,
    GEMARKEERDE_VAKJES: null,
    OPGELICHT_VAKJE: null,
}

const setup = () => {
    toonScherm("startScherm");
    addEventListeners();
}

const startTest = () => {
    toonScherm("opgave");
    gridSetup();
    lichtVolgendeVakjeOp();
    //stopwatch
}

const lichtVolgendeVakjeOp = () => {
    global.OPGELICHT_VAKJE = global.GEMARKEERDE_VAKJES.pop();
    document.getElementById(global.OPGELICHT_VAKJE).classList.add("opgelicht");
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
    console.log("id vakje", e.target.id);
    console.log("gemarkeerd ", e.target.classList.contains("gemarkeerd"));
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