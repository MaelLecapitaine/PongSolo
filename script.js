const balle = {
    x : 200,
    y : 200,
    rayon : 20,
    speedx : 2,
    speedy : 2,
};

const raquette = {
    x : 250,
    y : 580,
    taille : 30,
};

let boucleJeu;

function afficheTemps(){
    let time = parseInt(document.getElementById("timer").textContent);
    time += 1;
    document.getElementById("timer").textContent = time;
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function dessinerBalle() {
    
    ctx.beginPath();
    ctx.arc(balle.x, balle.y, balle.rayon, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function dessinerRaquette(){
    
    ctx.beginPath();
    ctx.moveTo(raquette.x / 2, raquette.y);
    ctx.lineTo(raquette.x + raquette.taille, raquette.y);
    ctx.fillStyle = 'blue';
    ctx.lineWidth = 7,
    ctx.stroke();
    ctx.closePath();
}

function moveBall(){
    if(!collide()){
        let r = Math.random();
         balle.y += balle.speedy;
        balle.x += balle.speedx;
    }

    if(balle.y >= (canvas.height - balle.rayon) || balle.x == 0){
        balle.speedy = balle.speedy * -1;
        alert("Partie perdue, votre score :");
        location.reload();
    }
    if(balle.y <= 0 + balle.rayon || collide()){
        balle.speedy *= -1;
    }

    if(balle.x - balle.rayon == 0 || balle.x + balle.rayon == canvas.width){
        balle.speedx *= -1;
    }
}

function collide() {
    if(balle.y + balle.rayon - 2 >= raquette.y && balle.x + balle.rayon >= raquette.x && balle.x + balle.x <= raquette.x + raquette.taille){
        console.log("true");
    }
}

dessinerBalle();
dessinerRaquette();

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerBalle();
    dessinerRaquette();
    moveBall();
    collide();
    boucleJeu = requestAnimationFrame(loop);
}

startButton = document.getElementById("StartButton")

startButton.addEventListener('click', function() {
    if (boucleJeu) {
        cancelAnimationFrame(boucleJeu);
        boucleJeu = null;
    }

    balle.x = 200;
    balle.y = 200;
    balle.speedx = Math.random() < 0.5 ? 2 : -2;
    balle.speedy = Math.random() < 0.5 ? 2 : -2;
    document.getElementById("timer").textContent = "0";
    setTimeout(afficheTemps, 1);
    loop();
})

