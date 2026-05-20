const categorieTags = {
    voertuig:   ["kan_bewegen", "heeft_locatie"],
    persoon:    ["kan_bewegen", "heeft_locatie", "heeft_emotie", "heeft_grootte", "heeft_lichaam"],
    gebouw:     ["heeft_locatie", "heeft_hoogte", "heeft_afstand"],
    landschap:  ["heeft_locatie", "heeft_afstand"],
    groep:      ["is_groep", "kan_bewegen", "heeft_locatie", "heeft_aantal"],
    uitrusting: ["is_object", "heeft_gewicht"]
};

const subjecten = [
    // voertuigen
    { naam: "Helikopter", categorie: "voertuig" },
    { naam: "Tram", categorie: "voertuig" },
    { naam: "Truck", categorie: "voertuig" },
    { naam: "Veerboot", categorie: "voertuig" },
    { naam: "Trein", categorie: "voertuig" },
    { naam: "Tank", categorie: "voertuig" },
    { naam: "Jeep", categorie: "voertuig" },
    { naam: "Motor", categorie: "voertuig" },
    { naam: "Bus", categorie: "voertuig" },
    { naam: "Fiets", categorie: "voertuig" },
    { naam: "Onderzeeër", categorie: "voertuig" },
    { naam: "Vliegtuig", categorie: "voertuig" },

    // uitrusting
    { naam: "Bajonet", categorie: "uitrusting" },
    { naam: "Helm", categorie: "uitrusting" },
    { naam: "Geweer", categorie: "uitrusting" },
    { naam: "Pistool", categorie: "uitrusting" },
    { naam: "Kogelvrij vest", categorie: "uitrusting" },
    { naam: "Rugzak", categorie: "uitrusting" },
    { naam: "Radio", categorie: "uitrusting" },
    { naam: "Verrekijker", categorie: "uitrusting" },
    { naam: "Zaklamp", categorie: "uitrusting" },
    { naam: "Munitiekist", categorie: "uitrusting" },

    // personen
    { naam: "Politieman", categorie: "persoon" },
    { naam: "Pompier", categorie: "persoon" },
    { naam: "Soldaat", categorie: "persoon" },
    { naam: "Arts", categorie: "persoon" },
    { naam: "Piloot", categorie: "persoon" },
    { naam: "Kapitein", categorie: "persoon" },
    { naam: "Agent", categorie: "persoon" },
    { naam: "Verpleegkundige", categorie: "persoon" },
    { naam: "Jager", categorie: "persoon" },
    { naam: "Ingenieur", categorie: "persoon" },

    // groepen
    { naam: "Bataljon", categorie: "groep" },
    { naam: "Patrouille", categorie: "groep" },
    { naam: "Regiment", categorie: "groep" },
    { naam: "Compagnie", categorie: "groep" },
    { naam: "Peloton", categorie: "groep" },
    { naam: "Eskader", categorie: "groep" },
    { naam: "Bemanning", categorie: "groep" },
    { naam: "Team", categorie: "groep" },
    { naam: "Brigade", categorie: "groep" },
    { naam: "Konvooi", categorie: "groep" },

    // landschappen
    { naam: "Akker", categorie: "landschap" },
    { naam: "Weide", categorie: "landschap" },
    { naam: "Rivier", categorie: "landschap" },
    { naam: "Vijver", categorie: "landschap" },
    { naam: "Bos", categorie: "landschap" },
    { naam: "Zee", categorie: "landschap" },
    { naam: "Oceaan", categorie: "landschap" },
    { naam: "Berg", categorie: "landschap" },
    { naam: "Vallei", categorie: "landschap" },
    { naam: "Moeras", categorie: "landschap" },
    { naam: "Woestijn", categorie: "landschap" },
    { naam: "Eiland", categorie: "landschap" },
    { naam: "Klif", categorie: "landschap" },
    { naam: "Strand", categorie: "landschap" },

    // gebouwen
    { naam: "Kerk", categorie: "gebouw" },
    { naam: "Brug", categorie: "gebouw" },
    { naam: "Boom", categorie: "gebouw" },
    { naam: "Flatgebouw", categorie: "gebouw" },
    { naam: "Wolkenkrabber", categorie: "gebouw" },
    { naam: "Toren", categorie: "gebouw" },
    { naam: "Kasteel", categorie: "gebouw" },
    { naam: "School", categorie: "gebouw" },
    { naam: "Ziekenhuis", categorie: "gebouw" },
    { naam: "Bunker", categorie: "gebouw" },
    { naam: "Magazijn", categorie: "gebouw" },
    { naam: "Stadion", categorie: "gebouw" }
];

