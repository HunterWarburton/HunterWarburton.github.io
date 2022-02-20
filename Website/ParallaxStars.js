var starNum = 1;
let starField = [];
let starfieldArray = [starField, starField, starField, starField];
var spawnTimer0 = 0;
var spawnTimer1 = 0;
var spawnTimer2 = 0;
var spawnTimer3 = 0;
var myScore = 0;
var laserTimer = 60;
var laserTimerResetti = 60;
var gunTimer = 20;
var gunTimerResetti = 20;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Set fullscreenish for the window
ctx.canvas.width  = window.innerWidth*0.75;
ctx.canvas.height = window.innerHeight*0.75;

//Make background
ctx.canvas.style.background = "#252555";
//Make a Black border
ctx.globalCompositeOperation = 'destination-over'
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
//canvas{ border: 1px solid black; }

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;




/*define a STAR object*/
const star = {
    speed : 1,
    size : 5,
    posX : 0,
    posY : 0,
    color : '#000000'
};

/*
Parallax starfield
three fields of stars that scroll
from the top of the screen to the bottom
further back fields are smaller stars and move slower
when stars reach bottom of screen they dissappear
*/

function drawStar(starDis) {
    var X = starDis.posX;
    var Y = starDis.posY;
    var R = starDis.size; /*size*/
    ctx.beginPath();
    ctx.arc(X, Y, R, 0, 2 * Math.PI, false);
    ctx.lineWidth = 3;
    ctx.fillStyle = starDis.color; /*color*/
    ctx.fill();
}



/*Spawn stars on top of screen*/
function spawnStars (field) {
    let babyStar = Object.create(star);
    babyStar.posX = Math.floor(Math.random()*canvas.width);/*random spot width*/
    babyStar.posY = Math.floor(Math.random()*(-canvas.height/4));/*slightly above height display*/
    
    //set star size
    //HOW FAST DO THEY MOVE
    switch (field) {
        case 0:
            babyStar.speed = 4;
            babyStar.size = 4;
            babyStar.color = '#a0a0ff';
            break;
        case 1:
            babyStar.speed = 2;
            babyStar.size = 2.5;
            babyStar.color = '#50aaff';
            break;
        case 2:
            babyStar.speed = 0.5;
            babyStar.size = 1.5;
            babyStar.color = '#00aaff';
            break;
        case 3:
            babyStar.speed = 0.25;
            babyStar.size = 0.5;
            babyStar.color = '#00aaaa';
            break;
    } 
    starfieldArray[field].push(babyStar);/*put the star in the starfield array*/
}

/*move the stars down*/
function moveStar(muhStarField){
    muhStarField.forEach((star) => {
        star.posY +=  star.speed;
        //check and erase a star if its too low
        if (star.posY > canvas.height+5) {
            muhStarField.splice(muhStarField.indexOf(star), 1);
            //console.log ("erased a star");
        }
    });
}

/*MAIN GAME TICK*/
function gameTick () {
    //Clear Drawings of old stuff
    ctx.clearRect(2.5, 2.5, canvas.width-5, canvas.height-5);

        /*MOVEMENT OF THINGS*/
    //Move the stars positions
    starfieldArray.forEach(starField => {
        moveStar(starField);
    });
    
    moveBaddies();
    moveBullets();
    moveLaser();
    moveGun();
    movePowerup();

/*DRAW THINGS*/
    drawPowerup();
    drawBullet();
    drawShip();
    drawLaser();
    drawGun();
    drawBaddies();

    //Draw the Stars
    starfieldArray.forEach((starField) => {
        starField.forEach((star) => {
            drawStar(star);
        });
    });
    

//Only spawn baddie sometimes not every frame
var baddie = getRandomInt(0,11);
        if (baddie == 10) {
    spawnEnemy();
        }
        //Spawn powerup
var power = getRandomInt(0,100);
        if (baddie == 0) {
    spawnPowerup();
        }

        //Shoot every second
        //Countdown to 0
        if (laserTimer < 0) {
            spawnLaser();
            laserTimer = laserTimerResetti;
        } else {laserTimer--;}

        if (gunTimer < 0) {
            spawnGun();
            gunTimer = gunTimerResetti;
        } else {gunTimer--;}

    /*spawn a new star sometimes*/
    //HOW MANY TO SPAWN
    if (spawnTimer0 > 6) {
        spawnStars(0);
        spawnTimer0 = 0;
    } else {spawnTimer0++;}

    if (spawnTimer1 > 5) {
        spawnStars(1);
        spawnTimer1 = 0;
    } else {spawnTimer1++;}

    if (spawnTimer2 > 7) {
        spawnStars(2);
        spawnTimer2 = 0;
    } else {spawnTimer2++;}

    if (spawnTimer3 > 5) {
        spawnStars(3);
        spawnTimer3 = 0;
    } else {spawnTimer3++;}




}
setInterval(gameTick, 30);


/*PLAYER SHIP AREA*/
const theShip = document.getElementById('ship');

var mouseX = 0;
var mouseY = 0;

