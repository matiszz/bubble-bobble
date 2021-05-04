

// Scene. Updates and draws a single scene of the game.

function SceneCredits() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/tiles.png");

	// Store current time
	this.currentTime = 0
}


SceneCredits.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
}

SceneCredits.prototype.draw = function (onClick) {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw Text
	context.font = "24px mono";
	context.fillStyle = "White";
	context.fillText("Credits", 225, 140);
	context.fillText("Created by Matias Szarfer", 120, 190);

	context.font = "14px mono";
	context.fillText("JC FIB 2021", 225, 240);

	const btnX = 30;
	const btnY = 30;
	const btnW = 70;
	const btnH = 30;

	drawButton(btnX, btnY, btnW, btnH, "Back", onClick);
}