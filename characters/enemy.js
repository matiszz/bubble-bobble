const ENEMY_LEFT = 0;
const ENEMY_RIGHT = 1;

const ENEMY_DIRECTION_LEFT = 0;
const ENEMY_DIRECTION_RIGHT = 1;

function Enemy(x, y, map, type) {
  // Loading spritesheets
  const invader = new Texture("imgs/invader.png");

  // Prepare Bub sprite & its animations
  this.sprite = new Sprite(x, y, 32, 32, 4, invader);

  this.type = type;
  if (type === 'INVADER') {
    this.sprite.addAnimation();
    this.sprite.addKeyframe(ENEMY_LEFT, [0, 0, 16, 16]);
    this.sprite.addKeyframe(ENEMY_LEFT, [16, 0, 16, 16]);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(ENEMY_RIGHT, [0, 0, 16, 16]);
    this.sprite.addKeyframe(ENEMY_RIGHT, [16, 0, 16, 16]);
  } else {
    this.sprite.addAnimation();
    this.sprite.addKeyframe(ENEMY_LEFT, [0, 16, 16, 16]);
    this.sprite.addKeyframe(ENEMY_LEFT, [16, 16, 16, 16]);

    this.sprite.addAnimation();
    this.sprite.addKeyframe(ENEMY_RIGHT, [32, 16, 16, 16]);
    this.sprite.addKeyframe(ENEMY_RIGHT, [48, 16, 16, 16]);
  }

  // Set tilemap for collisions
  this.map = map;

  // Set attributes for jump
  this.bJumping = false;
  this.jumpAngle = 0;
  this.jumpingThreshold = 448 / 2 + random(0, 100);
  this.lastJumpedAt = 0;
  this.time_between_jumps = random(3000, 5000)

  // Attributes for direction and speed
  this.speed = randomFloat(1.5, 2);
  this.direction = random(0, 1);
  if (this.direction === ENEMY_DIRECTION_LEFT)
    this.sprite.setAnimation(ENEMY_LEFT)
  else
    this.sprite.setAnimation(ENEMY_RIGHT)

  // Attribute to get captured
  this.isCaptured = false;

  // Timestamp
  this.timestamp = 0;
}

Enemy.prototype.update = function (deltaTime) {

  if (!this.isCaptured) {
    if (this.direction === ENEMY_DIRECTION_RIGHT)
      this.moveRight(this.speed)
    else if (this.direction === ENEMY_DIRECTION_LEFT)
      this.moveLeft(this.speed)

    if (this.bJumping) {
      this.jumpAngle += 3;
      if (this.jumpAngle === 180) {
        this.bJumping = false;
        this.sprite.y = this.startY;
      } else {
        this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
        if (this.jumpAngle > 90)
          this.bJumping = !this.map.collisionMoveDown(this.sprite);
      }
    } else {
      // Move Bub so that it is affected by gravity
      this.sprite.y += FALLING_SPEED;
      if (this.map.collisionMoveDown(this.sprite)) {
        // Check arrow up key. If pressed, jump.
        if (this.isAllowedToJump()) {
          this.bJumping = true;
          this.jumpAngle = 0;
          this.startY = this.sprite.y;
        }
      }
    }
  }

  // Update sprites
  this.sprite.update(deltaTime);
  this.timestamp += deltaTime;
}

Enemy.prototype.draw = function () {
  if (!this.isCaptured)
    this.sprite.draw();
}

Enemy.prototype.collisionBox = function () {
  return new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
}

Enemy.prototype.moveLeft = function (speed) {
  this.sprite.x -= speed;
  if (this.map.collisionMoveLeft(this.sprite)) {
    this.direction = ENEMY_DIRECTION_RIGHT;
    this.sprite.setAnimation(ENEMY_RIGHT)
  }
}

Enemy.prototype.moveRight = function (speed) {
  this.sprite.x += speed;
  if (this.map.collisionMoveRight(this.sprite)) {
    this.direction = ENEMY_DIRECTION_LEFT;
    this.sprite.setAnimation(ENEMY_LEFT)
  }
}

Enemy.prototype.isAllowedToJump = function () {
  return (this.sprite.y > this.jumpingThreshold) && (this.timestamp - this.lastJumpedAt > this.time_between_jumps + random(-500, 1000))
}

Enemy.prototype.getType = function () {
  return this.type;
}

Enemy.prototype.capture = function () {
  this.isCaptured = true;
}

Enemy.prototype.releaseBubble = function (x, y) {
  this.isCaptured = false;
  this.sprite.x = x;
  this.sprite.y = y;
}