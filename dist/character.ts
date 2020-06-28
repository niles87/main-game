const playerSprite = new Image();
playerSprite.src = "./media/bahamut.png";
let jumpInterval: number;

interface SpriteInterface {
  x: number;
  y: number;
  velocity: number;
  width: number;
  height: number;
  frameX: number;
  frameY: number;
  speed: number;
  weight: number;
  moving: boolean;
  draw(): void;
  update(): void;
  movePlayer(): void;
  handlePlayerFrame(): void;
  jump(): void;
}

class Sprite implements SpriteInterface {
  x: number;
  y: number;
  velocity: number;
  width: number;
  height: number;
  frameX: number;
  frameY: number;
  speed: number;
  weight: number;
  moving: boolean;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.velocity = 0;
    this.width = 96;
    this.height = 96;
    this.frameX = 0;
    this.frameY = 2;
    this.speed = 10;
    this.weight = 2;
    this.moving = false;
  }
  draw() {
    // draw image
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width * 2, this.height * 2);
    ctx.drawImage(
      playerSprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * 2,
      this.height * 2
    );
  }
  update() {
    // sprite action
    this.movePlayer();
    this.handlePlayerFrame();
  }
  movePlayer() {
    if (keys["ArrowRight"] && this.x < canvas.width - this.width * 2) {
      this.x += this.speed;
      this.frameY = 2;
      this.moving = true;
    }
    if (keys["ArrowLeft"] && this.x > 0) {
      this.x -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }
    if (keys["Space"]) {
      this.jump();
    }
  }
  handlePlayerFrame() {
    if (this.frameX < 3 && this.moving) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
  jump() {
    let milSecs = 0;
    console.log(this.y + this.height * 2);
    if (this.y + this.height * 2 > floor.y) {
      this.velocity = 0;
    } else {
      if (this.y < canvas.height / 3) {
        do {
          this.moving = true;
          this.velocity += this.weight;
          this.velocity *= 0.9;
          this.y += this.velocity;
        } while (this.y + this.height * 2 > floor.y);
      } else {
        do {
          milSecs++;
          this.moving = true;
          this.velocity -= this.weight;
          this.velocity *= 0.9;
          this.y += this.velocity;
        } while (milSecs < 5);
      }
    }
  }
}
