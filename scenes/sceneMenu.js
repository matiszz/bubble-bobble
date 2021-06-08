// Scene. Updates and draws a single scene of the game.

function SceneMenu(onClickPlay, onClickCredits, onClickInstructions, isSceneMenu) {
	// Store current time
	this.currentTime = 0
	this.playButtonPaint = drawButton(50, 350, 110, 30, "Play", onClickPlay, isSceneMenu);
	this.creditsButtonPaint = drawButton(195, 350, 110, 30, "Credits", onClickCredits, isSceneMenu);
	this.instructionsButtonPaint = drawButton(340, 350, 110, 30, "Instructions", onClickInstructions, isSceneMenu);
}

SceneMenu.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
}

SceneMenu.prototype.draw = function () {
	// Get canvas object, then its context
	const canvas = document.getElementById("game-layer");
	const context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	const title = new Texture("imgs/BubbleBobble.png");
	context.drawImage(title.img, 160, 70);

	// Draw Text
	const highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0
	context.font = "20px ArcadeClassic";
	context.fillStyle = "#c90000";
	context.fillText("High Score", 200, 25);
	context.fillStyle = "White";
	context.fillText(highScore, 225, 40);

	if (Math.floor(this.currentTime / 1000) % 2 === 0) {
		context.font = "34px ArcadeClassic";
		context.fillStyle = "White";
		context.fillText("Insert  coin  to  play", 90, 290);
	}

	context.font = "24px ArcadeClassic";
	context.fillStyle = "White";
	context.fillText("Made  by  Matias  Szarfer", 120, 315);

	this.playButtonPaint()
	this.creditsButtonPaint()
	this.instructionsButtonPaint()
}