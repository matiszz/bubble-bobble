// Scene. Updates and draws a single scene of the game.

function SceneCredits() {

	// Store current time
	this.currentTime = 0
}


SceneCredits.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
}

SceneCredits.prototype.draw = function (onClick) {
	// Get canvas object, then its context
	const canvas = document.getElementById("game-layer");
	const context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw Text

	context.font = "34px ArcadeClassic";
	context.fillStyle = "#ff0000";
	context.fillText("Credits", 190, 140);

	context.font = "24px ArcadeClassic";
	context.fillStyle = "#fff";
	context.fillText("Game  created  by  Matias  Szarfer", 70, 190);

	context.fillStyle = "#fffa00";
	context.fillText("www.matiasszarfer.com", 120, 220);

	context.fillStyle = "#fff";
	context.fillText("Jocs  per  computador", 140, 290);
	context.fillText("Facultat  d'informatica  de  Barcelona", 40, 320);
	context.fillText("Universitat  Politecnica  de  Catalunya", 30, 350);
	context.fillText("June 2021", 200, 380);

	drawButton(30, 30, 70, 30, "Back", onClick);
}