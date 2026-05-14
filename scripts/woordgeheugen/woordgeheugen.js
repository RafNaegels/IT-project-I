const global = {
    AANTAL_PUNTEN: 0,
    AANTAL_FOUTEN: 0,
    VOLGEND_SCHERM: null,
}


const Weergeef = {
    CATEGORIE: "categorie",
    WOORDEN: "woord",
    ANTWOORD: "antwoord",
}

const setup = () => {
    toonScherm("instructie");
    addEventListeners();
}

const startTest = () => {
    global.VOLGEND_SCHERM = Weergeef.CATEGORIE;
    //genereerOpgave();
    volgendeScherm();
}

const genereerOpgave = () => {

    let aantalOvereenKomsten = Math.floor(Math.random() * 4);
    let koppels = []
    let categorieNamen = Object.keys(categorieen);

    //selecteren van categorie - woord koppels die overeenkomen
    for (let i = 0; i < aantalOvereenKomsten; i++) {
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
    console.log(koppels);
}

const volgendeScherm = () => {
    switch (global.VOLGEND_SCHERM) {
        case Weergeef.CATEGORIE:
            console.log("case categorie");
            toonScherm("opgave", "categorie");
            global.VOLGEND_SCHERM = Weergeef.WOORDEN;
            break;

        case Weergeef.WOORDEN:
            console.log("case woorden");
            toonScherm("opgave", "woord");
            global.VOLGEND_SCHERM = Weergeef.ANTWOORD;
            break;

        case Weergeef.ANTWOORD:
            console.log("case antwoord");
            toonScherm(global.VOLGEND_SCHERM);
            global.VOLGEND_SCHERM = Weergeef.CATEGORIE;
            break;
    }
}


const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", startTest);
    document.getElementById("volgende").addEventListener("click", volgendeScherm);
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