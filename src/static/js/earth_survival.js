let fieldQuestion = document.getElementById("question");
let compteurDegre = document.getElementById("compteur-degre");
let fieldDate = document.getElementById("date-compteur");
let fieldIncrement = document.getElementById("increment-compteur-degre")
let reponses = [...document.getElementsByClassName("reponse")];

const MAUVAISE_FIN = 0;
const FIN_NEUTRE = 1;
const BONNE_FIN = 2;
const DATE_LIMITE = 2030;

class Jeu {
  constructor() {
    this.compteur = 0.0;
    this.increment = 0.03;
    this.date = new Date(Date.now());
    this.fin = -1;
    this.question = null;
  }

  
}

function jouer() {
  let jeu = new Jeu();
  document.addEventListener('finJeu', function(e) { jeu.fin = e.detail.fin; })
  ecrire(jeu);
  incrementer(jeu);
}

async function incrementer(jeu) {
  jeu.compteur += jeu.increment*5/12;
  incrementerDate(jeu.date);
  if (jeu.question === null) {
    if (Math.random() < 0.1) {
      question = await getQuestion(Math.round(Math.random() * 20));
      console.log('question trouvée');
      jeu.question = question;
    }
  }
  ecrire(jeu);
  testFin(jeu);
  if (jeu.fin < 0) {
    setTimeout(incrementer,1000/3,jeu);
  }
}

function testFin(jeu) {
  if (jeu.compteur >= 6.0) {
    document.dispatchEvent(new CustomEvent('finJeu', {
      detail: {
        fin: MAUVAISE_FIN
      }
    })
    );
  }
  else if (jeu.increment === 0.0) {
    document.dispatchEvent(new CustomEvent('finJeu', {
      detail: {
        fin: BONNE_FIN
      }
    })
    );
  }
  else if (jeu.date.getFullYear() >= DATE_LIMITE) {
    document.dispatchEvent(new CustomEvent('finJeu', {
      detail: {
        fin: FIN_NEUTRE
      }
    })
    );
  }
}

function ecrire(jeu) {
  fieldDate.innerHTML = jeu.date.getFullYear();
  compteurDegre.innerHTML = '+'+jeu.compteur.toFixed(2) +"°C";
  console.log(jeu.question);
  if (jeu.question != null ) {
    fieldQuestion.innerHTML = jeu.question.intitule;
  }
}

async function getQuestion(x) {
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