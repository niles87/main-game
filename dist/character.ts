const playerSprite = new Image();
playerSprite.src = "./media/spritesheet.png";

interface SpriteInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  frameX: number;
  draw(): void;
  update(): void;
}

class Sprite implements SpriteInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  frameX: number;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 363;
    this.height = 483;
    this.frameX = 10;
  }
  draw() {
    // draw image
  }
  update() {
    // sprite action
  }
}
