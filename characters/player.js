const BUB_STAND_LEFT = 0;
const BUB_STAND_RIGHT = 1;
const BUB_WALK_LEFT = 2;
const BUB_WALK_RIGHT = 3;
const BUB_SHOOT_RIGHT = 4;
const BUB_SHOOT_LEFT = 5;
const BUB_DYING = 6;

const FIRE_TIME = 100;
const PLAYER_SPEED = 4;

function Player(x, y, map) {
  // Loading spritesheets
  const bub = new Texture("imgs/bub.png");

  // Prepare Bub sprite & its animations
  this.sprite = new Sprite(x, y, 32, 32, 7, bub);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_STAND_LEFT, [0, 0, 32, 32]);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_STAND_RIGHT, [32, 0, 32, 32]);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_WALK_LEFT, [0, 0, 32, 32]);
  this.sprite.addKeyframe(BUB_WALK_LEFT, [0, 32, 32, 32]);
  this.sprite.addKeyframe(BUB_WALK_LEFT, [0, 64, 32, 32]);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_WALK_RIGHT, [32, 0, 32, 32]);
  this.sprite.addKeyframe(BUB_WALK_RIGHT, [32, 32, 32, 32]);
  this.sprite.addKeyframe(BUB_WALK_RIGHT, [32, 64, 32, 32]);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_SHOOT_RIGHT, [64, 96, 32, 32]);
  this.sprite.addKeyframe(BUB_SHOOT_RIGHT, [96, 96, 32, 32]);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_SHOOT_LEFT, [0, 96, 32, 32]);
  this.sprite.addKeyframe(BUB_SHOOT_LEFT, [32, 96, 32, 32]);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(BUB_DYING, [64, 0, 32, 32]);
  this.sprite.addKeyframe(BUB_DYING, [64, 32, 32, 32]);
  this.sprite.addKeyframe(BUB_DYING, [64, 96, 32, 32]);
  this.sprite.addKeyframe(BUB_DYING, [0, 96, 32, 32]);

  this.sprite.setAnimation(BUB_STAND_RIGHT);

  // Set tilemap for collisions
  this.map = map;

  // Set attributes for jump
  this.bJumping = false;
  this.jumpAngle = 0;

  // Attributes for shooting
  this.shootingSince = 0;
  this.bShooting = false;

  // Attributes for dying
  this.dying = false;
  this.dead = false;

  // Timestamp
  this.timestamp = 0;
}

Player.prototype.update = function (deltaTime) {

  if (this.dying) {
    this.jumpAngle += 5;
    const sinus = Math.sin(3.14159 * this.jumpAngle / 180)

    if (sinus < -0.9 || this.jumpAngle > 230) { // Fall
      this.sprite.setAnimation(BUB_STAND_RIGHT)
      this.sprite.y = this.startY + 96 + (this.jumpAngle-230) * 0.7;

      if (this.sprite.y > 448)
        this.dying = false;
    } else { // Jump
      this.sprite.y = this.startY - 96 * sinus;
    }

  } else {
    if (this.bShooting && this.timestamp - this.shootingSince >= FIRE_TIME) {
      this.bShooting = false;

      if (this.sprite.currentAnimation === BUB_SHOOT_LEFT)
        this.sprite.setAnimation(BUB_STAND_LEFT);
      if (this.sprite.currentAnimation === BUB_SHOOT_RIGHT)
        this.sprite.setAnimation(BUB_STAND_RIGHT);
    }

    // Move Bub sprite left/right
    if (keyboard[32]) { // KEY_SPACE
      this.shootingSince = deltaTime;
      this.bShooting = true;

      if (keyboard[37]) { // KEY_LEFT
        if (this.sprite.x >= PLAYER_SPEED)
          this.sprite.x -= PLAYER_SPEED;
      } else if (keyboard[39]) { // KEY_RIGHT
        if (this.sprite.x < 480 - PLAYER_SPEED)
          this.sprite.x += PLAYER_SPEED;
      }

      if (this.sprite.currentAnimation === BUB_WALK_LEFT) {
        if (this.sprite.currentAnimation !== BUB_SHOOT_LEFT)
          this.sprite.setAnimation(BUB_SHOOT_LEFT);
      } else if (this.sprite.currentAnimation === BUB_WALK_RIGHT) {
        if (this.sprite.currentAnimation !== BUB_SHOOT_RIGHT)
          this.sprite.setAnimation(BUB_SHOOT_RIGHT);
      } else if (this.sprite.currentAnimation === BUB_STAND_LEFT) {
        if (this.sprite.currentAnimation !== BUB_SHOOT_LEFT)
          this.sprite.setAnimation(BUB_SHOOT_LEFT);
      } else if (this.sprite.currentAnimation === BUB_STAND_RIGHT) {
        if (this.sprite.currentAnimation !== BUB_SHOOT_RIGHT)
          this.sprite.setAnimation(BUB_SHOOT_RIGHT);
      }
    } else if (keyboard[37]) { // KEY_LEFT
      if (this.sprite.currentAnimation !== BUB_WALK_LEFT)
        this.sprite.setAnimation(BUB_WALK_LEFT);
      this.sprite.x -= PLAYER_SPEED;
      if (this.map.collisionMoveLeft(this.sprite))
        this.sprite.x += PLAYER_SPEED;
    } else if (keyboard[39]) { // KEY_RIGHT
      if (this.sprite.currentAnimation !== BUB_WALK_RIGHT)
        this.sprite.setAnimation(BUB_WALK_RIGHT);
      this.sprite.x += PLAYER_SPEED;
      if (this.map.collisionMoveRight(this.sprite))
        this.sprite.x -= PLAYER_SPEED;
    } else {
      if (this.sprite.currentAnimation === BUB_WALK_LEFT)
        this.sprite.setAnimation(BUB_STAND_LEFT);
      if (this.sprite.currentAnimation === BUB_WALK_RIGHT)
        this.sprite.setAnimation(BUB_STAND_RIGHT);
    }

    if (this.bJumping) {
      this.jumpAngle += 5;
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
      this.sprite.y += PLAYER_SPEED;
      if (this.map.collisionMoveDown(this.sprite)) {
        //this.sprite.y -= SPEED;

        // Check arrow up key. If pressed, jump.
        if (keyboard[38]) {
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

Player.prototype.draw = function () {
  this.sprite.draw();
}

Player.prototype.collisionBox = function () {
  return new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
}

Player.prototype.die = function () {
  this.startY = this.sprite.y;
  this.dying = true;
  this.sprite.setAnimation(BUB_DYING);
}