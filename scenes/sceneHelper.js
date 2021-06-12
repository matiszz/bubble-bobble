const FALLING_SPEED = 5;

function drawButton(btnX, btnY, btnW, btnH, text, onClick, sceneCondition) {
  const canvas = document.getElementById("game-layer");
  const rectangle = {x: btnX, y: btnY, width: btnW, height: btnH};
  const clickSound = AudioFX('sounds/click.mp3');

  canvas.addEventListener('mouseup', (evt) => {
    const mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos, rectangle) && sceneCondition()) {
      clickSound.play();
      onClick();
    }
  }, false);

  return function () {
    const canvas = document.getElementById("game-layer");
    const context = canvas.getContext("2d");
    context.beginPath();

    context.rect(btnX, btnY, btnW, btnH);
    context.fillStyle = '#baffa7';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#000000';
    context.stroke();

    context.font = '15px ArcadeClassic';
    context.fillStyle = '#404040';
    const margin = (btnW - text.length * 5 * 1.6) / 2
    context.fillText(text, btnX + margin, btnY + 21);
  }
}

function getMousePos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return Math.random() * (max - min + 1) + min - 1;
}

function getLevel(number) {
  switch (number) {
    case 1:
      return level01;
    case 2:
      return level02;
    case 3:
      return level03;
    case 4:
      return level04;
    case 5:
      return level05;
  }
}