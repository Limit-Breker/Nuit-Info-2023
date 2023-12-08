const xhr = new XMLHttpRequest();
challengeCounter = 1
score = 0

function getCardData() {

    xhr.open("GET", `/api/truth-game/${challengeCounter}`);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        data = xhr.response;
        if (data.error !== undefined) {
            carteContenu.style.display = "none";
            questionSuivante.style.display = "none";
            let result = document.getElementById("resultat")
            result.innerHTML = "Votre score est de " + score + " / 10"
            return;
        }
        var titre = document.querySelector(".titre_carte h2");
        var description = document.querySelector(".description_carte p");
        titre.innerHTML = data.titre;
        description.innerHTML = data.description;

        var titre_explication = document.querySelector(".titre_carte_explication h2");
        var description_explication = document.querySelector(".description_carte_explication p");
        titre_explication.innerHTML = data.titre;
        description_explication.innerHTML = data.explication;
        initializeCard()
    };
}

function initializeCard() {
    carteContenu = document.getElementsByClassName("flip-card-inner")[0];
    carteContenu.classList.remove("rotate-card");
    carteContenu.style.backgroundColor = "rgba(217, 217, 217, 0.50)";

    questionSuivante = document.getElementsByClassName("bouton_question_suivante")[0];
    questionSuivante.style.display = "none";

    let current = document.getElementById("current_question")
    current.innerHTML = challengeCounter

    let scoreElement = document.getElementById("current_score")
    scoreElement.innerHTML = score

}

function nextCard() {
    challengeCounter++
    getCardData()
}


function flipProfile(buttonName) {
    console.log(buttonName)
    console.log(data)
    carteContenu.classList.add("rotate-card");
    if (buttonName == data.response) {
        carteContenu.style.backgroundColor = "rgba(82, 210, 79, 0.50)";
        score++;
    } else {
        carteContenu.style.backgroundColor = "rgba(181, 19, 19, 0.50)";
    }
    let text = ' <input class="bouton bouton_question_suivante" type="button" value=""/>'
    questionSuivante.style.display = "block";

}
