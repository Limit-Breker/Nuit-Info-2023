const xhr = new XMLHttpRequest();


function showAnswer(index) {

    xhr.open("GET", `/api/truth-game/${index}`);
    xhr.send();
    xhr.responseType = "json";
    xhr.onload = () => {
        data = xhr.response;
    };
    champTexte=document.getElementById('block_greta');
    champTexte=data.response;

}