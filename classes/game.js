// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

const SCENE_CREDITS = 'SCENE_CREDITS';
const SCENE_MENU = 'SCENE_MENU';
const SCENE_INSTRUCTIONS = 'SCENE_INSTRUCTIONS';
const SCENE_PLAY = 'SCENE_PLAY';
const GAME_OVER = 'GAME_OVER';
const YOU_WON = 'YOU_WON';

const sceneCredits = new SceneCredits(onNavToMenu, isSceneCredits);
const sceneMenu = new SceneMenu(onNavToPlay, onNavToCredits, onNavToInstructions, isSceneMenu);
const sceneInstructions = new SceneInstructions(onNavToMenu, isSceneInstructions);
const sceneGameOver = new SceneGameOver(onNavToPlay, onNavToMenu, isSceneGameOver);
const sceneWon = new SceneYouWon(onNavToPlay, onNavToMenu, isSceneYouWon);
let sceneMain = new Scene(onNavToGameOver, onNavToYouWon);

let previousTimestamp;
let keyboard = [];
let interacted;
let currentScene = SCENE_MENU;


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

// Navigations
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
function onNavToGameOver (score) {
	currentScene = GAME_OVER;
	sessionStorage.setItem('score', score);
	sceneMain = new Scene(onNavToGameOver, onNavToYouWon);
}
function onNavToYouWon (score) {
	currentScene = YOU_WON;
	sessionStorage.setItem('score', score);
	sceneMain = new Scene(onNavToGameOver, onNavToYouWon);
}

// Functions to check scenes
function isSceneMenu () {
	return currentScene === SCENE_MENU;
}
function isSceneInstructions () {
	return currentScene === SCENE_INSTRUCTIONS;
}
function isSceneGameOver () {
	return currentScene === GAME_OVER;
}
function isSceneYouWon () {
	return currentScene === YOU_WON;
}
function isSceneCredits () {
	return currentScene === SCENE_CREDITS;
}

function drawCurrentScene(deltaTime, timestamp) {
	if (currentScene === SCENE_CREDITS) {
		sceneCredits.update(deltaTime);
		previousTimestamp = timestamp;
		sceneCredits.draw();
	} else if (currentScene === SCENE_MENU) {
		sceneMenu.update(deltaTime);
		previousTimestamp = timestamp;
		sceneMenu.draw();
	} else if (currentScene === SCENE_INSTRUCTIONS) {
		sceneInstructions.update(deltaTime);
		previousTimestamp = timestamp;
		sceneInstructions.draw();
	} else if (currentScene === SCENE_PLAY) {
		sceneMain.update(deltaTime);
		previousTimestamp = timestamp;
		sceneMain.draw(onNavToGameOver);
	} else if (currentScene === GAME_OVER) {
		sceneGameOver.update(deltaTime, onNavToPlay);
		previousTimestamp = timestamp;
		sceneGameOver.draw(sessionStorage.getItem('score'));
	} else if (currentScene === YOU_WON) {
		sceneWon.update(deltaTime, onNavToPlay);
		previousTimestamp = timestamp;
		sceneWon.draw(sessionStorage.getItem('score'));
	}
}
// Init and launch game loop
init();
frameUpdate(previousTimestamp);