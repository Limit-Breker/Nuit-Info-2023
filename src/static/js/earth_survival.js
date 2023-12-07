let question = document.getElementById("question");
let compteurDegre = document.getElementById("compteur-degre");
let fieldDate = document.getElementById("date-compteur");
let reponses = [...document.getElementsByClassName("reponse")];

const MAUVAISE_FIN = 0;
const FIN_NEUTRE = 1;
const BONNE_FIN = 2;

class Jeu {
  constructor() {
    this.compteur = 0.0;
    this.increment = 0.03;
    this.date = Date.now();
  }
}

function jouer() {
  let jeu = new Jeu();
  let dateLimite = new Date(2400);
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
  jeu.compteur += jeu.increment/12;
  incrementerDate(jeu.date);
  setTimeout(incrementer(jeu),1/6);
  ecrire(jeu);
}

function ecrire(jeu) {
  fieldDate.innerHTML = jeu.date.getMonth() + ' '+ jeu.date.getFullYear;
}

function incrementerDate(date) {
  if (date.getMonth() == 11) {
    date.setMonth(0);
    date.setFullYear(date.getFullYear()+1);
  }
  else {
    date.setMonth(date.getMonth()+1);
  }
}