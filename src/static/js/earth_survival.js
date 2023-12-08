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
  
  document.addEventListener('finJeu', function(e) { fin(jeu,e.detail.fin); })
  document.addEventListener('reponse', async function(e) { await handleReponse(jeu, e.detail) })
  document.addEventListener('closePopup', function(e) {closePopup(jeu)})
 
  ecrire(jeu);
  incrementer(jeu);
}

function fin(jeu,fin) {
  jeu.fin = fin;
  switch (fin) {
    case MAUVAISE_FIN : ouvrePopup(jeu,"Votre mission a échoué …<br>Le monde est plongé dans les ténèbres sans électricité ni eau et les pressions sur les ressources naturelles ont déclenché des conflits géopolitiques et des migrations à grande échelle, exacerbant<strong> l’anéantissement mondial. </strong><br>Les conditions environnementales deviennent si hostiles que <strong>toute forme de  vie sur Terre est éradiquée</strong>. La planète devient complètement inhabitable, marquant une tragédie écologique inimaginable. <br><strong>GAME OVER </strong> <br>La Terre n’est plus une planète capable d’accueillir la vie, sa surface est un désert hostile et inanimé…"); break;
    case BONNE_FIN : ouvrePopup(jeu,"<strong>La température s’est stabilisée </strong>, grâce à vos précieux conseils, les quelques ressources qui restent aux survivants leur ont permis de développer des les technologies nécessaires à la décroissance de nos émissions de CO2. La survie à la surface est désormais envisageable. <br>C’est une<strong> faible victoire</strong> mais une lumière d’espoir dans notre monde devenu chaotique ! <br>Les niveaux de pollution atmosphérique sont toujours élevés, et les écosystèmes terrestres et marins<strong> mettront du temps avant de retrouver un équilibre viable </strong>tandis que des régions toujours en proie aux radiations solaires néfastes non protégées par la couche d’ozone resteront des terrains condamnés à des conditions météorologiques extrêmes et désertiques pour l’éternité.<br>L’Humanité va pouvoir se reconstruire au fil des siècles et prendre un nouveau départ grâce à vos connaissances solides. <strong>L’Histoire en retiendra le terrible châtiment que réserve la nature à celui qui ne la respecte pas </strong>.");break;
    case FIN_NEUTRE: ouvrePopup(jeu,"Ici la Terre ! <br> Nous avons <strong>réussi à tenir jusque là</strong>, vous êtes un dur à cuire !! La population à tenu avec vous grâce à vos qualités en matière de survie dans des cas extrêmes ! En subissant ce confinement et ces conditions extrêmes, nous nous sommes battus fièrement et avons eu le temps de développer des<strong>  technologies nécessaires à la décroissance de nos émissions de CO2</strong> et des technologies<strong> d’agriculture, d’industrie et de récupération de l’eau </strong>extrêmement efficace grâce aux derniers scientifiques présents sur Terre. <br>C’est une<strong> faible victoire</strong> mais une lumière d’espoir dans notre monde devenu chaotique ! <br>Les niveaux de pollution atmosphérique sont toujours élevés, et les écosystèmes terrestres et marins<strong> mettront du temps avant de retrouver un équilibre viable </strong>avec les capacités de survies que nous avons déployées dans dizaines d’années passées. <br>L’Humanité va pouvoir se reconstruire au fil des siècles et prendre un nouveau départ grâce à vos connaissances solides. <strong>L’Histoire en retiendra le terrible châtiment que réserve la nature à celui qui ne la respecte pas </strong>.")
  }
}

