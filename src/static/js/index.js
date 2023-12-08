const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
let light;

console.log(image2);
image2.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

image1.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.documentElement.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--x', e.clientX + 'px')
    document.documentElement.style.setProperty('--y', e.clientY + 'px')
})

image1.addEventListener('drop', (e) => {
    e.preventDefault();

    const rect = image2.getBoundingClientRect();

    if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
    ) {
        document.body.classList.add('dropped');
        createLight(e.clientX, e.clientY);
        //TODO theme sombre
    } else {
        document.body.classList.remove('dropped');
        removeLight();
    }
});

image1.addEventListener('drag', (e) => {
    image1.style.position = 'fixed';
    image1.style.left = e.clientX - image1.width / 2 + 'px';
    image1.style.top = e.clientY - image1.height / 2 + 'px';
});

function handleMouseMove(e) {
    if (light) {
        updateLightPosition(e.clientX, e.clientY);
    }
}

function createLight(x, y) {
    light = document.createElement('div');
    light.classList.add('light');
    document.body.appendChild(light);
}

function removeLight() {
    if (light) {
        light.remove();
        light = null;
    }
}