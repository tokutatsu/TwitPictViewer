const submit = document.getElementById('submit');
let blind = document.getElementById('blind');
let background = document.createElement('div');

background.style.zIndex = '800';
background.style.position = 'absolute';
background.style.top = '0px';
background.style.left = '0px';
background.style.right = '0px';
background.style.bottom = '0px';
background.style.backgroundColor = 'black';
background.style.opacity = '0.8';

submit.addEventListener('click', () => {
    blind.style.visibility = 'visible';
    document.body.appendChild(background);
});