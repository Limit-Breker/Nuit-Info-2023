const xhr = new XMLHttpRequest();

function getCardData(id){
    
    xhr.open("GET", `/api/truth-game/${id}`);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        data = xhr.response;
        var titre=document.querySelector(".titre_carte h2");
        var description=document.querySelector(".description_carte p");
        titre.innerHTML=data.titre;
        description.innerHTML=data.description;
    
        var titre_explication=document.querySelector(".titre_carte_explication h2");
        var description_explication=document.querySelector(".description_carte_explication p");
        titre_explication.innerHTML=data.titre;
        description_explication.innerHTML = data.explication;
        initializeCard()
    };
}

function initializeCard(){
    carteContenu = document.getElementsByClassName("flip-card-inner")[0];
    carteContenu.classList.remove("rotate-card")
}

function flipProfile(buttonName) {
    console.log(buttonName)
    console.log(data)
    let card = document.getElementsByClassName("flip-card")[0];
    carteContenu.classList.add("rotate-card");
    if (buttonName==data.response){
        carteContenu.style.backgroundColor="rgba(82, 210, 79, 0.50)";
    }else{
        carteContenu.style.backgroundColor="rgba(181, 19, 19, 0.50)";
    }
    let text = ' <input class="bouton bouton_question_suivante" type="button" value=""/>'
    let bouton = document.createElement('input');
   
    console.dir(card);
}
