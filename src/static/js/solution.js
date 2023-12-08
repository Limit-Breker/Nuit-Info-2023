document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour récupérer les données JSON en fonction de l'ID
    function getJSONData(id) {
        // Remplacez l'URL avec le chemin correct de votre API
        fetch(`/api/solutions/${id}`)
            .then(response => response.json())
            .then(data => updateContent(data));
    }

    // Fonction pour mettre à jour le contenu en fonction des données JSON
    function updateContent(data) {
        const blockGreta = document.getElementById("block_greta");
        const description = document.createElement("p");
        description.textContent = data.description;
        blockGreta.innerHTML = ""; // Nettoie le contenu existant
        blockGreta.appendChild(description);
    }

    // Ajoutez des écouteurs d'événements pour chaque bouton
    const boutons = document.querySelectorAll(".bouton");
    boutons.forEach(function(bouton, index) {
        bouton.addEventListener("click", function() {
            getJSONData(index + 1); // Ajoutez 1 pour correspondre à l'ID du JSON
        });
    });
});
