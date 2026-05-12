const setup = () => {
    toonScherm("startScherm");
    addEventListeners();
}

const startTest = () => {
    toonScherm("startTest");
}


















const addEventListeners = () => {
    document.getElementById("startScherm").addEventListener("click", startTest)
}


const toonScherm = (id, binnenId) => {
    document.querySelectorAll(".oefeningDisplay").forEach(el => {
        el.classList.toggle("hidden", el.id !== id);
    });
    if (binnenId) {
        document.querySelectorAll(".opgaveVenster").forEach(el => {
            el.classList.toggle("hidden", el.id !== binnenId);
        })
    }
};

window.addEventListener("load", setup);