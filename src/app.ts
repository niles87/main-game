const canvas: any = document.getElementById("canvas");
const ctx: any = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pressedEnter: boolean = false;
let keys: any = [];
let gameSpeed = 10;
let fps: number, fpsInterval: number, startTime: number, now: number, then: number, elapsed: number;

const sprite = new Sprite();

const background = new Image();
background.src = "./media/bg.png";
const backDrop = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width + 5,
  height: canvas.height,
};

function handleBackground(): void {
  if (keys["ArrowRight"] && sprite.x > 350) {
    if (backDrop.x1 <= -backDrop.width + gameSpeed + 2) backDrop.x1 = backDrop.width;
    else backDrop.x1 -= gameSpeed - 2;
    if (backDrop.x2 <= -backDrop.width + gameSpeed + 2) backDrop.x2 = backDrop.width;
    else backDrop.x2 -= gameSpeed - 2;
  }
  // ctx.drawImage(background, BG.x1 - 2, BG.y, BG.width, BG.height);
  // ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function startAnimating(fps: number): void {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate(): void {
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // handleBackground();
    ctx.drawImage(background, backDrop.x1 - 2, backDrop.y, backDrop.width, backDrop.height);
    ctx.drawImage(background, backDrop.x2, backDrop.y, backDrop.width, backDrop.height);
    //   showPlatform(floor);
    sprite.draw();
    if (pressedEnter === false) {
      // do not allow character to move until enter is pressed
      ctx.font = "40px Georgia";
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#000";
      ctx.fillText("Press enter to start", canvas.width / 2.5, canvas.height / 2);
      ctx.strokeText("Press enter to start", canvas.width / 2.5, canvas.height / 2);
      ctx.fill();
      ctx.stroke();
    } else {
      handleBackground();
      sprite.update();
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("keydown", function (e: any): void {
  if (e.code === "Enter") pressedEnter = true;
  else if (e.code !== "Enter") keys[e.code] = true;
});

window.addEventListener("keyup", function (e: any): void {
  delete keys[e.code];
  if (!sprite.jumping) {
    sprite.moving = false;
  }
  sprite.moving = false;
});

startAnimating(25);
