window.onload = init;
let canvas;

var x = 50;
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
  }, 105);
}

function updateFrame() {
  console.log("currentFrame ="+currentFrame);
  console.log(currentFrame);
  srcX = currentFrame * width;
  srcY =currentFrame_line * height ;

  ctx.clearRect(x, y, width, height);
}

window.onkeydown = function(e) {
  var key = e.keyCode || e.which;
  switch (key) {
    case 37:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 1 % rows;
      if(x>0){
          x--; }
      else {
        x=0;
      }
      //-Move left
      break;
    case 39:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 2 % rows;
      x++;
      //-Move right
      break;
    case 38:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 3 % rows;
      if(y>0) {
        y--;
      }
      else {
        y=0;
      }
      //-Move up
      break;
    case 40:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 0 % rows;
      y++;
      //-Move down
      break;
    default:
      break;
  }
};

function drawImg() {
  updateFrame();
  ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height);
}







/*window.onload = init;
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
*/
