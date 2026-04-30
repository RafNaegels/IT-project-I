const setup = () => {
    createStrings();
}

window.addEventListener("load", setup);
import stringPool from "./stringPool.js";

const createStrings = () => {

    let baseString = selectRandomString();

    let mutatedString = createMutatedString(baseString);


}

const createMutatedString = (baseString) => {
    const mutatedString = "";
    const posities = getPosities(baseString);
    return mutate(baseString, posities);
}

const getPosities = (baseString) => {
    let posities = new Set();
    const aantalMutaties = Math.floor(Math.random() * 5);
    while (posities.size < aantalMutaties) {
        let positie = Math.floor(Math.random() * baseString.length);
        let char = baseString.charAt(positie);
        if (!" :/.@".includes(char)) {
            posities.add(positie);
        }
    }
    return posities;
}

const selectRandomString = () => {
    return stringPool[Math.floor(Math.random() * stringPool.length)];
}


// string muteren
const mutate = (baseString, posities) => {

    // string -> array (makkelijk aanpasbaar)
    let chars = baseString.split("");

    for (let i of posities) {

        let c = chars[i];

        let nieuw = randomChar(c);

        chars[i] = nieuw;
    }

    return chars.join("");
}

function randomChar(c) {

    if (c >= '0' && c <= '9') {
        return String.fromCharCode(
            '0'.charCodeAt(0) + Math.floor(Math.random() * 10)
        );
    }

    if (c >= 'A' && c <= 'Z') {
        return String.fromCharCode(
            'A'.charCodeAt(0) + Math.floor(Math.random() * 26)
        );
    }

    if (c >= 'a' && c <= 'z') {
        return String.fromCharCode(
            'a'.charCodeAt(0) + Math.floor(Math.random() * 26)
        );
    }

    return c;
}