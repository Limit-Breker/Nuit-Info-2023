document.addEventListener('DOMContentLoaded', function () {
    if (document.body.classList.contains('accueil')) {
        console.log("efcyb");
        var monElement = document.querySelector('header');
        monElement.classList.add('animate');
    }
});