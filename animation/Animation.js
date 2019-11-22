window.onload = init;
let canvas;

var x = 100;
var y = 100;
var srcX;
var srcY;
//364x42
var sheetWidth = 200;
var sheetHeight = 160;

var cols = 5;
var rows = 4;

var width = sheetWidth / cols;
var height = sheetHeight / rows;

var currentFrame = 0;
var currentFrame_line = 0;

var character = new Image();
character.src = "Luffy_perso.png";

function init() {
  canvas = document.getElementById("Canvas");
  ctx = canvas.getContext("2d");

  setInterval(function() {
    drawImg();
  }, 200);
}

function updateFrame() {
  console.log("currentFrame ="+currentFrame);

  currentFrame = ++currentFrame % cols;
  currentFrame_line = 3 % rows;
  console.log(currentFrame);
  srcX = currentFrame * width;
  srcY =currentFrame_line * height ;

  ctx.clearRect(x, y, width, height);
}

function drawImg() {
  updateFrame();
  ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}
