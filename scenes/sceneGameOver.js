// Scene. Updates and draws a single scene of the game.

function SceneGameOver(onNavToPlay, onNavToMenu, isSceneGameOver) {
  this.playButtonDraw = drawButton(120, 350, 110, 30, "Play again", onNavToPlay, isSceneGameOver);
  this.menuButtonDraw = drawButton(280, 350, 110, 30, "Main menu", onNavToMenu, isSceneGameOver);

  // Store current time
  this.currentTime = 0
  this.sound = AudioFX('sounds/game_over.mp3')
}


SceneGameOver.prototype.update = function (deltaTime, onNavToPlay) {
  if (this.currentTime === 0)
    this.sound.play();

  // Keep track of time
  this.currentTime += deltaTime;

  if (keyboard[32])
    onNavToPlay()
}

SceneGameOver.prototype.draw = function (score) {
  // Get canvas object, then its context
  const canvas = document.getElementById("game-layer");
  const context = canvas.getContext("2d");

  // Clear background
  context.fillStyle = "#334433";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Text
  context.font = "15px ArcadeClassic";
  context.fillStyle = "White";
  context.fillText("Press  [space]  to  play  again", 150, 60);

  if (Math.floor(this.currentTime / 1000) % 2 === 0) {
    context.font = "56px ArcadeClassic";
    context.fillStyle = "#ff0000";
    context.fillText("GAME  OVER", 120, 140);
  }

  context.font = "34px ArcadeClassic";
  context.fillStyle = "White";
  context.fillText("You  lost!", 180, 180);

  context.font = "20px ArcadeClassic";
  context.fillStyle = "#00ff00";
  context.fillText("Your  score", 200, 250);
  context.fillStyle = "White";
  context.fillText(score, 225, 270);

  const highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0
  context.font = "20px ArcadeClassic";
  context.fillStyle = "#00c3ff";
  context.fillText("High  Score", 200, 300);
  context.fillStyle = "White";
  context.fillText(highScore, 225, 320);

  this.playButtonDraw();
  this.menuButtonDraw();
}