
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

const SCENE_CREDITS = 'SCENE_CREDITS';
const SCENE_MENU = 'SCENE_MENU';
const SCENE_INSTRUCTIONS = 'SCENE_INSTRUCTIONS';
const SCENE_PLAY = 'SCENE_PLAY';

const sceneMain = new Scene();
const sceneCredits = new SceneCredits();
const sceneMenu = new SceneMenu();

let previousTimestamp;
let keyboard = [];
let interacted;
let currentScene = SCENE_PLAY;


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
	for (let i = 0; i < 256; i++)
		keyboard.push(false);
	
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame
function frameUpdate(timestamp) {
	const deltaTime = timestamp - previousTimestamp;
	if (deltaTime > TIME_PER_FRAME)
		drawCurrentScene(deltaTime, timestamp);

	window.requestAnimationFrame(frameUpdate)
}

function onNavToMenu () {
	currentScene = SCENE_MENU;
}
function onNavToInstructions () {
	currentScene = SCENE_INSTRUCTIONS;
}
function onNavToPlay () {
	currentScene = SCENE_PLAY;
}
function onNavToCredits () {
	currentScene = SCENE_CREDITS;
}

function drawCurrentScene(deltaTime, timestamp) {
	if (currentScene === SCENE_CREDITS) {
		sceneCredits.update(deltaTime);
		previousTimestamp = timestamp;
		sceneCredits.draw(onNavToMenu);
	} else if (currentScene === SCENE_MENU) {
		sceneMenu.update(deltaTime);
		previousTimestamp = timestamp;
		sceneMenu.draw(onNavToPlay, onNavToCredits, onNavToInstructions);
	} else if (currentScene === SCENE_INSTRUCTIONS) {
		sceneMain.update(deltaTime);
		previousTimestamp = timestamp;
		sceneMain.draw();
	} else if (currentScene === SCENE_PLAY) {
		sceneMain.update(deltaTime);
		previousTimestamp = timestamp;
		sceneMain.draw();
	}
}
// Init and launch game loop
init();
frameUpdate(previousTimestamp);