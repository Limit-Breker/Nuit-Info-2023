let question = document.getElementById("question");
let compteurDegre = document.getElementById("compteur-degre");
let fieldDate = document.getElementById("date-compteur");
let fieldIncrement = document.getElementById("increment-compteur-degre")
let reponses = [...document.getElementsByClassName("reponse")];

const MAUVAISE_FIN = 0;
const FIN_NEUTRE = 1;
const BONNE_FIN = 2;

class Jeu {
  constructor() {
    this.compteur = 0.0;
    this.increment = 0.03;
    this.date = new Date(Date.now());
    console.log(this.date);
  }
}

function jouer() {
  let jeu = new Jeu();
  let dateLimite = new Date(2400);
  ecrire(jeu)
  incrementer(jeu);
  if (jeu.compteur >= 6.0) {
    return MAUVAISE_FIN;
  }
  else if (jeu.increment == 0) {
    return BONNE_FIN;
  }
  else {
    return FIN_NEUTRE
  }
}

function incrementer(jeu) {
  jeu.compteur += jeu.increment*5/12;
  incrementerDate(jeu.date);
  ecrire(jeu);
  setTimeout(incrementer,1000/3,jeu);
}

function ecrire(jeu) {
  fieldDate.innerHTML = jeu.date.getFullYear();
  compteurDegre.innerHTML = '+'+jeu.compteur.toFixed(2) +"°C";
}

function incrementerDate(date) {
  let nvMois = date.getMonth() + 5;
  if (nvMois > 11) {
    date.setMonth(nvMois%12);
    date.setFullYear(date.getFullYear()+1);
  }
  else {
    date.setMonth(nvMois);
  }
}

function intToMonth(numeroMois) {
  // Vérifier si le numéro de mois est valide (entre 1 et 12)
  if (numeroMois < 0 || numeroMois > 11) {
    return "Numéro de mois invalide";
}

// Tableau des noms des mois en français
const moisEnFrancais = [
    "Janvier", "Février", "Mars",
    "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre",
    "Octobre", "Novembre", "Décembre"
];

// Retourner le mois correspondant
return moisEnFrancais[numeroMois];
}

jouer();