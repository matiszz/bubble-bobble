function PointText(x, y, value) {
	this.value = value;
	this.x = x;
	this.y = y;
	this.initialY = y;

	this.timestamp = 0;

	this.pointSound = AudioFX('sounds/point.mp3');
	this.pointSound.play();
}


PointText.prototype.update = function update(deltaTime) {
	this.timestamp += deltaTime;
	this.y = this.initialY - this.timestamp * 0.05;
}

PointText.prototype.draw = function draw() {
	const canvas = document.getElementById("game-layer");
	const context = canvas.getContext("2d");

	// Draw Text
	context.font = "15px ArcadeClassic";
	context.fillStyle = "#14ff00";
	context.fillText(this.value + 'px', this.x, this.y);
}