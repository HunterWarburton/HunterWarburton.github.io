var fireworkParticles = [];//holds the individual particles

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Set fullscreenish for the window
ctx.canvas.width  = window.innerWidth*0.75;
ctx.canvas.height = window.innerHeight*0.75;

//Make background
ctx.canvas.style.background = "#202090";
//Make a Black border
ctx.globalCompositeOperation = 'destination-over'
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

var gravity = 0.9;
var windResistance = 1;

var mouseX = 0;
var mouseY = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

//Get X and Y of mouse Pos
canvas.addEventListener("mousemove", function(e) { 
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    mouseX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    mouseY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
});

//Get when mouse is clicked
canvas.addEventListener('click', function() { 
    makeFirework();
    //console.log("made a firework");
}, false);


//Make firework
//Draw Firework
//Move Firework
//remove Firework

const particle = {
    speed : 30,
    speedX : 1,
    speedY : 1,
    direction : 0,
    size : 5,
    posX : 0,
    posY : 0,
    color : '#ffff60',
    lifespan : 60,
    maxY : canvas.height-50
};

function makeFirework () {
    let randomColor = false;
    let fireworkColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    if (getRandomInt(0,21) == 0) {
        randomColor = true;
    }
    for (let i = getRandomInt(100,401); i>0; i--) {
        let newParticle = Object.create(particle);
        newParticle.posX = mouseX;
        newParticle.posY = mouseY;
        newParticle.direction =  Math.abs((i) + getRandomInt(1,101)*.01);
        newParticle.speed = 22-((i*getRandomInt(10,35)*.01*.03)*5);
        newParticle.lifespan = 50+ getRandomInt(30,60);
        

        if (randomColor) {
            newParticle.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        } else {
            newParticle.color = fireworkColor;
        }

        particleSpeed (newParticle);
        fireworkParticles.unshift(newParticle);
        newParticle.maxY = canvas.height-50+(Math.random()*45);
    }
}
 //convert the speed and direction of the bullet to X and Y speeds
 function particleSpeed (disParticle) {
    disParticle.speedX = disParticle.speed*Math.sin(disParticle.direction)
    disParticle.speedY = disParticle.speed*Math.cos(disParticle.direction)
}

function drawFireworks(){
    fireworkParticles.forEach((particle) => {
        drawParticle(particle);
    });
}

function drawParticle(particleDis) {
    var X = particleDis.posX;
    var Y = particleDis.posY;
    var R = particleDis.size; /*size*/
    ctx.beginPath();
    ctx.arc(X, Y, Math.random()*R, 0, 2 * Math.PI, false);
    ctx.fillStyle = particleDis.color; /*color*/
    ctx.fill();
}

/*move the particles*/
function moveFireworks(){
    fireworkParticles.forEach((particle) => {
        
        if (particle.speed < 0) {
            particle.speed += Math.min(windResistance, Math.abs(particle.speed));
        } else if (particle.speed >0) {
            particle.speed -= Math.min(windResistance, Math.abs(particle.speed));
        }
        particleSpeed(particle);
        if (particle.posY < particle.maxY) {
            particle.posY +=  particle.speedY+gravity;
        }
        particle.posX +=  particle.speedX;
        
        
        //check and erase a star if its too low
        if (particle.posY > canvas.height+5) {
            particle.lifespan = 0;
        }

        particleHitEdge(particle);

        particle.lifespan--;
    });
}

function particleHitEdge(particle){
    
    if (particle.posX > canvas.width-5 ||
        particle.posX < 5 ||
        particle.posY < 5 ||
        particle.posY > canvas.height-50) {
            
        particle.direction = findNewCoordinate(particle,particle.direction);
    }
}

function removeParticles () {
    fireworkParticles.forEach((particle) => {
        if (particle.lifespan < 1) {
        fireworkParticles.splice(fireworkParticles.indexOf(particle), 1);
        //console.log ("erased a star");
        }
    });
}


function gameTick () {
    //Clear Drawings of old stuff
    ctx.clearRect(2.5, 2.5, canvas.width-5, canvas.height-5);

    drawFireworks();
    moveFireworks();
    removeParticles();
    drawStar();

    //draw ground
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height-50, canvas.width, canvas.height);
} setInterval(gameTick, 30);


/*define a STAR object*/
const star = {
    posX : 0,
    posY : 0,
    size : 1,
    color : '#ffffff'
};
var starfieldArray = [];

function drawStar() {
    starfieldArray.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.posX, star.posY, star.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = star.color; /*color*/
    ctx.fill();
    });
}

/*Spawn stars on top of screen*/
function spawnStars () {
    for (i=50; i>0;i--) {
    let babyStar = Object.create(star);
    babyStar.posX = Math.floor(Math.random()*canvas.width);/*random spot width*/
    babyStar.posY = Math.floor(Math.random()*(canvas.height/3));/*slightly above height display*/
    babyStar.size = Math.random()*4;

    starfieldArray.push(babyStar);/*put the star in the starfield array*/
}
}
//run this once
spawnStars();




var width = canvas.width;
var height = canvas.height;
var extra = 0;
var a;
var b;
var x;
var y;
var angle;
var n;
var m;
var quadrant;
var horizontal;
var vertical;
var alpha;
var side;
var topbottom;
var sides;
var i = 1;

function findNewCoordinate(particle, angle) {
    if (angle >= 0 && angle < 90) { quadrant = 1; horizontal = width-particle.posX; vertical = particle.posY; alpha = (90 - angle); }
    else if (angle >= 90 && angle < 180) { quadrant = 4; horizontal = width-particle.posX; vertical = height-particle.posY; alpha = (angle-90);  }
    else if (angle >= 180 && angle < 270) { quadrant = 3; horizontal = particle.posX; vertical = height-particle.posY; alpha = (270-angle);  }
    else if (angle >= 270 && angle <= 360) { quadrant = 2; horizontal = particle.posX; vertical = particle.posY; alpha = (angle-270);  }


       var cosa = Math.cos(alpha * Math.PI / 180);
       var sina = Math.sin(alpha * Math.PI / 180);

       n = horizontal/cosa;
       m = vertical/sina;

    switch (quadrant)
    {
        case 1:  
            if (m >= n) //hit at side
            {
                             
                angle = 180+alpha;
                //particle.posY = 10;  
            } else
            {
                
                //particle.posX = canvas.width-5;
                angle = 270-angle;
 
            } 
            side = "right side"; topbottom = "top";
            break;


        case 2:
            if (m >= n)  //hit at side
            {
                angle = 270-alpha;
                //particle.posY = 10;             
                       
            } else
            {
                angle = 90-alpha;
                //particle.posX = 10; 
                     
            } 
            side = "left side"; topbottom = "top";
            break;
        case 3: side = "left side"; topbottom = "bottom";
            if (m >= n)  //hit at side
            {
                angle = 270+alpha;   
                //console.log("left bottom");
                //particle.posY = 10; 
            } else
            {
                angle = 90+alpha;
                //particle.posX = 10; 
                    
            } break;
        case 4: side = "right side"; topbottom = "bottom";
            if (m >= n)  //hit at side
            {
                angle = 90-alpha;        
                //particle.posY = 10; 
            } else
            {
                angle = 270-alpha;
                //particle.posX = canvas.width-10; 
                    
            } break;
    }

    return angle;
}