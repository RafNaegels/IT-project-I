const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_GEMAAKTE_OEFENINGEN: 0,
    GEKOZEN_ANTWOORD_ID: null,
    CORRECT_ANTWOORD_ID: null,
    MINSTE_SUBJECT: null,
    MEESTE_SUBJECT: null,
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
    let stellingen = maakSyllogisme();

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

const maakSyllogisme = () => {
    // Kies een willekeurig patroon tussen 1 en 4
    let patroon = Math.floor(Math.random() * 4) + 1;
    let relatie = vergelijkingen[Math.floor(Math.random()*vergelijkingen.length)]; // bevat { positief: "vlugger dan", negatief: "trager dan" }
    let categorie = categorieTags[Math.floor(Math.random()*categorieTags.length)]; // bevat voertuig, persoon, gebouw
    let willekeurigeSubjecten = [];

    let i = 0;
    while (i < 3) {
        let randomIndex = Math.floor(Math.random() * subjecten.length);
        let gekozenSubject = subjecten[randomIndex];

        if (gekozenSubject.categorie === categorie && !willekeurigeSubjecten.includes(gekozenSubject)) {
            willekeurigeSubjecten.push(gekozenSubject);
            i++;
        }
    }

    global.MEESTE_SUBJECT = willekeurigeSubjecten[0];
    global.MINSTE_SUBJECT = willekeurigeSubjecten[2]

    let zin1, zin2;

    if (patroon === 1) {
        // Patroon A: 1 > 2 en 2 > 3
        zin1 = `${willekeurigeSubjecten[0].naam} ${relatie.positief} ${willekeurigeSubjecten[1].naam}`; // Tram vlugger dan Veerboot
        zin2 = `${willekeurigeSubjecten[1].naam} ${relatie.positief} ${willekeurigeSubjecten[2].naam}`; // Veerboot vlugger dan Helikopter

    }
    else if (patroon === 2) {
        // Patroon B: 3 < 2 en 2 < 1
        zin1 = `${willekeurigeSubjecten[2].naam} ${relatie.negatief} ${willekeurigeSubjecten[1].naam}`; // Helikopter trager dan Veerboot
        zin2 = `${willekeurigeSubjecten[1].naam} ${relatie.negatief} ${willekeurigeSubjecten[0].naam}`; // Veerboot trager dan Tram
    }
    else if (patroon === 3) {
        // Patroon C: 3 < 2 en 1 > 2 (Jouw voorbeeld!)
        zin1 = `${willekeurigeSubjecten[2].naam} ${relatie.negatief} ${willekeurigeSubjecten[1].naam}`; // Helikopter trager dan Veerboot
        zin2 = `${willekeurigeSubjecten[0].naam} ${relatie.positief} ${willekeurigeSubjecten[1].naam}`; // Tram vlugger dan Veerboot
    }
    else if (patroon === 4) {
        // Patroon D: 2 > 3 en 2 < 1
        zin1 = `${willekeurigeSubjecten[1].naam} ${relatie.positief} ${willekeurigeSubjecten[2].naam}`; // Veerboot vlugger dan Helikopter
        zin2 = `${willekeurigeSubjecten[1].naam} ${relatie.negatief} ${willekeurigeSubjecten[0].naam}`; // Veerboot trager dan Tram
    }

    if (Math.random() < 0.5) {
        return [zin1, zin2];
    } else {
        return [zin2, zin1];
    }
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
