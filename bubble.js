
const BUBBLE_EMPTY = 0;
const BUBBLE_FULL = 1;

function Bubble(x, y) {
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

}


Bubble.prototype.update = function update(deltaTime) {
	this.sprite.update(deltaTime);
}

Bubble.prototype.draw = function draw() {
	this.sprite.draw();
}

Bubble.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}




