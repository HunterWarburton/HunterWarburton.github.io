//POWERUP SECTION
//Make a powerup that reduces gun cooldown
let powerupArray = [];
const powerupCoinImage = document.getElementById('powerupCoin');
/*define an powerup object*/
const powerup = {
    speed : 2,
    posX : 0,
    posY : 0,
    width : 36,
    height : 40,
    image : powerupCoinImage,
    sheetWidth : 36,//size of individual frame
    sheetHeight : 40,
    sheetFrameTotal : 5,//total number of frames (start at 0)
    currentSheetFrame : 0,//var for which frame is displayed
    frameCountDelay : 0//delay between changing frames
};

function spawnPowerup () {
    let babyPowerup = Object.create(powerup);
    babyPowerup.posX = Math.floor(Math.random()*canvas.width);/*random spot width*/
    babyPowerup.posY = Math.floor(Math.random()*(-canvas.height/4));/*slightly above height display*/
    
    powerupArray.push(babyPowerup);
}

function drawPowerup (){
    powerupArray.forEach ((powerup) => {
        sheetStepPowerup(powerup);
    });
}

//SpriteSheet drawer
function drawPowerupSheet(powerup) {
    let xFrame = powerup.currentSheetFrame;
    let yFrame = 0;
    ctx.drawImage(powerup.image,
        xFrame * powerup.sheetWidth,//Sheet X position
        yFrame * powerup.sheetHeight,//sheet Y position
        powerup.sheetWidth, powerup.sheetHeight,//Sheet size of frame
        powerup.posX-(powerup.width/2), powerup.posY-(powerup.height/2),//canvas position
        powerup.width, powerup.height);//render size of bullet
}

function sheetStepPowerup(powerup) {
    drawPowerupSheet(powerup);
  
    powerup.frameCountDelay++;
    if (powerup.frameCountDelay >= 3) {
        powerup.frameCountDelay = 0;
        //advance this things frame for next draw
        powerup.currentSheetFrame++;
        
        //if we moved past the last frame count, reset it
        if (powerup.currentSheetFrame > powerup.sheetFrameTotal) {
            powerup.currentSheetFrame = 0;
        }
    }
}


function movePowerup(){
    powerupArray.forEach((powerup) => {
        powerup.posY += powerup.speed;
        //check and erase bullet if off any of 4 sides
        if (powerup.posY > canvas.height+5 || powerup.posY < -canvas.height/4){
            powerupArray.splice(powerupArray.indexOf(powerup), 1);
            //console.log ("erased a powerup offscreen");
        }
        powerupCollision(powerup);
    });
}

//COLLISION SECTION
function powerupCollision(powerup) {
    if (powerup.posX > mouseX-10 && powerup.posX < mouseX+10
        && powerup.posY > mouseY-10 && powerup.posY < mouseY+10) {
            //collision has occured
            powerupArray.splice(powerupArray.indexOf(powerup), 1);//erase that powerup
            myScore++;
            updateScore();
            changePlayerWeapon();
        }
    
    }

    
function changePlayerWeapon(){
    switch (getRandomInt(0,5)) {
        case 1:
            playerWeapon = 'gatling';
        break;
        case 2:
            playerWeapon = 'spread';
        break;
        case 3:
            playerWeapon = 'plasma';
        break;
        case 4:
            playerWeapon = 'laser';
        break;
        case 5:
            playerWeapon = 'rocket';
        break;
        case 1:
            playerWeapon = 'flames';
        break;
    }
    uiPlayerWeapon()
}
