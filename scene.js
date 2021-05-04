

// Scene. Updates and draws a single scene of the game.

function Scene() {
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/tiles.png");

	// Create tilemap		
	this.map = new Tilemap(tilesheet, [16, 16], [2, 2], [0, 32], level05);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
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
}

Scene.prototype.drawCredits = function (onClick) {
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

	const rectangle = { x: btnX, y: btnY, width: btnW, heigth: btnH };

	canvas.addEventListener('click', (evt) => {
		const mousePos = getMousePos(canvas, evt);
		if (isInside(mousePos, rectangle)) onClick()
	}, false);

	context.rect(btnX, btnY, btnW, btnH);
	context.fillStyle = '#FFFFFF';
	context.fillStyle = 'rgba(225,225,225)';
	context.fill();
	context.lineWidth = 2;
	context.strokeStyle = '#000000';
	context.stroke();
	context.font = '18px Kremlin Pro Web';
	context.fillStyle = '#000000';
	context.fillText("Back", btnX + 10, btnY + 20);
}


Scene.prototype.drawInstructions = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw Tex
	context.font = "24px mono";
	context.fillStyle = "White";
	context.fillText("Credits", 225, 140);
	context.fillText("Created by Matias Szarfer", 120, 190);

	context.font = "14px mono";
	context.fillText("JC FIB 2021", 225, 240);
}

Scene.prototype.drawMenu = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "#334433";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();
}

function getMousePos(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}
function isInside(pos, rect) {
	return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.heigth && pos.y > rect.y
}