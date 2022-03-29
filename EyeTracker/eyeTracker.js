//const theContainer = document.getElementsByClassName('.ufo');
const eyeball = document.getElementsByClassName('eyes');

document.addEventListener('mousemove', e=> {
  const x_cursor = e.pageX;
  const y_cursor = e.pageY;
console.log(eyeball[0]);
  for (let i = 0; i < eyeball.length; i++) {
    
    const rect = eyeball[i].getBoundingClientRect();
    const x_eyeball = rect.left + (rect.width / 2);
    const y_eyeball = rect.top + (rect.height / 2);
    const angle = -Math.atan2(x_cursor - x_eyeball, y_cursor - y_eyeball) * (180 / Math.PI) - 180;
    
    eyeball[i].style.transform = `rotate(${angle}deg)`;
  }

});



//MOVEMENT CODE
/*

function RandomObjectMover(obj, container) {
	this.$object = obj;
  this.$container = container;
  this.container_is_window = container === window;
  this.pixels_per_second = 50;
  this.current_position = { x: 0, y: 0 };
  this.is_running = false;
}

// Set the speed of movement in Pixels per Second.
RandomObjectMover.prototype.setSpeed = function(pxPerSec) {
	this.pixels_per_second = pxPerSec;
}

RandomObjectMover.prototype._getContainerDimensions = function() {
   if (this.$container === window) {
       return { 'height' : this.$container.innerHeight, 'width' : this.$container.innerWidth };
   } else {
   	   return { 'height' : this.$container.clientHeight, 'width' : this.$container.clientWidth };
   }
}

RandomObjectMover.prototype._generateNewPosition = function() {

	// Get container dimensions minus div size
  var containerSize = this._getContainerDimensions();
	var availableHeight = containerSize.height - this.$object.clientHeight;
  var availableWidth = containerSize.width - this.$object.clientHeight;
    
  // Pick a random place in the space
  var y = Math.floor(Math.random() * availableHeight);
  var x = Math.floor(Math.random() * availableWidth);
    
  return { x: x, y: y };    
}

RandomObjectMover.prototype._calcDelta = function(a, b) {
	var dx   = a.x - b.x;         
  var dy   = a.y - b.y;         
  var dist = Math.sqrt( dx*dx + dy*dy ); 
  return dist;
}

RandomObjectMover.prototype._moveOnce = function() {
		// Pick a new spot on the page
    var next = this._generateNewPosition();
    
    // How far do we have to move?
    var delta = this._calcDelta(this.current_position, next);
    
		// Speed of this transition, rounded to 2DP
		var speed = Math.round((delta / this.pixels_per_second) * 100) / 100;
    
    //console.log(this.current_position, next, delta, speed);
          
    this.$object.style.transition='transform '+speed+'s linear';
    this.$object.style.transform='translate3d('+next.x+'px, '+next.y+'px, 0)';
    
    // Save this new position ready for the next call.
    this.current_position = next;
  
};

RandomObjectMover.prototype.start = function() {

	if (this.is_running) {
  	return;
  }

	// Make sure our object has the right css set
  this.$object.willChange = 'transform';
  this.$object.pointerEvents = 'auto';
	
  this.boundEvent = this._moveOnce.bind(this)
  
  // Bind callback to keep things moving
  this.$object.addEventListener('transitionend', this.boundEvent);
  
  // Start it moving
  this._moveOnce();
  
  this.is_running = true;
}

// Init it
var x = new RandomObjectMover(document.getElementById('eyeHolder'), window);
console.log(x);


// Start it off
//createANewEye();
x.start();


*/


function remove(el) {
  var element = el;
  element.remove();
}

//HOW TO USE IN WEBPAGE
/*
<link rel="stylesheet" href="eye-tracker.css">


<div class="eyeHolder" onclick="remove(this)">

    <div class="ufo">
      <div class="eye-lid">
        <div class="eyes">
          <div class="eye"></div>
        </div>
      </div>
    </div>
  
  </div>

<script src="eyeTracker.js"></script> 
*/



function createANewEye() {
  let newWholeEye = document.createElement("div");
  newWholeEye.class = 'eyeHolder';
  newWholeEye.onclick = "remove(this)";
  let newUfo = document.createElement("div");
    newUfo.class = 'ufo';
  let newEyeLid = document.createElement("div");
    newEyeLid.class = "eye-lid";
  let newEyes = document.createElement("div");
    newEyes.class="eyes";
  let newEye = document.createElement("div");
    newEye.class="eye";

  newWholeEye.appendChild(newUfo);
  newUfo.appendChild(newEyeLid);
  newEyeLid.appendChild(newEyes);
  newEyes.appendChild(newEye);

  var eyesHolder = document.getElementById('eyesHolder');
    eyesHolder.appendChild(newWholeEye);
}
