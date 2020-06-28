interface PlatformInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(): void;
}

class Platform implements PlatformInterface {
  x: number;
  y: number;
  width: number;
  height: number;
  constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    ctx.fillStyle = "transparent";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function showPlatform(platform: any): void {
  platform.draw();
}
