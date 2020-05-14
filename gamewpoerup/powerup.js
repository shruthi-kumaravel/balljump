
function powerup(x, size, horizon, color) {

    this.x = x;
      this.y = horizon - size;
  
    this.size = size;
    this.color = color;
  
      this.onScreen = true;
  }
  
  /**
      *	handle x and onScreen values
      */
  powerup.prototype.update = function(speed) {
  
      /* check if offscreen */
      this.onScreen = (this.x > -this.size);
  
      /* movement */
      this.x -= speed;
  };
  
  powerup.prototype.draw = function() {
  
      fill(this.color);
      stroke(255);
      strokeWeight(2);
      rect(this.x, this.y, this.size, this.size);
  };
  
  /**
      * checks for collisions
      */
  powerup.prototype.hits = function(ball) {
  
      var halfSize = this.size / 2;
      var minimumDistance = halfSize + (ball.radius); // closest before collision
  
      /* find center coordinates */
      var xCenter = this.x + halfSize;
      var yCenter = this.y + halfSize;
  
      var distance = dist(xCenter, yCenter, ball.x, ball.y); // calculate distance from centers
  
      return (distance < minimumDistance); // return result
  };