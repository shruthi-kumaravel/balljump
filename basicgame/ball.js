let ballcolor = '#999999';

function bol(x, y, radius) {

	this.x = x;
	this.y = y;

	this.yVelocity = 0;
	this.speed = 1;
	this.onGround = true;

	this.radius = radius; // size of circle
}

/**
	*	handle y values
	*/
bol.prototype.update = function(platform) {

	var bottom = this.y + this.radius; // bottom pixel of circle
	var nextBottom = bottom + this.yVelocity; // calculate next frame's bottom

  if (bottom <= platform && nextBottom >= platform) { // next frame will be on platform

		this.yVelocity = 0; // reset velocity
		this.y = platform - this.radius; // don't go past platform
		this.onGround = true;
  } else if (platform - bottom > 1) { // nowhere near platform

		this.yVelocity += this.speed; // increase velocity
		this.onGround = false;
  }

	/* movement */
	this.y += this.yVelocity;
};


bol.prototype.jump = function() {

	this.yVelocity = -(this.radius * 0.7); // jump
};

bol.prototype.draw = function() {

  fill(ballcolor);
	stroke(255);
	strokeWeight(2);
  ellipse(this.x, this.y, this.radius * 2);
};

bol.prototype.setColor = function(col) {
	ballcolor = color(col)
};