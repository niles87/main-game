"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const first = new Platform({ x: 0, y: canvas.height - 20, width: canvas.width, height: 20 });
first.width = canvas.width;
const background = new Image();
background.src = "./media/bg.png";
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width + 2,
    height: canvas.height,
};
function handleBackground() {
    ctx.drawImage(background, BG.x1 - 2, BG.y, BG.width, BG.height);
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    showPlatform(first);
    requestAnimationFrame(animate);
}
animate();