//Get X and Y of mouse Pos
canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    mouseX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    mouseY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
});

function drawShip () {
    ctx.drawImage(theShip, mouseX-25, mouseY-25, 50, 50);
}
/*END PLAYER SHIP AREA*/
/*BEGIN PLAYER BULLET AREA*/
let laser = {
    posX : 0,
    posY : 0,
    speed : 4
}
var laserArray = [];

function spawnLaser(){
    let babyLaser = Object.create(laser);//Make a brand new bullet
    babyLaser.posX=mouseX-15;
    babyLaser.posY=mouseY;

    let babyLaser2 = Object.create(laser);//Make a brand new bullet
    babyLaser2.posX=mouseX+15;
    babyLaser2.posY=mouseY;

    laserArray.push(babyLaser);
    laserArray.push(babyLaser2);


    //console.log("spawned a laser");
}

function moveLaser(){
    laserArray.forEach((laser) => {
        laser.posY -= laser.speed;
        //check and erase bullet if off any of 4 sides
        if (laser.posY > canvas.height+5 || laser.posY < -5){
            laserArray.splice(laserArray.indexOf(laser), 1);
            console.log ("erased a laser  offscreen");
        }
        laserCollision(laser);
    });
}

function drawLaser(){
    //console.log("laser move"); success
    laserArray.forEach((laser) => {
        ctx.beginPath();
        ctx.arc(laser.posX, laser.posY, 6, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4;
        ctx.fillStyle = '#00ff00'; /*color*/
        ctx.fill();
    });
}


let gun = {
    posX : 0,
    posY : 0,
    speed : 4
}
var gunArray = [];

function spawnGun(){
    let babyGun = Object.create(gun);//Make a brand new bullet
    babyGun.posX=mouseX;
    babyGun.posY=mouseY;

    gunArray.push(babyGun);
    //console.log("spawned a gun bullet for the player");
}

function moveGun(){
    gunArray.forEach((gun) => {
        gun.posY -= gun.speed;
        //check and erase bullet if off any of 4 sides
        if (gun.posY > canvas.height+5 || gun.posY < -5){
            gunArray.splice(gunArray.indexOf(gun), 1);
            console.log ("erased a gun  offscreen");
        }
        gunCollision(gun);
    });
}

function drawGun(){
    //console.log("gun move"); success
    gunArray.forEach((gun) => {
        ctx.beginPath();
        ctx.arc(gun.posX, gun.posY, 5, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4;
        ctx.fillStyle = '#50aa50'; /*color*/
        ctx.fill();
    });
}

/*COLLISION SECTION*/
function bulletCollision(bullet) {
if (bullet.posX > mouseX-10 && bullet.posX < mouseX+10
    && bullet.posY > mouseY-10 && bullet.posY < mouseY+10) {
        //collision has occured
        baddieBulletArray.splice(baddieBulletArray.indexOf(bullet), 1);//erase that bullet
        myScore--;
        updateScore();
    }

}

function laserCollision(laser) {
    enemyArray.forEach((enemy) => {
        if (laser.posX > enemy.posX-12 && laser.posX < enemy.posX+12
        && laser.posY > enemy.posY-10 && laser.posY < enemy.posY+10) {
            //collision has occured
            enemyArray.splice(enemyArray.indexOf(enemy), 1);//erase that enemy
            laserArray.splice(laserArray.indexOf(laser), 1);//erase this laser
            myScore++;
            updateScore();
            //console.log("erased a laser for collision");
        }
    });
}

function gunCollision(gun) {
    enemyArray.forEach((enemy) => {
        if (gun.posX > enemy.posX-12 && gun.posX < enemy.posX+12
        && gun.posY > enemy.posY-10 && gun.posY < enemy.posY+10) {
            //collision has occured
            enemyArray.splice(enemyArray.indexOf(enemy), 1);//erase that enemy
            gunArray.splice(gunArray.indexOf(gun), 1);//erase this laser
            myScore++;
            updateScore();
            //console.log("erased a gun for collision");
        }
    });
}

function powerupCollision(powerup) {
    if (powerup.posX > mouseX-10 && powerup.posX < mouseX+10
        && powerup.posY > mouseY-10 && powerup.posY < mouseY+10) {
            //collision has occured
            powerupArray.splice(powerupArray.indexOf(powerup), 1);//erase that powerup
            myScore++;
            updateScore();
            if (laserTimerResetti > 10) {
                laserTimerResetti -= 5;
            }
            
        }
    
    }


//BADDIES
let enemyArray = [];
/*define an enemy object*/
const enemy = {
    speedSideways : 0.5,
    speedDownwards : 2,
    size : 5,
    posX : 0,
    posY : 0,
    color : '#000000'
};

function spawnEnemy () {
    let babyEnemy = Object.create(enemy);
    babyEnemy.posX = Math.floor(Math.random()*canvas.width);/*random spot width*/
    babyEnemy.posY = Math.floor(Math.random()*(-canvas.height/4));/*slightly above height display*/
    
    //This Enemy Stats
        babyEnemy.speedSideways = Math.random()*5+1;
        babyEnemy.speedDownwards = Math.random()*10;
        //babyEnemy.size = 6;
        babyEnemy.color = '#ff0050';

    enemyArray.push(babyEnemy);
}

function drawBaddies(){

        enemyArray.forEach((enemy) => {
            ctx.beginPath();
            ctx.arc(enemy.posX, enemy.posY, enemy.size, 0, 2 * Math.PI, false);
            ctx.lineWidth = 3;
            ctx.strokeStyle = enemy.color; /*color*/
            ctx.stroke();
        });

   

}



function moveBaddies(){

    enemyArray.forEach((enemy) => {
        //shoot area
        //each enemy shoots if random number
        var shootie = getRandomInt(0,101);
        if (shootie == 100) {
            spawnBullet(enemy);
        } 

        if (enemy.posX > mouseX+12){
            enemy.posX -= enemy.speedSideways;
        } else if (enemy.posX < mouseX-12) {
            enemy.posX += enemy.speedSideways;
        }
        
        enemy.posY +=  enemy.speedDownwards;
        //check and erase an enemy if its too low
        if (enemy.posY > canvas.height+5) {
            enemyArray.splice(enemyArray.indexOf(enemy), 1);
            //console.log ("erased an enemy from too low");
        }

    });

}


//RANDOM FUNCTION SPOT
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
const score = document.getElementById("score");
function updateScore() {
    score.textContent = 'Score: ' + myScore;
}




/*BADDIE BULLET ZONE*/
let bullet = {
    posX : 0,
    posY : 0,
    speedX : 0,
    speedY : 0
}
var baddieBulletArray = [];

//gotta define a vector now, sheesh
let Vector = {
     x:0,
    y:0
    } 

function spawnBullet(enemy){
    let babyBullet = Object.create(bullet);//Make a brand new bullet
    babyBullet.posX=enemy.posX;
    babyBullet.posY=enemy.posY;
//get a vector from the bullet to the playerShip
var bulletVector = Vector;
    bulletVector.X = mouseX-babyBullet.posX;
    bulletVector.Y = mouseY-babyBullet.posY;
//normalize it

var length = Math.sqrt(bulletVector.X*bulletVector.X+bulletVector.Y*bulletVector.Y); //calculating length
bulletVector.X = bulletVector.X/length; //assigning new value to x (dividing x by length of the vector)
bulletVector.Y = bulletVector.Y/length; //assigning new value to y

babyBullet.speedX = bulletVector.X*10;
babyBullet.speedY = bulletVector.Y*10;

    baddieBulletArray.push(babyBullet);
}

function moveBullets(){
    baddieBulletArray.forEach((bullet) => {
        bullet.posX += bullet.speedX;
        bullet.posY += bullet.speedY;
        //check and erase bullet if off any of 4 sides
        if (bullet.posY > canvas.height+5 || bullet.posY < -5 || bullet.posX > canvas.width+5 || bullet.posX < -5) {
            baddieBulletArray.splice(baddieBulletArray.indexOf(bullet), 1);
            //console.log ("erased a bullet offscreen");
        }
        bulletCollision(bullet);
    });
}

function drawBullet(){
    baddieBulletArray.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.posX, bullet.posY, 4, 0, 2 * Math.PI, false);
        ctx.lineWidth = 4;
        ctx.fillStyle = '#ffff00'; /*color*/
        ctx.fill();
    });
}



