const xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
xhr.send();
xhr.responseType = "json";
xhr.onload = () => {
    const data = xhr.response;
    //console.log(data);
    console.log(data[0].name);
    var titre=document.querySelector(".titre_carte");
    var description=document.querySelector(".description_carte");
    titre.innerHTML=data.name;

};
function flipProfile(profile) {
    let flippedProfiles = [];
    if (!profile.classList.contains('flipped')) {
        profile.classList.add('flip', 'flipped');
        if (!flippedProfiles.includes(profile)) {
            flippedProfiles.push(profile);
        }
    }
}
