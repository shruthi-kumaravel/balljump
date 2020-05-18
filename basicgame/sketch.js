var horizon;
var obstacleSpeed;

var pause = false;
var score;
var obstacles = [];
var powerups = [];
var gameoveraudio = new Audio('gameover.mp3');
var boingaudio = new Audio('boing.mp3');
var ball;
var highscore = localStorage.getItem("highscore");
var triangle = false;

function setup() {

  createCanvas(600, 200);

  textAlign(CENTER);

  horizon = height - 40;

	score = 0;
	obstacleSpeed = 6;
    
	var size = 20;
	ball = new bol(size * 2, height - horizon, size);
	triangle = false;
  textSize(20);
}

function draw() {
  background(51);

	drawHUD();

	handleLevel(frameCount);

	ball.update(horizon);
  
  handleObstacles();
  handlepowerups();
}

/**
	* draws horizon & score
	*/
function drawHUD() {

  /* draw horizon */
  stroke(255);
	strokeWeight(2);
  line(0, horizon, width, horizon);

	/* draw score */
	noStroke();
  text("Score: " + score, width / 2, 30);

	
	ball.draw();
}

/**
	*	updates, draws, and cleans out the obstacles
	*/
function handleObstacles() {

	
	for (var i = obstacles.length - 1; i >= 0; i--) {
  
		  obstacles[i].update(obstacleSpeed);
		  obstacles[i].draw();
			console.log('triangle obs', triangle)
		  if (obstacles[i].hits(ball) && !triangle) {
			endGame();
		  } // if there's a collision

  
	  if (!obstacles[i].onScreen) // if it's no longer showing
		obstacles.splice(i, 1); // delete from array
	}
  }
function handlepowerups() {
	for (var i = powerups.length - 1; i >= 0; i--) {
  
		  powerups[i].update(1);
		  powerups[i].draw();
  
		  if (powerups[i].hits(ball)) {
			ball.setColor('yellow');
			triangle = true;
			console.log('triag', triangle);
			  setTimeout(() => {
				ball.setColor('#999999');
				triangle = false;
			  }, 3000);
		  }

  
	  if (!powerups[i].onScreen) // if it's no longer showing
		powerups.splice(i, 1); // delete from array
	}
  }




/**
	* speeds game up, pushes new obstacles, & handles score
	*/
function handleLevel(n) {
	
	

  if (n % 30 === 0) { // every 0.5 seconds

    var n = noise(n); 

	if (n>0.75)  
	  newpowerups(n);
	else if (n>0.5)
      newObstacle(n); // push new obstacle
	
     
	  if (n % 120 === 0) // every 2 seconds
	    obstacleSpeed *= 1.25; // speed up
  }

	score++;
}

/**
	* pushes random obstacle
	*/
function newObstacle(n) {

  var col = color(255, 0, 0);
  var size = random(25) + 20;
  var obs = new Obstacle(width + size, size, horizon, col);

  obstacles.push(obs);
}
function newpowerups(n) {

	var col = color(0, 255 , 0);
	var size = random(25) + 20;
    var power = new Powerup(width + size, size, horizon, col);

  powerups.push(power);
}

function keyPressed() {

	if ((keyCode === UP_ARROW || keyCode === 32) && ball.onGround) // jump if possible
		ball.jump();
		boingaudio.play()
}


function endGame() {

	noLoop();
  noStroke();
  textSize(40);
  text("GAME OVER", width / 2, height / 2);
  if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
}
  else{
    localStorage.setItem("highscore", score);
}

  textSize(20);
  text("Highscore: "+ highscore, width / 2, height / 2 + 20);
  gameoveraudio.play()
}