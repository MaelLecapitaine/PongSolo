const balle = {
    x : 200,
    y : 200,
    rayon : 20,
};

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

dessinerBalle();


for(let j = 100; j > 0; j--){
    balle.y -= 1;
    setTimeout(dessinerBalle(),1000);
}