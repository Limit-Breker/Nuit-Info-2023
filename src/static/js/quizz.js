var quizzTitre = ["Transports", "Énergie", "Alimentation", "Océan", "Faune & flore", "Santé", "Pollution", "Température", "Couche d'ozone", "Social"]
var quizzQuestion = [
    "Lequel de ces transports produit le plus de CO2 par individu ?",
    "Quelle source d'énergie contribue le plus à atténuer le changement climatique ?",
    "Quel type de produits alimentaires est le plus polluant ?",
    "Le niveau moyen de la mer a augmenté de combien de cm ?",
    "Combien d'espèces de plantes et d’animaux sont menacées d’extinction à cause du changement climatique ?",
    "Quelle est le pourcentage de la population qui connaît une grave pénurie d’eau pendant au moins un mois par an.",
    "La Chine pollue plus que les États-Unis par habitant.",
    "La température moyenne mondiale a augmenté de combien de °C.",
    "Existe-t-il différents gaz à effet de serre autre que le carbone (CO2) ?",
    "Les décès liés à la chaleur chez les personnes de plus de 65 ans ont augmenté de combien de pourcentage en deux décennies ?"
]
var quizzSolutions = [
    ["avions", "voitures", "vélos", "la marche"],
    ["solaire", "charbon", "éolien", "nucléaire"],
    ["animalier", "plante", "marin", "humaine ;}"],
    ["10cm", "15cm", "20cm", "25cm"],
    ["1 000 000", "1 500 000", "2 000 000", "2 500 000"],
    ["48%", "50%", "53%", "55%"],
    ["vrai", "faux", "la France pollue le plus", "l'Inde pollue le plus"],
    ["0.8°C", "0.9°C", "1°C", "1.1°C"],
    ["oui", "non", "le réchaufement climatique n'existe pas", "peut-être"],
    ["50%", "60%", "70%", "80%"]
]
var quizzReponse = ["rep2", "rep1", "rep1", "rep3", "rep1", "rep2", "rep2", "rep4", "rep1", "rep3"]
var quizzExpliquation = [
    "Si un individu prend la voiture seul, il produit plus de CO2 que s’il prend l’avion, c’est pour cela qu’il est recommandé de faire du covoiturage.",
    "Bien que le nucléaire est une énergie propre, elle n'atténue pas le changement climatique le plus efficacement, calculer en gigatonne de co2 l'énergie solaire contribue 4.5 Gt co2, l’éolien 3.85 Gt co2 alors que le nucléaire 0.88 Gt co2, avec l’avantage d'être moins cher pour le solaire et l’éolien.",
    "Les produits d'origine animale comme la viande, mais aussi le lait, le fromage ou les œufs sont souvent considérés comme étant les plus polluants. Ceux pour plusieurs raisons : surexploitation des ressources naturelles (beaucoup d'eau, de terres cultivables, d'engrais et de combustibles fossiles).",
    "Une aussi grosse augmentation du niveau de la mer est dangereuse car elle présente un risque d’inondations et de tsunami sur les côtes, le risque est encore plus important sur les îles.",
    "1 million d’espèces de plantes et d’animaux sont aujourd’hui menacées d’extinction à cause du changement climatique et des autres pressions exercées par l’homme (déforestation, artificialisation des sols, surexploitation des espèces, pollution…)",
    "Aujourd’hui près de 50% de la population mondiale connaît une grave pénurie d’eau pendant au moins un mois par an, ce qui intensifie les risques sanitaires.",
    "Les États-Unis polluent 13.7 tonnes de CO2 par habitant alors que la Chine pollue 8.3 tonnes de CO2 par habitant.\nLa France pollue 4.2 tonnes de CO2 par habitant.\nL'In pollue 1.9 tonnes de CO2 par habitant.",
    "La température moyenne mondiale a augmenté de 1.1°C.",
    "Il existe plusieurs gaz à effet de serre, les plus connus et les plus impactant sont le carbone, méthane, protoxyde d’azote et les gaz fluorés.",
    "C'est triste."
]

var currentQuizz = 0

function deselectAll(){
    var rep1 = document.getElementById("rep1")
    var rep2 = document.getElementById("rep2")
    var rep3 = document.getElementById("rep3")
    var rep4 = document.getElementById("rep4")

    rep1.classList.remove("selected")
    rep1.classList.remove("falseSelected")

    rep2.classList.remove("selected")
    rep2.classList.remove("falseSelected")

    rep3.classList.remove("selected")
    rep3.classList.remove("falseSelected")

    rep4.classList.remove("selected")
    rep4.classList.remove("falseSelected")

    hideConfirmButton()
}

function reponseClick(num){
    document.getElementById(quizzReponse[currentQuizz-1]).classList.add("selected")
    if (quizzReponse[currentQuizz-1] != num){
        document.getElementById(num).classList.add("falseSelected")
    }

    showConfirmButton()
}

function showConfirmButton(){
    document.getElementById("confirmButton").style.display = "block"
}

function hideConfirmButton(){
    document.getElementById("confirmButton").style.display = "none"
}

function setExpl(){
    hideConfirmButton()

    document.getElementsByClassName("reponse")[0].style.display = "none"
    document.getElementById("question").innerHTML = ("<p>" + quizzExpliquation[currentQuizz-1] + "</p>")
    document.getElementById("confirmExplButton").style.display = "block"
}

function setQuizz(){
    deselectAll()

    document.getElementsByClassName("reponse")[0].style.display = "flex"
    document.getElementById("confirmExplButton").style.display = "none"

    document.getElementById("question").innerHTML = ("<p>" + quizzQuestion[currentQuizz] + "</p>")
    document.getElementById("rep1").innerHTML = ("<button onclick=\"reponseClick('rep1')\">" + quizzSolutions[currentQuizz][0] + "</button>")
    document.getElementById("rep2").innerHTML = ("<button onclick=\"reponseClick('rep2')\">" + quizzSolutions[currentQuizz][1] + "</button>")
    document.getElementById("rep3").innerHTML = ("<button onclick=\"reponseClick('rep3')\">" + quizzSolutions[currentQuizz][2] + "</button>")
    document.getElementById("rep4").innerHTML = ("<button onclick=\"reponseClick('rep4')\">" + quizzSolutions[currentQuizz][3] + "</button>")

    currentQuizz = currentQuizz + 1
}

function checkend(){
    if (currentQuizz >= 10){
        alert("fin du quizz")
    }
}

setQuizz()