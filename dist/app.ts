const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pressedEnter: boolean = false;
let keys: any = [];
let fps: number, fpsInterval: number, startTime: number, now: number, then: number, elapsed: number;

const floor = new Platform({ x: 0, y: canvas.height - 20, width: canvas.width, height: 20 });
floor.width = canvas.width;

const player = new Sprite();
player.x = 150;
player.y = canvas.height - (player.height * 2 + floor.height);

const background = new Image();
background.src = "./media/bg.png";
const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width + 2,
  height: canvas.height,
};

function handleBackground(): void {
  ctx.drawImage(background, BG.x1 - 2, BG.y, BG.width, BG.height);
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
    handleBackground();
    showPlatform(floor);
    player.draw();
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
      player.update();
    }
  }

  requestAnimationFrame(animate);
}

window.addEventListener("keydown", function (ev: any): void {
  if (ev.code === "Enter") pressedEnter = true;
  else if (ev.code !== "Enter") {
    keys[ev.code] = true;
  }
});

window.addEventListener("keyup", function (ev: any): void {
  delete keys[ev.code];

  player.moving = false;
});

startAnimating(20);
