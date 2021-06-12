// Scene. Updates and draws a single scene of the game.

function SceneYouWon(onNavToPlay, onNavToMenu, isSceneYouWon) {
  this.playButtonDraw = drawButton(120, 350, 110, 30, "Play again", onNavToPlay, isSceneYouWon);
  this.menuButtonDraw = drawButton(280, 350, 110, 30, "Main menu", onNavToMenu, isSceneYouWon);

  const thanks = new Texture("imgs/thanks.png");
  this.sprite = new Sprite(230, 200, 64, 64, 2, thanks);

  this.sprite.addAnimation();
  this.sprite.addKeyframe(0, [0, 0, 32, 32]);
  this.sprite.addKeyframe(0, [32, 0, 32, 32]);
  this.sprite.setAnimation(0);

  // Store current time
  this.currentTime = 0
  this.sound = AudioFX('sounds/level_up.mp3')
}


SceneYouWon.prototype.update = function (deltaTime, onNavToPlay) {
  this.sprite.update(deltaTime);

  if (this.currentTime === 0)
    this.sound.play();

  // Keep track of time
  this.currentTime += deltaTime;

  if (keyboard[32])
    onNavToPlay()
}

SceneYouWon.prototype.draw = function (score) {
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
    context.fillStyle = "#e600ff";
    context.fillText("YOU  WON!", 150, 140);
  }

  context.font = "34px ArcadeClassic";
  context.fillStyle = "White";
  context.fillText("Thanks  for  playing!", 90, 180);

  this.sprite.draw();

  context.font = "20px ArcadeClassic";
  context.fillStyle = "#00ff00";
  context.fillText("Your  score", 100, 300);
  context.fillStyle = "White";
  context.fillText(score, 125, 320);

  const highScore = localStorage.getItem('highScore') ? localStorage.getItem('highScore') : 0
  context.font = "20px ArcadeClassic";
  context.fillStyle = "#00c3ff";
  context.fillText("High  Score", 300, 300);
  context.fillStyle = "White";
  context.fillText(highScore, 320, 320);

  this.playButtonDraw();
  this.menuButtonDraw();
}