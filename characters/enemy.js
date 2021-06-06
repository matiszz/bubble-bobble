
const ENEMY_LEFT = 0;
const ENEMY_RIGHT = 1;

const ENEMY_DIRECTION_LEFT = 0;
const ENEMY_DIRECTION_RIGHT = 1;

const MONSTER_SPEED = randomFloat(2, 3);

function Enemy(x, y, map, type) {
	// Loading spritesheets
	const invader = new Texture("imgs/invader.png");

	// Prepare Bub sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 7, invader);

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

	// Attributes for shooting
	this.direction = random(0, 1);
	if (this.direction === ENEMY_DIRECTION_LEFT)
		this.sprite.setAnimation(ENEMY_LEFT)
	else
		this.sprite.setAnimation(ENEMY_RIGHT)

	// Timestamp
	this.timestamp = 0;
}


Enemy.prototype.update = function (deltaTime) {
	// Update sprites
	this.sprite.update(deltaTime);
	this.timestamp += deltaTime;

	if (this.direction === ENEMY_DIRECTION_RIGHT)
		this.moveRight(MONSTER_SPEED)
	else if (this.direction === ENEMY_DIRECTION_LEFT)
		this.moveLeft(MONSTER_SPEED)
}

Enemy.prototype.draw = function () {
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