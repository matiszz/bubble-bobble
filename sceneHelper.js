
function drawButton(btnX, btnY, btnW, btnH, text) {
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

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
	context.fillText(text, btnX + 10, btnY + 20);
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