// Importer prompt.js (si besoin)
import { prompt } from './prompt.js';

// Fonction pour ajouter un caractère spécial
function carSpec() {
    let caracteresSpeciaux = "!@#$%^&*()";
    let caractereAleatoire = caracteresSpeciaux[Math.floor(Math.random() * caracteresSpeciaux.length)];
    return caractereAleatoire;
}

// Fonction pour ajouter un chiffre
function chiffre() {
    let chiffreAleatoire = Math.floor(Math.random() * 10); // Chiffres de 0 à 9
    return chiffreAleatoire.toString(); // Convertir en chaîne de caractères
}

// Fonction pour ajouter une majuscule
function majuscules() {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Toutes les lettres majuscules
    let caractereAleatoire = caracteres[Math.floor(Math.random() * caracteres.length)];
    return caractereAleatoire;
}

// Fonction pour ajouter une lettre minuscule
function minuscules() {
    let caracteres = 'abcdefghijklmnopqrstuvwxyz'; // Toutes les lettres minuscules
    let caractereAleatoire = caracteres[Math.floor(Math.random() * caracteres.length)];
    return caractereAleatoire;
}

let fonctions = [minuscules];

// Demander le nombre de caractères
let numberOfChar = parseInt(prompt("Combien de caractères ? (8-36)\n"));

const test = (numberOfChar) => {
    try {
        if (numberOfChar < 8 || numberOfChar > 36 || isNaN(numberOfChar)) {
            throw new Error(' Le nombre de caractère doit être compris entre 8 et 36');
        }
    } catch (error) {
        console.log("Erreur : ", error.message);
        numberOfChar = parseInt(prompt('Reessayez : combien de caractères ? (8-36)\n'));
        test(numberOfChar);
    }
};
test(numberOfChar);

//Créer un tableau avec le nombre de caractères demandé, initialisé à "-"
let passWord = new Array(numberOfChar).fill("-");

// Demander Caractères spéciaux 
let charSpc = prompt("Caractères spéciaux ? (y/n)\n");
if ((charSpc == "y") || (charSpc == "Y")) {
    fonctions.push(carSpec);
}

// Demander Chiffres
let chiffres = prompt("Chiffres ? (y/n)\n");
if ((chiffres == "y") || (chiffres == "Y")) {
    fonctions.push(chiffre);
}

// Demander Majuscules
let maj = prompt("Majuscules ? (y/n)\n");
if ((maj == "y") || (maj == "Y")) {
    fonctions.push(majuscules);
}

// Utiliser les fonctions pour remplir le mot de passe
for (let i = 0; i < passWord.length; i++) {
    let fonctionAleatoire = fonctions[Math.floor(Math.random() * fonctions.length)];
    if (passWord[i] === "-") {
        passWord[i] = fonctionAleatoire();
    }
}

// Afficher le mot de passe généré
console.log("Mot de passe généré :", passWord.join('')); // join pour concaténer les éléments du tableau en une seule chaîne
