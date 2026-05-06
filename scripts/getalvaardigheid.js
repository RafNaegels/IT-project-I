const global = {
    BOVENSTE_UITKOMST: 0,
    ONDERSTE_UITKOMST: 0,
    OPGAVE1: "",
    OPGAVE2: "",
}


const setup = () => {
    addEventListeners();
    toonScherm("startScherm")
}

const addEventListeners = () => {
    document.getElementById("startOefening").addEventListener("click", event => {
        startOefening();
    })
}

const startOefening = () => {
    resetGlobVars();
    genereerOpgaves();
    markCorrect();
    toonScherm("opgave");
}

const resetGlobVars = () => {
    global.BOVENSTE_UITKOMST = 0;
    global.ONDERSTE_UITKOMST = 0;
    global.OPGAVE1 = "";
    global.OPGAVE2 = "";
}

const genereerOpgaves = () => {
    let eersteOperandSelectie = Math.random();
    let tweedeOperandSelectie = Math.random();

    const r = Math.random();

    global.OPGAVE1 =
        eersteOperandSelectie < 0.25 ? maakOptelling() :
        eersteOperandSelectie < 0.5 ? maakVerschil() :
        eersteOperandSelectie < 0.75 ? maakProduct() :
        maakDeling();

    global.OPGAVE2 =
        tweedeOperandSelectie < 0.25 ? maakOptelling2() :
        tweedeOperandSelectie < 0.5 ? maakVerschil2() :
        tweedeOperandSelectie < 0.75 ? maakProduct2() :
        maakDeling2();

}

const maakOptelling = () => {
    let uitkomstVerdeling = Math.random();
    global.BOVENSTE_UITKOMST =
        uitkomstVerdeling < .75 ? 5 + Math.random() * 51 :
            51 + Math.random() * 50;
    const term1 = Math.floor(Math.random() * (global.BOVENSTE_UITKOMST - 1)) + 1;
    const term2 = global.BOVENSTE_UITKOMST - term1;
    return term1 + " + " + term2;
}

const maakVerschil = () => {
    let uitkomstVerdeling = Math.random();
    global.BOVENSTE_UITKOMST =
        uitkomstVerdeling < .75 ? 5 + Math.floor(Math.random() * 61) :
            66 + Math.floor(Math.random() * 50);
    const term1 = Math.floor(Math.random() * (global.BOVENSTE_UITKOMST - 1)) + 1;
    const term2 = global.BOVENSTE_UITKOMST + term1;
    return term2 + " - " + term1;
}

const maakProduct = () => {
    const product1 = Math.floor(Math.random() * 10) + 1;
    const product2 = Math.random() < .9 ? Math.floor(Math.random() * 10) + 1 :
        Math.floor(Math.random() * 5) + 11;
    global.BOVENSTE_UITKOMST = product1 * product2;
    return product1 + " x " + product2;
}

const maakDeling = () => {
    const term1 = Math.floor(Math.random() * 10) + 2;
    const term2 = Math.random() < .9 ? Math.floor(Math.random() * 10) + 2 :
        Math.floor(Math.random() * 9) + 12;
    if(Math.random() < 0.8) {
        global.BOVENSTE_UITKOMST = term1;
        return term1 * term2 + " / " + term1;
    } else {
        global.BOVENSTE_UITKOMST = term2;
        return term1 * term2 + " / " + term2;
    }
}

const maakOptelling2 = () => {
    global.ONDERSTE_UITKOMST = genereerNabijgelegenUitkomst();

    const term1 = Math.floor(Math.random() * (global.ONDERSTE_UITKOMST - 1)) + 1;
    const term2 = global.ONDERSTE_UITKOMST - term1;

    return term1 + " + " + term2;
}

const maakVerschil2 = () => {
    global.ONDERSTE_UITKOMST = genereerNabijgelegenUitkomst();

    const term1 = Math.floor(Math.random() * (global.ONDERSTE_UITKOMST - 1)) + 1;
    const term2 = global.ONDERSTE_UITKOMST + term1;

    return term2 + " - " + term1;
}

const maakProduct2 = () => {
    const term1 = Math.floor(Math.random() * (10 - 1)) + 1;
    const term2 = genereerFactor(term1);
    global.ONDERSTE_UITKOMST = term1 * term2;

    return term1 + " x " + term2;
}

const maakDeling2 = () => {
    const { factor1, factor2 } = genereerFactoren();
    const product = factor1 * factor2;

    if (Math.random() < 0.5) {
        return product + " / " + factor1;
    } else {
        return product + " / " + factor2;
    }
}

const genereerNabijgelegenUitkomst = () => {
    const min = Math.max(1, global.BOVENSTE_UITKOMST - 5);
    const max = global.BOVENSTE_UITKOMST + 5;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const genereerFactor = (term1) => {
    if(global.BOVENSTE_UITKOMST < term1 ) {
        return 1;
    }
    let i = 1;
    do {
        i++
    } while (i*term1 < global.BOVENSTE_UITKOMST - 5);
    return i;
}

const genereerFactoren = () => {
    const minQuotient = Math.max(1, global.BOVENSTE_UITKOMST - 5);
    const maxQuotient = global.BOVENSTE_UITKOMST + 5;

    const quotient =
        Math.floor(Math.random() * (maxQuotient - minQuotient + 1)) + minQuotient;

    const factor = Math.floor(Math.random() * 10) + 1;

    global.ONDERSTE_UITKOMST = quotient;

    return {
        factor,
        quotient
    };
};

const markCorrect = () => {

}

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplayFD").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
};











window.addEventListener("load", setup);