async function incrementer(jeu) {
  console.log(jeu);
  jeu.compteur += jeu.increment*5/12;
  incrementerDate(jeu.date);
  if (jeu.question == null) {
    if (Math.random() < 0.1) {
      if (jeu.compteur >= 4) {
        question = await getQuestion(18+Math.round(Math.random() * 4));
        jeu.question = question;
      }
      else {
        question = await getQuestion(Math.round(Math.random() * 19));
        jeu.question = question;
      }
    }
  }
  ecrire(jeu);
  testFin(jeu);
  testPalier(jeu);
  if (jeu.fin < 0 && !jeu.pause) {
    setTimeout(incrementer,1000 /2,jeu);
  }
}
function testPalier(jeu) {
  if (Math.trunc(jeu.compteur)>Math.trunc(jeu.compteur - jeu.increment)) {
    switch (Math.trunc(jeu.compteur)) {
      case 1: ouvrePopup(jeu, "Ici la Terre, voici les données :  La situation se dégrade !! Alors que les niveaux de pollution atmosphérique, comprenant des particules fines et des gaz à effet de serre, augmentent, les répercussions se font sentir. La qualité de l'air se détériore, affectant la santé humaine de manière croissante tout en imposant des défis aux écosystèmes terrestres. Les personnes âgées dans notre entourage sont exténuées par les quintes de toux, le monde commence à se rendre compte de la situation, on compte sur vous pour nous tirer de cette affaire !!");break;
      case 2: ouvrePopup(jeu, "Ici la Terre au rapport ! Les nouvelles ne sont pas bonnes ! Avec l'augmentation drastique de la température moyenne sur Terre et de la quantité de CO2 dans l’air, On observe une augmentation des radiations solaires suite à l'altération de la couche d'ozone causée par les émissions de gaz destructeurs de l'ozone, exposant ainsi davantage la planète aux radiations solaires néfastes. Les radiations exposent les populations à de multiples cancers de la peau et le soleil à l’équateur et en Océanie pousse ses habitants à se réfugier. Les canicules seront brutales dans les années qui viennent ! Ne sortez pas trop au soleil mais surtout dépêchez-vous ! Notre temps sur Terre est compté !"); break;
      case 3: ouvrePopup(jeu, "ICI LA TERRE !! VITE !! Nous avons besoin de vous, la situation est critique !!! Les effets négatifs cumulatifs se multiplient, touchant les océans, les forêts, les écosystèmes, la qualité de l'air et les radiations. Certains changements deviennent irréversibles, menaçant la stabilité globale de la planète. L'urgence d'actions pour atténuer ces impacts devient impérative pour préserver notre environnement sont trop faibles !! Vous devez réagir il en va de la survie de toute l’espèce humaine ! Concentrez-vous !!!");break;
      case 4: ouvrePopup(jeu, "ICI LA T… AU SECOURS CA BRÛLE !!! La vie est irrespirable, la population s’affole, le monde sombre dans le désespoir ! Les industries sont laissées à l'abandon et les pertes liées aux maladies et aux pollutions sont de plus en plus nombreuses !!! À ce stade, les écosystèmes subissent un effondrement rapide des populations d'espèces en raison des changements climatiques rapides. La perte massive de biodiversité qui en résulte a des conséquences graves pour la stabilité des écosystèmes. En parallèle, la désertification gagne du terrain, transformant radicalement les paysages autrefois riches en diversité biologique. Ce monde est devenu un enfer !!! Même si on réussit à le sauver il ne restera qu’une société survivante apocalyptique dans un désert de pollution, je commence à perdre espoir, vous devez trouver les solutions où nous mourrons tous …");break;
      case 5: ouvrePopup(jeu, "<strong> AU SECOUUUUUURS !!!!! SAUVEZ-NOUUUUUS !!!!!</strong>"); break
    }
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
  console.log(textPopup.innerHTML)
  if(textPopup.innerHTML.substring(0,14) == 'Nous sommes en') {
    ouvrePopup(jeu, "Ici la Terre, voici les données : Pour l’instant la qualité de vie sur Terre est agréable, même si les océans subissent une légère augmentation de température, entraînant des perturbations dans les écosystèmes marins. Des phénomènes tels que le blanchissement corallien, bien que sporadiques, signalent des déséquilibres environnementaux préoccupants. Les habitants du monde entier restent sourds à nos messages d’alertes, vous êtes le seul à pouvoir nous conseiller.");
  }
  else if (jeu.fin >= 0) {

  }
  else {
    unpause(jeu);
  }
}

function unpause(jeu) {
  if (jeu.pause) {
    jeu.pause = false;
    incrementer(jeu);
  }
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