
// Sprite. Draws a sprite using the current keyframe of a selected animation.

function Sprite(x, y, width, height, fps, spritesheet) {
	this.x = x
	this.y = y
	this.width = width
	this.height = height

	this.timePerKeyframe = 1000 / fps;

	this.currentAnimation = 0;
	this.currentKeyframe = 0;
	this.animations = [];
	this.timeInKeyframe = 0;

	this.spritesheet = spritesheet
}


// Add an empty animation

Sprite.prototype.addAnimation = function () {
	this.animations.push([]);

	return this.animations.length - 1;
}

// Return number of available animations

Sprite.prototype.numAnimation = function () {
	return this.animations.length;
}

// Add a keyframe to animation animationId. Keyframe must be an array [sx, sy, sWidth, sHieght]
// that defines the rectangle of the keyframe inside the spritesheet
// (sx, sy) = Minimum coordinates of the rectangle
// (sWidth, sHeight) = Size of rectangle

Sprite.prototype.addKeyframe = function (animationId, keyframe) {
	if (animationId >= 0 && animationId < this.animations.length)
		this.animations[animationId].push(keyframe);
}

// Set new animation. Current keyframe and time spent in it are reset

Sprite.prototype.setAnimation = function (animationId) {
	if (animationId >= 0 && animationId < this.animations.length) {
		this.currentAnimation = animationId;
		this.currentKeyframe = 0;
		this.timeInKeyframe = 0;
	}
}

// Updates animation by changing current keyframe according to the time passed (deltaTime)

Sprite.prototype.update = function (deltaTime) {
	if (this.currentAnimation >= 0 && this.currentAnimation < this.animations.length) {
		this.timeInKeyframe += deltaTime;
		while (this.timeInKeyframe > this.timePerKeyframe) {
			this.timeInKeyframe -= this.timePerKeyframe;
			this.currentKeyframe++;
			if (this.currentKeyframe >= this.animations[this.currentAnimation].length)
				this.currentKeyframe = 0;
		}
	}
}

// Draw sprite using current keyframe from current animation

Sprite.prototype.draw = function () {
	// Check that current animation & keyframe ids are valid
	if (this.currentAnimation >= this.animations.length)
		return;
	if (this.currentKeyframe >= this.animations[this.currentAnimation].length)
		return;

	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw sprite using current keyframe
	context.imageSmoothingEnabled = false;
	var keyframe = this.animations[this.currentAnimation][this.currentKeyframe];
	context.drawImage(this.spritesheet.img, keyframe[0], keyframe[1], keyframe[2], keyframe[3], this.x, this.y, this.width, this.height);
}


