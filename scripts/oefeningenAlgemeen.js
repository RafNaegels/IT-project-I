const generalSetup = () => {
    document.getElementById("instellingenKnop").addEventListener('click', toggleMenu);
    document.getElementById("duur").addEventListener('change', spelduurInstellen);
}

const startTimer = () => {
    updateTimerDisplay();
    global.VISUELE_TIMER = setInterval(updateResterendeTijd, 1000);
}

const updateResterendeTijd = () => {
    global.RESTERENDE_TIJD--;
    if(global.RESTERENDE_TIJD <= 0) {
        clearInterval(global.VISUELE_TIMER);
        clearTimeout(global.TIMER_ID);
    }
    updateTimerDisplay();
}

const updateTimerDisplay = () => {
    let tijd = global.RESTERENDE_TIJD;
    let min = Math.floor(tijd / 60);
    let sec = tijd / 60;


    document.getElementById("minuten").textContent = String(min).padStart(2, '0');
    document.getElementById("seconden").textContent = String(sec).padStart(2, '0');
}


const spelduurInstellen = () => {
    let tijd = document.getElementById("duur").value;

    global.DUUR_OEFENING = tijd * 60000;
    global.RESTERENDE_TIJD = tijd * 60;
}

const toggleMenu = () => {
    document.getElementById("instellingenMenu").classList.toggle('hidden');
}

window.addEventListener("load", generalSetup);
