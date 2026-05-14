const categorieen = {

    Werktuig: [
        "Hamer", "Schroevendraaier", "Tang", "Boormachine", "Zaag",
        "Moersleutel", "Vijl", "Beitel", "Waterpas", "Bankschroef",
        "Schaar", "Stanleymes", "Meetlint", "Lijmklem", "Ratelsleutel",
        "Dopsleutel", "Boor", "Heggenschaar", "Soldeerbout", "Krik",
        "Lasapparaat", "Pincet", "Koevoet", "Niettang", "Verfroller",
        "Spatel", "Moker", "Multimeter", "Tuingereedschap", "Schaaf",
        "Hark", "Schop", "Riek", "Trekzaag", "Metaalzaag",
        "Momentsleutel", "Kitpistool", "Handboor", "Steeksleutel", "Punttang"
    ],

    Vis: [
        "Zalm", "Tonijn", "Haring", "Kabeljauw", "Sardine",
        "Forel", "Karper", "Paling", "Snoek", "Baars",
        "Makreel", "Ansjovis", "Rog", "Steur", "Meerval",
        "Goudvis", "Zeebaars", "Koolvis", "Bot", "Tong",
        "Heilbot", "Tilapia", "Guppy", "Clownvis", "Hamerhaai",
        "Haai", "Barracuda", "Tarbot", "Zeeduivel", "Brasem",
        "Koi", "Zwaardvis", "Marlijn", "Kabeljauw", "Karpersnoek",
        "Piranha", "Maanvis", "Stekelbaars", "Poon", "Alen"
    ],

    Boom: [
        "Eik", "Beuk", "Berk", "Den", "Spar",
        "Esdoorn", "Wilg", "Populier", "Kastanje", "Linde",
        "Lariks", "Ceder", "Olijfboom", "Palmboom", "Taxus",
        "Acacia", "Magnolia", "Sequoia", "Plataan", "Iep",
        "Hazelaar", "Walnootboom", "Kersenboom", "Appelboom", "Perenboom",
        "Citroenboom", "Vijgenboom", "Amandelboom", "Kokospalm", "Cipres",
        "Jeneverbes", "Es", "Meidoorn", "Treurwilg", "Mammoetboom",
        "Rubberboom", "Bananenboom", "Gingko", "Els", "Lork"
    ],

    Metaal: [
        "Ijzer", "Koper", "Zilver", "Goud", "Brons",
        "Tin", "Lood", "Nikkel", "Aluminium", "Zink",
        "Platina", "Titanium", "Chroom", "Staal", "Messing",
        "Kwik", "Wolfraam", "Kobalt", "Magnesium", "Palladium",
        "Rhodium", "Iridium", "Lithium", "Uranium", "Osmium",
        "Cadmium", "Mangaan", "Bismut", "Tantaal", "Vanadium",
        "Zirkonium", "Gallium", "Indium", "Molybdeen", "Beryllium",
        "Natrium", "Kalium", "Calcium", "Scandium", "Ruthenium"
    ],

    Vloeistof: [
        "Water", "Melk", "Benzine", "Diesel", "Olie",
        "Sap", "Azijn", "Limonade", "Wijn", "Bloed",
        "Shampoo", "Zeep", "Inkt", "Vruchtensap",
        "Parfum", "Koffie", "Thee", "Chocolademelk", "Jus",
        "Petroleum", "Lava", "Regenwater", "Slijk", "Thee",
        "Room", "Bouillon", "Motorolie", "Sinaasappelsap",
        "Antivries", "Bier", "Cola", "Smoothie", "Wijn",
        "Sojasaus", "Ketchup", "Saus", "Aardbeiensap"
    ],

    Land: [
        "België", "Nederland", "Frankrijk", "Duitsland", "Spanje",
        "Italië", "Portugal", "Zweden", "Noorwegen", "Finland",
        "India", "China", "Japan", "Canada", "Mexico",
        "Brazilië", "Argentinië", "Australië", "Egypte", "Uruguay",
        "Turkije", "Rusland", "Polen", "Oekraïne", "Griekenland",
        "Zwitserland", "Oostenrijk", "Denemarken", "Ierland", "IJsland",
        "Peru", "Chili", "Colombia", "Thailand", "Vietnam",
        "Zuid-Afrika", "Nigeria", "Kenia", "Saudi-Arabië", "Pakistan"
    ],

    Kleren: [
        "Broek", "Trui", "Jas", "T-shirt", "Hemd",
        "Sokken", "Handschoen", "Muts", "Sjaal", "Rok",
        "Jurkje", "Short", "Blazer", "Vest", "Pet",
        "Pyjama", "Onderbroek", "Bh", "Regenjas", "Overall",
        "Jeans", "Sandalen", "Sneakers", "Laarzen", "Pantoffels",
        "Zwemshort", "Bikini", "Kostuum", "Stropdas", "Schort",
        "Bodywarmer", "Legging", "Topje", "Polo", "Cardigan",
        "Poncho", "Trainingsbroek", "Sportshirt", "Winterjas", "Kousen"
    ],

    Transport: [
        "Auto", "Bus", "Trein", "Fiets", "Vliegtuig",
        "Boot", "Tram", "Metro", "Motor", "Helikopter",
        "Step", "Koets", "Skateboard", "Taxi", "Camion",
        "Zeilboot", "Kajak", "Kano", "Racewagen", "Ambulance",
        "Brandweerwagen", "Politieauto", "Raketten", "Spaceshuttle", "Hovercraft",
        "Segway", "eenwieler", "Bakfiets", "Tractor", "Bulldozer",
        "Vrachtwagen", "Jetski", "Cruiseschip", "Veerboot", "Pedalo",
        "Luchtballon", "Mountainbike", "Scooter", "Minibus"
    ],

    Vogel: [
        "Meeuw", "Arend", "Mus", "Duif", "Kraai",
        "Papegaai", "Uil", "Specht", "Zwaan", "Pelikaan",
        "Flamingo", "Kalkoen", "Struisvogel", "Pinguïn", "Kanarie",
        "Ekster", "Merel", "Roodborstje", "Reiger", "Ooievaar",
        "Kievit", "Buizerd", "Havik", "Fazant", "Koolmees",
        "Kolibrie", "Gans", "Eend", "Albatros", "Valk",
        "Raaf", "Parkiet", "Lijster", "Koekoek", "Nachtegaal",
        "Aalscholver", "Sijs", "Tortelduif", "Grutto", "Wulp"
    ],

    Insect: [
        "Mug", "Vlieg", "Bij", "Wesp", "Kever",
        "Mier", "Sprinkhaan", "Libelle", "Vlinder", "Mot",
        "Torp", "Kakkerlak", "Lieveheersbeestje", "Vlo", "Luis",
        "Bidsprinkhaan", "Cicade", "Hoornaar", "Termiet", "Rups",
        "Gaasvlieg", "Meikever", "Waterjuffer", "Oorworm", "Zilvervisje",
        "Pissebed", "Wandelende tak", "Bladluis", "Fruitvlieg", "Steekmug",
        "Dazen", "Bromvlieg", "Schorpioenvlieg", "Mestkever", "Veenmol",
        "Vuurmier", "Junikever", "Mierleeuw", "Blauwe vlinder", "Sabelsprinkhaan"
    ],

    Gebouw: [
        "Huis", "Flat", "Kasteel", "Kerk", "School",
        "Bibliotheek", "Museum", "Stadhuis", "Hotel", "Supermarkt",
        "Appartement", "Ziekenhuis", "Politiebureau", "Brandweerkazerne",
        "Restaurant", "Café", "Station", "Loods", "Fabriek",
        "Kantoor", "Theater", "Cinema", "Sporthal", "Winkelcentrum",
        "Tankstation", "Bunker", "Vuurtoren", "Torengebouw", "Kathedraal",
        "Tempel", "Moskee", "Synagoge", "Villa", "Schuur",
        "Laboratorium", "Observatorium", "Gevangenis", "Paleis", "Garage"
    ]
};