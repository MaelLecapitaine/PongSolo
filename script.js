const balle = {
    x : 200,
    y : 200,
    rayon : 20,
};

const raquette = {
    x : 200,
    y : 580,
    taille : 100,
}

let sysdate = new Date();
let startTime = sysdate.getTime();
startButton = document.getElementById("StartButton")

startButton.addEventListener('click', function() {
    startTime = sysdate.getTime();
})

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function dessinerBalle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
    ctx.beginPath();
    ctx.arc(balle.x, balle.y, balle.rayon, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function dessinerRaquette(){
    ctx.beginPath();
    ctx.moveTo(raquette.x / 2, raquette.y);
    ctx.lineTo(raquette.x / 2 * 3, raquette.y);
    ctx.fillStyle = 'blue';
    ctx.lineWidth = 10,
    ctx.stroke();
    ctx.closePath();
}

function moveBall(){
    for(let i = 0; i <200; i++){
        balle.y-= 1;
        requestAnimationFrame(dessinerBalle(), 100);
    }
}

setTimeout(dessinerBalle(),10);
setTimeout(dessinerRaquette(), 10);