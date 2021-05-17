

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/tiles.png");

	// Create tilemap		
	this.map = new Tilemap(tilesheet, [16, 16], [2, 2], [0, 32], level01);

	this.player = new Player(224, 240, this.map);
	this.bubble = new Bubble(360, 112);
	this.bubbleActive = true;
	
	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	this.player.update(deltaTime);
	this.bubble.update(deltaTime);
	
	// Check for collision between entities
	if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;
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


	if(this.bubbleActive)
		this.bubble.draw();
	this.player.draw();
}