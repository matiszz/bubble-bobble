
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

const SCENE_CREDITS = 'SCENE_CREDITS';
const SCENE_MENU = 'SCENE_MENU';
const SCENE_INSTRUCTIONS = 'SCENE_INSTRUCTIONS';
const SCENE_PLAY = 'SCENE_PLAY';

var scene = new Scene();
var previousTimestamp;
var keyboard = [];
var interacted;
var currentScene = SCENE_CREDITS;


// Control keyboard events

function keyDown(keycode) {
	if (keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;
}

function keyUp(keycode) {
	if (keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
}

function click() {
	interacted = true;
}

// Initialization

function init() {
	for (var i = 0; i < 256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp) {
	var deltaTime = timestamp - previousTimestamp;
	if (deltaTime > TIME_PER_FRAME) {
		scene.update(deltaTime);
		previousTimestamp = timestamp;
		drawCurrentScene();
	}
	window.requestAnimationFrame(frameUpdate)
}

function drawCurrentScene() {
	if (currentScene == SCENE_CREDITS)
		scene.drawCredits(() => {currentScene = SCENE_MENU});
	if (currentScene == SCENE_INSTRUCTIONS)
		scene.drawInstructions();
	if (currentScene == SCENE_MENU)
		scene.drawMenu();
	if (currentScene == SCENE_PLAY)
		scene.draw();
}

// Init and launch game loop
init();
frameUpdate(previousTimestamp);

