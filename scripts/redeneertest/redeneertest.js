const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    AANTAL_GEMAAKTE_OEFENINGEN: 0,
    GEKOZEN_ANTWOORD: null,
    CORRECT_ANTWOORD: null,
    DUUR_OEFENING: 4*60*1000,
    TIMER: null,
}

const setup = () => {
    toonScherm("startScherm");
    addEventListeners();
}

const startTest = () => {
    toonScherm("opgave");
    nieuwOpgave();
    global.TIMER = setTimeout(verwerkResultaat, global.DUUR_OEFENING);
    resetOefeningVars();
}

const volgende = () => {
    verwerkAntwoord();
    nieuwOpgave();
}

const nieuwOpgave = () => {
    let syllogisme = maakSyllogisme();
    renderOpgave(syllogisme);
}

const verwerkAntwoord = () => {
    global.GEKOZEN_ANTWOORD === global.CORRECT_ANTWOORD ? global.AANTAL_PUNTEN++ : global.AANTAL_FOUTEN++;
    global.AANTAL_GEMAAKTE_OEFENINGEN++;
    resetOefeningVars();
}

const renderOpgave = (syllogisme) => {
    document.getElementById("zin1").innerHTML = syllogisme.zin1;
    document.getElementById("zin2").innerHTML = syllogisme.zin2;
    document.getElementById("vraag").innerHTML = syllogisme.vraag;

    let geschuddeAntwoorden = shuffleAntwoorden(syllogisme.antwoorden);
    let antwoordBediening = document.getElementById("antwoordBediening");
    antwoordBediening.innerHTML = "";

    geschuddeAntwoorden.forEach(antwoord => {
        let button = createEl("button", "antwoordKnop", antwoord);
        button.dataset.id = antwoord;
        button.addEventListener("click", geselecteerdAntwoord);
        antwoordBediening.appendChild(button);
    })
}

const geselecteerdAntwoord = (e) => {
    document.querySelectorAll(".antwoordKnop").forEach(el => {
        el.classList.remove("geselecteerd");
    });
    e.currentTarget.classList.add("geselecteerd");
    global.GEKOZEN_ANTWOORD = e.currentTarget.dataset.id;
}

const verwerkResultaat = () => {
    let aantalOefeningen = document.getElementById("aantalOefeningen");
    let aantalFouten = document.getElementById("aantalFouten");
    let punten = document.getElementById("aantalPunten");

    punten.textContent = global.AANTAL_PUNTEN;
    aantalFouten.textContent = global.AANTAL_FOUTEN;
    aantalOefeningen.textContent = global.AANTAL_GEMAAKTE_OEFENINGEN;

    toonScherm("resultaat");
    resetGlobalVars();
    resetOefeningVars();
}


