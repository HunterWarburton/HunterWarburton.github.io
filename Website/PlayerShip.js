
//const canvas = document.getElementById("myCanvas");
//const ctx = canvas.getContext("2d");
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
    ctx.drawImage(theShip, mouseX, mouseY);
}