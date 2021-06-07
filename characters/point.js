
const CAKE = 0;
const FRUIT = 1;
const DESERT = 2;
const BEER = 3;

const POINT_SPEED = 3;

function Point(x, y, map) {
	const bubble = new Texture("imgs/points.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 16, 16, 1, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(CAKE, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(FRUIT, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(DESERT, [0, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(BEER, [16, 16, 16, 16]);

	const animation = random(0, 3);
	this.sprite.setAnimation(animation);
	this.pointScore = [570, 190, 340, 470][animation];

	this.map = map;
}


Point.prototype.update = function update(deltaTime) {
	this.sprite.update(deltaTime);
	this.timestamp += deltaTime;
}

Point.prototype.draw = function draw() {
	this.sprite.draw();
}

Point.prototype.collisionBox = function () {
	return new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
}