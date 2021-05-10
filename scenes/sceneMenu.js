

// Scene. Updates and draws a single scene of the game.

function SceneMenu() {
	// Store current time
	this.currentTime = 0
}


SceneMenu.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
}

SceneMenu.prototype.draw = function (onClickPlay, onClickCredits, onClickInstructions) {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw Text
	context.font = "34px mono";
	context.fillStyle = "White";
	context.fillText("Bubble Bobble", 155, 100);

	context.font = "24px mono";
	context.fillText("Main Menu", 200, 140);

	drawButton(200, 200, 110, 30, "Play", onClickPlay);
	drawButton(200, 250, 110, 30, "Credits", onClickCredits);
	drawButton(200, 300, 110, 30, "Instructions", onClickInstructions);
}