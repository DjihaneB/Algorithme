import { prompt } from "./prompt.js";

function askPasswordLength() {
    let length = Number(prompt("🔢 Combien de caractères ? (8-36)\n"));

    if (isNaN(length) || length < 8 || length > 36) {
        throw new Error("La longueur du mot de passe doit être comprise entre 8 et 36 caractères.");
    }
    return length;
}

function askSpecialChars() {
    let special = prompt("🔣 Caractères spéciaux ? (y/n)\n");
    if (special !== 'y' && special !== 'n') {
        throw new Error("Veuillez répondre par 'y' pour oui ou 'n' pour non.");
    }
    return special === "y";
}

function askNumber() {
    let number = prompt("🔢 Chiffres ? (y/n)\n");
    if (number !== 'y' && number !== 'n') {
        throw new Error('Veuillez répondre par "y" pour oui ou "n" pour non.');
    }
    return number === 'y';
}

function askUppercase() {
    let uppercase = prompt("⬆️ Majuscules ? (y/n)\n");
    if (uppercase !== 'y' && uppercase !== 'n') {
        throw new Error('Veuillez répondre par "y" pour oui ou "n" pour non.');
    }
    return uppercase === "y";
}

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const SPECIALCHARS = "!\"#$%&'()*+,-./:;<=>?@[]";
const NUMBERS = "1234567890"; // Ajout du chiffre 0 pour inclure tous les chiffres de 0 à 9

function generatePassword(length, special, number, uppercase) {
    let charset = LOWERCASE;
    if (special) { charset += SPECIALCHARS; }
    if (number) { charset += NUMBERS; }
    if (uppercase) { charset += UPPERCASE; }

    let password = "";
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    if (number && !/\d/.test(password)) {
        password = generatePassword(length, special, number, uppercase);
    }

    if (uppercase && password.toLowerCase() === password) {
        console.log('password', password);
        return generatePassword(length, special, number, uppercase);
    }
    return password;
}

function main() {
    let length = null;
    let number = null;
    let special = null;
    let uppercase = null;

    while (length === null || number === null || special === null || uppercase === null) {
        try {
            if (length === null) { length = askPasswordLength(); }
            if (number === null) { number = askNumber(); }
            if (special === null) { special = askSpecialChars(); }
            if (uppercase === null) { uppercase = askUppercase(); }
        } catch (error) {
            console.error(error.message);
        }
    }

    const password = generatePassword(length, special, number, uppercase);
    console.log("Le mot de passe généré:  ", password);
}

main();
