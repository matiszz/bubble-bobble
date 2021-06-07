function drawButton(btnX, btnY, btnW, btnH, text, onClick) {
  const canvas = document.getElementById("game-layer");
  const context = canvas.getContext("2d");

  const rectangle = {x: btnX, y: btnY, width: btnW, height: btnH};
  const clickSound = AudioFX('sounds/click.mp3');

  // Todo: PREGUNTAR PROFE
  canvas.addEventListener('mouseup', (evt) => {
    evt.preventDefault();
    const mousePos = getMousePos(canvas, evt);
    let hasClicked = false;

    if (isInside(mousePos, rectangle) && !hasClicked) {
      hasClicked = true;
      clickSound.play();
      // console.log('play')
      onClick();
    }
  }, false);

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
  return Math.floor(Math.random() * (max + 1)) + min;
}

function randomFloat(min, max) {
  return Math.random() * max + min;
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