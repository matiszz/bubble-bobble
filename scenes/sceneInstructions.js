// Scene. Updates and draws a single scene of the game.

function SceneInstructions() {

	// Store current time
	this.currentTime = 0
}


SceneInstructions.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
}

SceneInstructions.prototype.draw = function (onClick) {
	// Get canvas object, then its context
	const canvas = document.getElementById("game-layer");
	const context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw Text

	context.font = "34px ArcadeClassic";
	context.fillStyle = "#ff0000";
	context.fillText("Instructions", 150, 140);

	context.font = "24px ArcadeClassic";
	context.fillStyle = "#fffa00";
	context.fillText("Left:", 100, 190);
	context.fillText("Right:", 100, 220);
	context.fillText("Up:", 100, 250);
	context.fillText("Space:", 100, 280);
	context.fillText("G:", 80, 330);
	context.fillText("1-5:", 80, 360);

	context.fillStyle = "#fff";
	context.fillText("Move left", 190, 190);
	context.fillText("Move right", 190, 220);
	context.fillText("Jump", 190, 250);
	context.fillText("Fire bubble", 190, 280);
	context.fillText("Enter Master Mode", 170, 330);
	context.fillText("Jump levels in Master mode", 170, 360);

	context.font = "20px ArcadeClassic";
	context.fillStyle = "#00c4ff";
	context.fillText("Kill  all  the  enemies  and  earn  points  to  win!", 40, 400);

	drawButton(30, 30, 70, 30, "Back", onClick);
}