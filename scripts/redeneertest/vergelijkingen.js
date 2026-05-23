const categorieTags = {
    voertuig:   ["kan_bewegen", "heeft_locatie"],
    persoon:    ["kan_bewegen", "heeft_locatie", "heeft_emotie", "heeft_grootte", "heeft_lichaam", "heeft_gewicht"],
    gebouw:     ["heeft_locatie", "heeft_hoogte", "heeft_afstand"],
    landschap:  ["heeft_locatie", "heeft_afstand"],
    groep:      ["is_groep", "kan_bewegen", "heeft_locatie", "heeft_aantal"],
    uitrusting: ["is_object", "heeft_gewicht"]
};

const subjecten = {
    voertuig: [
        "Helikopter",
        "Tram",
        "Truck",
        "Veerboot",
        "Trein",
        "Tank",
        "Jeep",
        "Motor",
        "Bus",
        "Fiets",
        "Onderzeeër",
        "Vliegtuig"
    ],

    uitrusting: [
        "Bajonet",
        "Helm",
        "Geweer",
        "Pistool",
        "Kogelvrijvest",
        "Rugzak",
        "Radio",
        "Verrekijker",
        "Zaklamp",
        "Munitiekist"
    ],

    persoon: [
        "Politieman",
        "Pompier",
        "Soldaat",
        "Arts",
        "Piloot",
        "Kapitein",
        "Agent",
        "Verpleegkundige",
        "Jager",
        "Ingenieur"
    ],

    groep: [
        "Bataljon",
        "Patrouille",
        "Regiment",
        "Compagnie",
        "Peloton",
        "Eskader",
        "Bemanning",
        "Team",
        "Brigade",
        "Konvooi"
    ],

    landschap: [
        "Akker",
        "Weide",
        "Rivier",
        "Vijver",
        "Bos",
        "Zee",
        "Oceaan",
        "Berg",
        "Vallei",
        "Moeras",
        "Woestijn",
        "Eiland",
        "Klif",
        "Strand"
    ],

    gebouw: [
        "Kerk",
        "Brug",
        "Boom",
        "Flatgebouw",
        "Wolkenkrabber",
        "Toren",
        "Kasteel",
        "School",
        "Ziekenhuis",
        "Bunker",
        "Magazijn",
        "Museum",
        "Treinstation",
        "Stadion"
    ]
};

const vergelijkingen = [
    {
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