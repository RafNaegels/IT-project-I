const global = {
    BOVENSTE_UITKOMST: 0,
    ONDERSTE_UITKOMST: 0,

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
    genereerOpgaves();
    markCorrect();
    toonScherm("opgave");
}

const genereerUitkomsten = () => {

}

const genereerOpgaves = () => {
    let operandSelectie = Math.random();

    if (soortSelectie < 0.25) {

    }
}

const markCorrect = () => {

}

const toonScherm = (id) => {
    document.querySelectorAll(".oefeningDisplayFD").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
};











window.addEventListener("load", setup);