const vergelijkingen = [
    {
        dimensie: "snelheid",
        vereisteTags: ["kan_bewegen"],
        relaties: {
            positief: "vlugger dan",
            negatief: "trager dan",
        },
        vragen: {
            positief: "Wat is vlugst",
            negatief: "Wat is traagst",
        },
    },
    {
        dimensie: "ruimtelijk_horizontaal",
        vereisteTags: ["heeft_locatie"],
        relaties: {
            positief: "rechts van",
            negatief: "links van",
        },
        vragen: {
            positief: "Wat staat het verst naar rechts?",
            negatief: "Wat staat het verst naar links?",
        },
    },
    {
        dimensie: "afstand",
        vereisteTags: ["heeft_afstand"],
        relaties: {
            positief: "verder dan",
            negatief: "dichterbij dan",
        },
        vragen: {
            positief: "Wat is het verst?",
            negatief: "Wat is het dichtstbij?",
        },
    },
    {
        dimensie: "hoogte",
        vereisteTags: ["heeft_hoogte"],
        relaties: {
            positief: "hoger dan",
            negatief: "lager dan",
        },
        vragen: {
            positief: "Wat is het hoogst?",
            negatief: "Wat is het laagst?",
        },
    },
    {
        dimensie: "grootte_fysiek",
        vereisteTags: ["heeft_grootte", "heeft_lichaam"],
        relaties: {
            positief: "groter dan",
            negatief: "kleiner dan",
        },
        vragen: {
            positief: "Wie is het grootst?",
            negatief: "Wie is het kleinst?",
        },
    },
    {
        dimensie: "gewicht",
        vereisteTags: ["heeft_gewicht"],
        relaties: {
            positief: "zwaarder dan",
            negatief: "lichter dan",
        },
        vragen: {
            positief: "Wat is het zwaarst?",
            negatief: "Wat is het lichtst?",
        },
    },
    {
        dimensie: "groepsgrootte",
        vereisteTags: ["heeft_aantal"],
        relaties: {
            positief: "groter dan",
            negatief: "kleiner dan",
        },
        vragen: {
            positief: "Welke groep heeft de meeste leden?",
            negatief: "Welke groep heeft de minste leden?",
        },
    },
    {
        dimensie: "gemoedstoestand",
        vereisteTags: ["heeft_emotie"],
        relaties: {
            positief: "blijer dan",
            negatief: "droeviger dan",
        },
        vragen: {
            positief: "Wie is het blijst?",
            negatief: "Wie is het droevigst?",
        },
    },
    {
        dimensie: "leeftijd_ervaring",
        vereisteTags: ["heeft_emotie"],
        relaties: {
            positief: "ouder dan",
            negatief: "jonger dan",
        },
        vragen: {
            positief: "Wie is de oudste?",
            negatief: "Wie is de jongste?",
        },
    },
    {
        dimensie: "moderniteit",
        vereisteTags: ["is_object"],
        relaties: {
            positief: "nieuwer dan",
            negatief: "ouder dan",
        },
        vragen: {
            positief: "Wat is het nieuwst?",
            negatief: "Wat is het oudst?",
        },
    }
];