//POWERUP SECTION
//Make a powerup that reduces gun cooldown
let powerupArray = [];
/*define an powerup object*/
const powerup = {
    speed : 2,
    posX : 0,
    posY : 0,
};

function spawnPowerup () {
    let babyPowerup = Object.create(powerup);
    babyPowerup.posX = Math.floor(Math.random()*canvas.width);/*random spot width*/
    babyPowerup.posY = Math.floor(Math.random()*(-canvas.height/4));/*slightly above height display*/
    
    powerupArray.push(babyPowerup);
}

function drawPowerup(){
    powerupArray.forEach((powerup) => {
        ctx.beginPath();
        ctx.arc(powerup.posX, powerup.posY, 8, 0, 2 * Math.PI, false);
        //ctx.lineWidth = 4;
        ctx.fillStyle = '#bbbbff'; /*color*/
        ctx.fill();
        ctx.beginPath();
        ctx.arc(powerup.posX, powerup.posY, 8, 0, 2 * Math.PI, false);
        ctx.lineWidth = 6;
        ctx.strokeStyle = '#ffffff'; /*color*/
        ctx.stroke();
    });
}

function movePowerup(){
    powerupArray.forEach((powerup) => {
        powerup.posY += powerup.speed;
        //check and erase bullet if off any of 4 sides
        if (powerup.posY > canvas.height+5 || powerup.posY < -5){
            powerupArray.splice(powerupArray.indexOf(powerup), 1);
            console.log ("erased a powerup offscreen");
        }
        powerupCollision(powerup);
    });
}