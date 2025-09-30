const balle = {
    x : 200,
    y : 200,
    rayon : 20,
    speedx : 2,
    speedy : 2,
};

const raquette = {
    x : 150,
    y : 580,
    taille : 80,
};

let boucleJeu;

let Starttime = Date.now();

function afficheTemps(){
    // let time = parseInt(document.getElementById("timer").textContent);
    // time += 1;
    // document.getElementById("timer").textContent = time;

    
    document.getElementById("timer").textContent = Math.round((Date.now() - Starttime) / 1000);
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
    ctx.moveTo(raquette.x , raquette.y);
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
        alert("Partie perdue, votre score : " + document.getElementById("timer").textContent);
        location.reload();
    }
    if(balle.y <= balle.rayon || collide()){
        balle.speedy *= -1;
    }

    if(balle.x - balle.rayon == 0 || balle.x + balle.rayon == canvas.width){
        balle.speedx *= -1;
    }
}

function collide() {
    if(balle.y + balle.rayon >= raquette.y && balle.x >=
        raquette.x && balle.x <= raquette.x + raquette.taille){
        balle.speedx *= -1;
        if(balle.speedy >= 4){
            balle.speedy *= -0.7;
        }
        else{
            balle.speedy *= -1.2;
        }
        
    }

    if(balle.y >= raquette.y - 10){
        console.log('Y');
        if(balle.x >= raquette.x  ){
            console.log('X');
            console.log('balle :' + balle.x + 'raquette  :' + raquette.x)
        }
    }
        
}

const keys = {}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = true;
        e.preventDefault(); // empêche le défilement de la page
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        keys[e.key] = false;
    }
});

document.getElementById("rightButton").addEventListener('pointerdown', function() {
    keys['ArrowRight'] = true;
})

document.getElementById("rightButton").addEventListener('pointerup', function() {
    keys['ArrowRight'] = false;
})

document.getElementById("leftButton").addEventListener('pointerdown', function() {
    keys['ArrowLeft'] = true;
})

document.getElementById("leftButton").addEventListener('pointerup', function() {
    keys['ArrowLeft'] = false;
})

function bougerRaquette(){
    const vitesse = 5;
    if ((keys['ArrowLeft']) && raquette.x > 0 ) {
        raquette.x = raquette.x - vitesse;
    }
    if (keys['ArrowRight'] && raquette.x + raquette.taille < canvas.width) {
        raquette.x = raquette.x + vitesse;
    }
}


dessinerBalle();
dessinerRaquette();

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dessinerBalle();
    dessinerRaquette();
    bougerRaquette();
    moveBall();
    collide();
    afficheTemps()
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

