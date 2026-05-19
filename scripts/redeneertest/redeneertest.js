const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_GEMAAKTE_OEFENINGEN: 0,
    GEKOZEN_ANTWOORD_ID: null,
    CORRECT_ANTWOORD_ID: null,
    DUUR_OEFENING: 4*60*1000,
    TIMER: null,
}

const setup = () => {
    toonScherm("startScherm");
    addEventListeners();
}

const startTest = () => {
    toonScherm("opgave");
    global.TIMER = setTimeout(verwerkResultaat, global.DUUR_OEFENING);
}

const volgende = () => {
    verwerkAntwoord();
    nieuwOpgave();
}

const nieuwOpgave = () => {
    // samenstellen van opgave
    // renderen van opgave
    // 'markeren' van de correcte antwoordknop
}

const verwerkAntwoord = () => {
    global.GEKOZEN_ANTWOORD_ID === global.CORRECT_ANTWOORD_ID ? global.AANTAL_PUNTEN++ : global.AANTAL_FOUTEN++;
    global.AANTAL_GEMAAKTE_OEFENINGEN++;
}

const geselecteerdAntwoord = (e) => {
    document.querySelectorAll(".antwoordknop").forEach(el => {
        el.classList.remove("geselecteerd");
    });
    e.currentTarget.classList.add("geselecteerd");

    global.GEKOZEN_ANTWOORD_ID = Number(e.currentTarget.dataset.id);
}

const verwerkResultaat = () => {
    clearTimeout(global.TIMER);
    global.TIMER = null;

    let aantalOefeningen = document.getElementById("aantalOefeningen");
    let aantalFouten = document.getElementById("aantalFouten");
    let punten = document.getElementById("aantalPunten");

    punten.textContent = global.AANTAL_PUNTEN;
    aantalFouten.textContent = global.AANTAL_FOUTEN;
    aantalOefeningen.textContent = global.AANTAL_GEMAAKTE_OEFENINGEN;

    toonScherm("resultaat");
}

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
    document.getElementById("volgende").addEventListener("click", volgende);
    document.getElementById("opnieuw").addEventListener("click", startTest);
    document.querySelectorAll(".antwoordknop").forEach(el => {
       el.addEventListener("click", geselecteerdAntwoord);
       console.log(el.dataset.id);
    });
}

window.addEventListener("load", setup);
