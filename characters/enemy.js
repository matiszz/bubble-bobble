
const ENEMY_INVADER = 0;
const ENEMY_MONSTER_LEFT = 1;
const ENEMY_MONSTER_RIGHT = 2;

const MONSTER_SPEED = 3;

function Enemy(x, y, map) {
	// Loading spritesheets
	const invader = new Texture("imgs/invader.png");

	// Prepare Bub sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 7, invader);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ENEMY_INVADER, [0, 0, 16, 16]);
	this.sprite.addKeyframe(ENEMY_INVADER, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ENEMY_MONSTER_LEFT, [0, 16, 16, 16]);
	this.sprite.addKeyframe(ENEMY_MONSTER_LEFT, [16, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(ENEMY_MONSTER_RIGHT, [32, 16, 16, 16]);
	this.sprite.addKeyframe(ENEMY_MONSTER_RIGHT, [48, 16, 16, 16]);


	this.sprite.setAnimation(ENEMY_MONSTER_RIGHT);

	// Set tilemap for collisions
	this.map = map;

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;

	// Attributes for shooting
	this.shootingSince = 0;
	this.bShooting = false;

	// Timestamp
	this.timestamp = 0;
}


Enemy.prototype.update = function (deltaTime) {
	// Update sprites
	this.sprite.update(deltaTime);
	this.timestamp += deltaTime;
}

Enemy.prototype.draw = function () {
	this.sprite.draw();
}

Enemy.prototype.collisionBox = function () {
	return new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
}




