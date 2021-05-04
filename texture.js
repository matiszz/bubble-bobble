
// Container for an image

function Texture(imgpath) {
	this.img = new Image();
	this.img.src = imgpath;
}


Texture.prototype.isLoaded = function () {
	return this.img.complete;
}

Texture.prototype.width = function () {
	return this.img.width;
}

Texture.prototype.height = function () {
	return this.img.height;
}


