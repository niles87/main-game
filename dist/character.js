"use strict";
const playerSprite = new Image();
playerSprite.src = "./media/bahamut.png";
class Sprite {
    constructor() {
        this.x = 400;
        this.y = canvas.height;
        this.vel_x = 0;
        this.vel_y = 0;
        this.width = 96;
        this.height = 96;
        this.frameX = 0;
        this.frameY = 2;
        this.moving = false;
        this.jumping = false;
    }
    draw() {
        ctx.drawImage(playerSprite, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y - this.height, this.width * 1.5, this.height * 1.5);
    }
    update() {
        this.move();
        this.handleFrame();
    }
    move() {
        if (keys["ArrowRight"]) {
            if (this.x < 400) {
                this.vel_x += 2;
            }
            this.frameY = 2;
            this.moving = true;
        }
        if (keys["ArrowLeft"]) {
            this.vel_x -= 3;
            this.frameY = 1;
            this.moving = true;
        }
        if (keys["Space"] && !this.jumping) {
            this.vel_y -= 140;
            this.jumping = true;
            this.moving = true;
        }
        this.vel_y += 10;
        this.x += this.vel_x;
        this.y += this.vel_y;
        this.vel_x *= 0.8;
        this.vel_y *= 0.8;
        if (this.y > canvas.height - 50) {
            this.jumping = false;
            this.y = canvas.height - 50;
            this.vel_y = 0;
        }
    }
    handleFrame() {
        if (this.frameX < 3 && this.moving) {
            this.frameX++;
        }
        else {
            this.frameX = 0;
        }
    }
    jump() { }
}
