const xhr = new XMLHttpRequest();


function showAnswer(index) {

    xhr.open("GET", `/api/solution/${index}`);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        data = xhr.response;
        console.log(data)
        champTexte=document.getElementById('block_greta');
        champTexte.innerHTML=data.reponse;
    };
    

}