/*
* Eerst categorie kiezen.
* Dan passende vergelijking via tags.
* Dan subjecten uit diezelfde categorie.
* */
const maakSyllogisme = () => {
    // Kies een willekeurig patroon tussen 1 en 4
    let patroon = Math.floor(Math.random() * 4) + 1;
    let categorien = Object.keys(categorieTags);
    let categorie = categorien[Math.floor(Math.random()*categorien.length)]; // bevat voertuig, persoon, gebouw
    let vergelijking = selecteerGeschikteVergelijking(categorie); // bevat { positief: "vlugger dan", negatief: "trager dan" }
    let willekeurigeSubjecten = [];
    let subjectenVanCategorie = subjecten[categorie];
    console.log(subjectenVanCategorie);

    let i = 0;
    while (i < 3) {
        let randomIndex = Math.floor(Math.random() * subjectenVanCategorie.length);
        let gekozenSubject = subjectenVanCategorie[randomIndex];

        if (!willekeurigeSubjecten.includes(gekozenSubject)) {
            willekeurigeSubjecten.push(gekozenSubject);
            i++;
        }
    }

    let zin1, zin2;
    if (patroon === 1) {
        // Patroon A: 1 > 2 en 2 > 3
        zin1 = `${willekeurigeSubjecten[0]} ${vergelijking.relaties.positief} ${willekeurigeSubjecten[1]}`; // Tram vlugger dan Veerboot
        zin2 = `${willekeurigeSubjecten[1]} ${vergelijking.relaties.positief} ${willekeurigeSubjecten[2]}`; // Veerboot vlugger dan Helikopter

    }
    else if (patroon === 2) {
        // Patroon B: 3 < 2 en 2 < 1
        zin1 = `${willekeurigeSubjecten[2]} ${vergelijking.relaties.negatief} ${willekeurigeSubjecten[1]}`; // Helikopter trager dan Veerboot
        zin2 = `${willekeurigeSubjecten[1]} ${vergelijking.relaties.negatief} ${willekeurigeSubjecten[0]}`; // Veerboot trager dan Tram
    }
    else if (patroon === 3) {
        // Patroon C: 3 < 2 en 1 > 2
        zin1 = `${willekeurigeSubjecten[2]} ${vergelijking.relaties.negatief} ${willekeurigeSubjecten[1]}`; // Helikopter trager dan Veerboot
        zin2 = `${willekeurigeSubjecten[0]} ${vergelijking.relaties.positief} ${willekeurigeSubjecten[1]}`; // Tram vlugger dan Veerboot
    }
    else if (patroon === 4) {
        // Patroon D: 2 > 3 en 2 < 1
        zin1 = `${willekeurigeSubjecten[1]} ${vergelijking.relaties.positief} ${willekeurigeSubjecten[2]}`; // Veerboot vlugger dan Helikopter
        zin2 = `${willekeurigeSubjecten[1]} ${vergelijking.relaties.negatief} ${willekeurigeSubjecten[0]}`; // Veerboot trager dan Tram
    }

    let vraagType = Math.random() < 0.5 ? 'positief' : 'negatief';
    let vraagTekst = vergelijking.vragen[vraagType];

    if (vraagType === 'positief') {
        global.CORRECT_ANTWOORD = willekeurigeSubjecten[0]; // index 0 is altijd de overtreffende trap: grootste, verste, etc
    } else {
        global.CORRECT_ANTWOORD = willekeurigeSubjecten[2]; // index 2 is altijd de omgekeerde overtreffende trap: kleinste, dichtste etc

    }

    let zinnen = Math.random() < 0.5 ? [zin1, zin2] : [zin2, zin1];

    return {
        zin1: zinnen[0],
        zin2: zinnen[1],
        vraag: vraagTekst,
        antwoorden: willekeurigeSubjecten,
    };
}

const shuffleAntwoorden = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const selecteerGeschikteVergelijking = (categorie) => {
    let tagsVanCategorie = categorieTags[categorie];

    let geschikteLijst = [];

    for (let i = 0; i < vergelijkingen.length; i++) {
        let vg = vergelijkingen[i];

        if (vg.vereisteTags.some(tag => tagsVanCategorie.includes(tag))) {
            geschikteLijst.push(vg);
        }
    }

    if (geschikteLijst.length === 0) {
        console.log("geschikteLijst niet gevuld");
        return vergelijkingen[Math.floor(Math.random() * vergelijkingen.length)];
    }
    console.log("geschikteLijst is succesvol gevuld!");
    return geschikteLijst[Math.floor(Math.random() * geschikteLijst.length)];
};

const resetGlobalVars = () => {
    clearTimeout(global.TIMER);
    global.TIMER = null;
    global.AANTAL_FOUTEN = 0;
    global.AANTAL_PUNTEN = 0;
    global.AANTAL_GEMAAKTE_OEFENINGEN = 0;
}

const resetOefeningVars = () => {
    global.CORRECT_ANTWOORD = null;
    global.GEKOZEN_ANTWOORD = null;
}

const createEl = (element, className, content) => {
    let el = document.createElement(element);
    if (className) el.className = className;
    if (content) el.appendChild(document.createTextNode(content));
    return el;
};

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
    document.getElementById("volgende").addEventListener("click", volgende);
    document.getElementById("opnieuw").addEventListener("click", startTest);
}

window.addEventListener("load", setup);
