var selectedReponse = null;
var connectButton = document.getElementById('confirmButton');

document.addEventListener("DOMContentLoaded", function () {
    var reponseBoxes = document.querySelectorAll('.reponse-box');

    reponseBoxes.forEach(function (reponseBox) {
        reponseBox.addEventListener('click', function () {
            toggleReponse(this);
        });
    });
});

function toggleReponse(reponse) {
    if (selectedReponse === reponse) {
        deselectReponse();
    } else {
        selectReponse(reponse);
    }
}

function selectReponse(reponse) {
    deselectReponse();
    reponse.classList.add("selected");
    selectedReponse = reponse;
    showConfirmButton('Confirmer');
}

function deselectReponse() {
    if (selectedReponse) {
        selectedReponse.classList.remove("selected");
        selectedReponse = null;
        hideConfirmButton();
    }
}

function showConfirmButton(message) {
    var confirmButton = document.getElementById('confirmButton');
    confirmButton.innerHTML = message;
    confirmButton.style.display = 'block';
}

function hideConfirmButton() {
    var confirmButton = document.getElementById('confirmButton');
    confirmButton.style.display = 'none';
}
