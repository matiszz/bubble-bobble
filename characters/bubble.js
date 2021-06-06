
const BUBBLE_EMPTY = 0;
const BUBBLE_FULL = 1;

const DIRECTION_LEFT = 0;
const DIRECTION_RIGHT = 1;

const STATUS_IMPULSE = 0;
const STATUS_FLOATING = 1;
const FLOATING_LEFT = 0;
const FLOATING_RIGHT = 1;
const FLOATING_UP = 2;
const FLOATING_DOWN = 3;

const IMPULSE_TIME = 600;
const FLOATING_TIME = 1000;

const IMPULSE_SPEED = 10;
const FLOATING_SPEED = 1;

function Bubble(x, y, direction, map) {
	var bubble = new Texture("imgs/bubble.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUBBLE_EMPTY, [0, 16, 16, 16]);
	this.sprite.addKeyframe(BUBBLE_EMPTY, [16, 16, 16, 16]);
	this.sprite.addKeyframe(BUBBLE_EMPTY, [32, 16, 16, 16]);
	this.sprite.addKeyframe(BUBBLE_EMPTY, [48, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BUBBLE_FULL, [0, 0, 16, 16]);
	this.sprite.addKeyframe(BUBBLE_FULL, [16, 0, 16, 16]);
	this.sprite.addKeyframe(BUBBLE_FULL, [32, 0, 16, 16]);
	this.sprite.addKeyframe(BUBBLE_FULL, [48, 0, 16, 16]);

	this.sprite.setAnimation(BUBBLE_EMPTY);

	this.impulseDirection = direction;
	this.floatingDirection = FLOATING_UP;
	this.status = STATUS_IMPULSE;
	this.timestamp = 0;

	this.lastFloatingChange = 0;

	this.map = map;
}


Bubble.prototype.update = function update(deltaTime) {
	this.sprite.update(deltaTime);
	this.timestamp += deltaTime;

	if (this.timestamp >= IMPULSE_TIME)
		this.status = STATUS_FLOATING;

	if (this.status == STATUS_IMPULSE) {
		if (this.impulseDirection == DIRECTION_RIGHT)
			this.moveRight(IMPULSE_SPEED)
		else if (this.impulseDirection == DIRECTION_LEFT) 
			this.moveLeft(IMPULSE_SPEED)
		
	} else if (this.status == STATUS_FLOATING) {
		if (this.floatingDirection == FLOATING_UP)
			this.moveUp(FLOATING_SPEED)
		else if (this.floatingDirection == FLOATING_DOWN)
			this.moveDown(FLOATING_SPEED)
		else if (this.floatingDirection == FLOATING_LEFT)
			this.moveLeft(FLOATING_SPEED)
		else if (this.floatingDirection == FLOATING_RIGHT)
			this.moveRight(FLOATING_SPEED)

		if (this.timestamp - this.lastFloatingChange > FLOATING_TIME) {
			this.floatingDirection = Math.floor(Math.random() * 4);
			this.lastFloatingChange = this.timestamp;
		}
	}
}

Bubble.prototype.draw = function draw() {
	this.sprite.draw();
}

Bubble.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}

Bubble.prototype.moveLeft = function (speed) {
	this.sprite.x -= speed;
	if (this.map.collisionMoveLeft(this.sprite))
		this.sprite.x += speed;
}

Bubble.prototype.moveRight = function (speed) {
	this.sprite.x += speed;
	if (this.map.collisionMoveRight(this.sprite))
		this.sprite.x -= speed;
}

Bubble.prototype.moveUp = function (speed) {
	this.sprite.y -= speed;
}

Bubble.prototype.moveDown = function (speed) {
	this.sprite.y += speed;
	if (this.map.collisionMoveDown(this.sprite))
		this.sprite.y -= speed;
}

