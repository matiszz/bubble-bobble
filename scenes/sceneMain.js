const BUBBLE_CREATION_TIME = 300;
const POINT_CREATION_TIME = 800;

// Scene. Updates and draws a single scene of the game.

function Scene(level) {
  // Loading texture to use in a TileMap
  const tilesheet = new Texture("imgs/tiles.png");
  this.currentLevel = level;

  // Create tilemap
  this.map = new Tilemap(tilesheet, [16, 16], [2, 2], [0, 32], level);

  // Characters
  this.player = new Player(224, 240, this.map);
  this.enemies = this.createEnemies();

  // Bubbles and points
  this.bubbles = [];
  this.points = [];
  this.lastBubbleCreatedTime = 0;
  this.lastPointCreatedTime = 0;

  // Store current time
  this.currentTime = 0;

  // Score variables
  this.score = 0;
  const highScore = localStorage.getItem('highScore');
  this.highScore = highScore ? highScore : 0;
}

Scene.prototype.update = function (deltaTime) {
  // Keep track of time
  this.currentTime += deltaTime;

  this.player.update(deltaTime);

  // SPACE
  if (keyboard[32] && this.didEnoughTimePassedBubble()) {
    this.lastBubbleCreatedTime = this.currentTime;
    this.bubbles.push(new Bubble(this.player.sprite.x, this.player.sprite.y, this.shotDirection(), this.map));
  }

  for (let point of this.points) {
    point.update(deltaTime);

    if (this.player.collisionBox().intersect(point.collisionBox()) && this.didEnoughTimePassedPoint()) {
      this.addScore(point.pointScore);
      this.points = this.points.filter(el => el !== point);
    }
  }

  for (let bubble of this.bubbles) {
    bubble.update(deltaTime);

    // Check for collision between entities
    if (this.player.collisionBox().intersect(bubble.collisionBox()) && this.didEnoughTimePassedBubble()) {
      if (bubble.hasEnemyCaptured) {
        this.points.push(new Point(bubble.sprite.x, bubble.sprite.y, this.map))
        this.lastPointCreatedTime = this.currentTime;
      }

      this.bubbles = this.bubbles.filter(el => el !== bubble);
    }
  }

  for (let enemy of this.enemies) {
    enemy.update(deltaTime);

    // Check for collision with enemy
    if (this.player.collisionBox().intersect(enemy.collisionBox()) && !enemy.isCaptured)
      this.player.die();

    // Check collisions enemies and bubbles
    for (let bubble of this.bubbles) {
      if (enemy.collisionBox().intersect(bubble.collisionBox()) && !enemy.isCaptured && !bubble.hasEnemyCaptured) {
        bubble.captureEnemy(enemy.getType(), enemy);
        enemy.capture();
      }
    }
  }

}

Scene.prototype.draw = function () {
  // Get canvas object, then its context
  const canvas = document.getElementById("game-layer");
  const context = canvas.getContext("2d");

  // Clear background
  context.fillStyle = "#334433";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Draw tilemap
  this.map.draw();
  this.drawTexts();

  for (let bubble of this.bubbles)
    bubble.draw();
  for (let enemy of this.enemies)
    enemy.draw();
  for (let point of this.points)
    point.draw();

  this.player.draw();
}

Scene.prototype.didEnoughTimePassedBubble = function () {
  return this.currentTime - this.lastBubbleCreatedTime > BUBBLE_CREATION_TIME;
}

Scene.prototype.didEnoughTimePassedPoint = function () {
  return this.currentTime - this.lastPointCreatedTime > POINT_CREATION_TIME;
}

Scene.prototype.shotDirection = function () {
  const animation = this.player.sprite.currentAnimation;
  if (animation === 0 || animation === 2 || animation === 5)
    return 0;
  return 1;
}

Scene.prototype.createEnemies = function () {
  switch (this.currentLevel) {
    case level01:
      return [
        new Enemy(150, 153, this.map, 'INVADER'),
        // new Enemy(370, 153, this.map, 'INVADER'),
        // new Enemy(370, 330, this.map, 'MONSTER'),
        // new Enemy(150, 330, this.map, 'MONSTER')
      ]
    case level02:
      return [
        new Enemy(443, 100, this.map, 'MONSTER'),
        new Enemy(70, 100, this.map, 'MONSTER'),
        new Enemy(245, 185, this.map, 'INVADER'),
        new Enemy(255, 185, this.map, 'INVADER'),
        new Enemy(443, 400, this.map, 'MONSTER'),
      ]
    case level03:
      return [
        new Enemy(443, 100, this.map, 'MONSTER'),
        new Enemy(70, 100, this.map, 'MONSTER'),
        new Enemy(300, 230, this.map, 'MONSTER'),
        new Enemy(180, 230, this.map, 'MONSTER'),
        new Enemy(400, 330, this.map, 'MONSTER'),
        new Enemy(100, 330, this.map, 'MONSTER'),
      ]
    case level04:
      return [
        new Enemy(450, 105, this.map, 'MONSTER'),
        new Enemy(50, 105, this.map, 'MONSTER'),
        new Enemy(450, 360, this.map, 'INVADER'),
        new Enemy(50, 360, this.map, 'INVADER'),
        new Enemy(450, 420, this.map, 'INVADER'),
        new Enemy(50, 420, this.map, 'INVADER'),
        new Enemy(250, 410, this.map, 'MONSTER'),
      ]
    case level05:
      return [
        new Enemy(450, 165, this.map, 'INVADER'),
        new Enemy(50, 165, this.map, 'INVADER'),
        new Enemy(250, 140, this.map, 'INVADER'),
        new Enemy(120, 405, this.map, 'MONSTER'),
        new Enemy(390, 405, this.map, 'MONSTER'),
        new Enemy(430, 75, this.map, 'MONSTER'),
        new Enemy(80, 75, this.map, 'MONSTER'),
      ]
    default:

  }

}

Scene.prototype.addScore = function (points) {
  this.score += points;
  if (this.score > this.highScore) {
    this.highScore = this.score;
    localStorage.setItem('highScore', this.highScore);
  }
}

Scene.prototype.drawTexts = function () {
  // Get canvas object, then its context
  const canvas = document.getElementById("game-layer");
  const context = canvas.getContext("2d");

  context.font = "20px ArcadeClassic";
  context.fillStyle = "#2dff00";
  context.fillText("Score", 40, 15);
  context.fillStyle = "White";
  context.fillText(this.score, 40, 30);

  context.fillStyle = "#0037ff";
  context.fillText("High Score", 200, 15);
  context.fillStyle = "White";
  context.fillText(this.highScore, 200, 30);

  context.fillStyle = "#00ffff";
  context.fillText("Insert", 412, 15);
  context.fillText("Coin", 430, 30);
}
