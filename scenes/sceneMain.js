const BUBBLE_CREATION_TIME = 300;

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/tiles.png");

	// Create tilemap		
	this.map = new Tilemap(tilesheet, [16, 16], [2, 2], [0, 32], level01);

	this.player = new Player(224, 240, this.map);

	this.bubbles = [];
	this.lastBubbleCreatedTime = 0;
	
	// Store current time
	this.currentTime = 0;
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	this.player.update(deltaTime);

	// SPACE
	if (keyboard[32] && this.didEnoughTimePassed()) {
		this.lastBubbleCreatedTime = this.currentTime;
		this.bubbles.push(new Bubble(this.player.sprite.x, this.player.sprite.y, this.shotDirection(), this.map));
	}

	for (bubble of this.bubbles) {
		bubble.update(deltaTime);

		// Check for collision between entities
		if(this.player.collisionBox().intersect(bubble.collisionBox()) && this.didEnoughTimePassed()) {
			this.bubbles = this.bubbles.filter(el => el != bubble);
		}
	}
}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	for (bubble of this.bubbles) 
		bubble.draw();

	this.player.draw();
}

Scene.prototype.didEnoughTimePassed = function() {
	return this.currentTime - this.lastBubbleCreatedTime > BUBBLE_CREATION_TIME;
}

Scene.prototype.shotDirection = function() {
	const animation = this.player.sprite.currentAnimation;
	if (animation == 0 || animation == 2 || animation == 5)
		return 0;
	return 1;
}