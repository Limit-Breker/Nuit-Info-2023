let fieldQuestion = document.getElementById("question");
let compteurDegre = document.getElementById("compteur-degre");
let fieldDate = document.getElementById("date-compteur");
let fieldIncrement = document.getElementById("increment-compteur-degre")
let reponses = [...document.getElementsByClassName("reponse")];
let containerQuestion = document.getElementById("container-question");
let btnOk = document.getElementById("fermer-info");
let textPopup = document.getElementById("text-info");
let imgFG = document.getElementById("mapFG");

const MAUVAISE_FIN = 0;
const FIN_NEUTRE = 1;
const BONNE_FIN = 2;
const DATE_LIMITE = 2300;

class Jeu {
  constructor() {
    this.compteur = 0.0;
    this.increment = 0.03;
    this.date = new Date(Date.now());
    this.fin = -1;
    this.question = null;
    this.pause = true;
  }
}

function jouer() {
  btnOk.onclick=function() {document.dispatchEvent(new Event('closePopup'))};
  for (let i = 0; i<3; i++) {
    reponses[i].onclick = clicReponse;
  }
  let jeu = new Jeu();
  document.addEventListener('finJeu', function(e) { jeu.fin = e.detail.fin; })
  document.addEventListener('reponse', async function(e) { await handleReponse(jeu, e.detail) })
  document.addEventListener('closePopup', function(e) {closePopup(jeu)})
  ecrire(jeu);
  incrementer(jeu);
}

async function incrementer(jeu) {
  jeu.compteur += jeu.increment*5/12;
  incrementerDate(jeu.date);
  if (jeu.question == null) {
    if (Math.random() < 0.1) {
      question = await getQuestion(Math.round(Math.random() * 20));
      jeu.question = question;
    }
  }
  ecrire(jeu);
  testFin(jeu);
  if (jeu.fin < 0 && !jeu.pause) {
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
  else if (jeu.increment <= 0.0) {
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
  imgFG.style.opacity = 0.8-jeu.compteur/6.0;
  fieldDate.innerHTML = 'Année : '+jeu.date.getFullYear();
  compteurDegre.innerHTML = '+'+jeu.compteur.toFixed(2) +"°C";
  fieldIncrement.innerHTML = '+'+Math.abs(jeu.increment.toFixed(2))+ "°C/an";
  if (jeu.question != null ) {
    containerQuestion.classList.remove("invisible");
    fieldQuestion.innerHTML = jeu.question.intitule;
    for (let i = 0;i <3; i++) {
      reponses[i].innerHTML = jeu.question.reponse[i].intitule;
    }
  }
  else {
    containerQuestion.classList.add("invisible");
  }
}

async function getQuestion(x) {
  let json;
  await fetch('/api/get-earth-survival')
  .then(response => {
    // Vérifier si la réponse est OK (statut HTTP 200-299)
    if (!response.ok) {
      throw new Error('La requête a échoué avec le statut ' + response.status);
    }
    
    // Convertir la réponse JSON en objet JavaScript
    return response.json();
  })
  .then(data => {
    // Traiter les données ici
    json = data;
  })
  .catch(error => {
    // Gérer les erreurs ici
    console.error('Erreur lors de la récupération des données:', error);
  });
  return json.question[x];
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

function closePopup(jeu) {
  document.getElementById("popup-info").classList.add("invisible");
  jeu.pause = false;
  console.log(jeu.pause)
  setTimeout(incrementer(jeu),1000/3);
}

function clicReponse(e) {
  document.dispatchEvent(new CustomEvent('reponse',{detail: e.srcElement.id.charAt(7)-1}));
}

async function handleReponse(jeu, num) {
  jeu.increment += jeu.question.reponse[num].increment;
  await ouvrePopup(jeu,jeu.question.popup);
  jeu.question = null;
}

async function ouvrePopup(jeu, texte) {
  jeu.pause = true;
  textPopup.innerHTML = texte;
  document.getElementById("popup-info").classList.remove("invisible");
  
}
jouer();