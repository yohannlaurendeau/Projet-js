var title = document.getElementById('title');
var buttons = document.getElementsByClassName('buttons');
var soundBtn = document.getElementById('soundBtn');
var afficheScore = document.getElementById("score");


var sound = new Audio();
sound.src = "../MEDIA/pop.wav";

var nextLevel = 1;

var x = 50;
var y = 100;
var srcX;
var srcY;
var sheetWidth = 200;
var sheetHeight = 160;

var cols = 5;
var rows = 4;

var width = sheetWidth / cols;
var height = sheetHeight / rows;

var currentFrame = 0;
var currentFrame_line = 0;


class GameMap{
    constructor(ctx, map) {
        this.ctx = ctx;
        this.map2 = map;
    }

    dessinerMap(){
        //DESSINE LA MAP
        var images = this.map2;
        for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
                var monImage = new Image();
                 if (this.map2[i][j] == 0){
                    monImage.src ="./../../MEDIA/0.png";
                    monImage.src ="./../MEDIA/0.png";
                    images.push(monImage);
                    this.ctx.drawImage(monImage, j*80, i*80);
                }
                if (this.map2[i][j] == 1) {
                    monImage.src ="./../../MEDIA/1.png";
                    monImage.src ="./../MEDIA/1.png";
                    images.push(monImage);
                    //this.ctx.drawImage(monImage , j*80,i*80);
                    this.ctx.drawImage(monImage, j*80,i*80);
                }
                if (this.map2[i][j] == 2) {
                    monImage.src ="./../../MEDIA/porte.png"; ////////////////////////////////////////////////////////////
                    monImage.src ="./../MEDIA/porte.png"; ////////////////////////////////////////////////////////////
                    images.push(monImage);
                    this.ctx.drawImage(monImage, j*80,i*80);
                }
            }
        }
    }

    addMapLevel(level){
        if(level == 2){
           this.map2 = [
                [0,1,1,1,0,1,1,1,1,1],
                [0,0,1,1,0,1,1,1,1,1],
                [0,0,0,1,0,1,1,1,1,1],
                [1,1,0,0,0,1,1,1,1,1],
                [1,1,1,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0,0,1],
                [1,1,0,0,0,1,0,0,1,1],
                [1,0,0,1,1,1,1,1,1,1],
                [1,0,1,1,1,1,1,1,1,1],
                [1,2,1,1,0,0,0,1,1,1]
           ]
        }else if(level == 3){
            this.map2 = [
                [0,1,1,1,0,1,1,1,1,1],
                [0,0,1,1,0,1,1,1,1,1],
                [0,0,0,1,0,1,1,1,1,1],
                [1,1,0,0,0,1,1,1,1,1],
                [1,1,1,1,1,0,0,0,0,0],
                [1,1,1,1,1,0,0,0,0,1],
                [1,2,1,1,1,1,0,0,1,1],
                [1,0,1,1,1,1,1,1,1,1],
                [1,0,1,1,1,1,1,1,1,1],
                [1,0,1,1,0,0,0,1,1,1]
           ]
        }else{
            if (confirm("Vous avez fini le jeu !\nVoulez-vous recommencer le jeu ?")) {            	
   				init();
  			} else {
    			document.location.reload(true);
  			}
        }
        
    }

    getMap() {
        return this.map2;
    }

}



var victoire = false;


//var memoireImage = "s";
class Carre{
    constructor(ctx,keys,map) {
        this.ctx = ctx;
        this.keys = keys;
        this.map = map;
        console.log(this.map);
        this.x = x;
        this.y = y;
    }

    draw() {

        this.ctx.save();
        var character = new Image();
        character.src = "../MEDIA/Luffy_perso.png";
        updateFrame();
        ctx.drawImage(character, srcX, srcY, width, height, this.x, this.y, width, height);
        this.ctx.restore();
    }

}



function init() {
    title.style.display = 'none';
    soundBtn.style.display = 'none';
    buttons[0].style.visibility = 'hidden';
    canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    nextLevel = 1;
    level = 1;
    afficheScore.innerHTML = "Level : "+level+"";

    
    var mapJeu = [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,1,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0]
    ]

    //this.carre = new Carre(this.ctx, this.keys);
    this.carre = new Carre(this.ctx, this.keys, mapJeu);
    this.map = new GameMap(this.ctx, mapJeu);

    /*setInterval(function() {
        this.carre.draw();
    }, 30);*/
    

        
    requestAnimationFrame(anime);
}


function updateFrame() {
  //console.log("currentFrame ="+currentFrame);
  //console.log(currentFrame);
  srcX = currentFrame * width;
  srcY = currentFrame_line * height ;

}

window.onkeydown = function(e) {
  var key = e.keyCode || e.which;
  switch (key) {
    case 37:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 1 % rows;
      if(this.carre.x>0){ 
          this.carre.x = this.carre.x-5;
          ctx.clearRect(this.carre.x+5, this.carre.y, width, height);
      }else{
          console.log("touché mur gauche !");
          ctx.clearRect(this.carre.x+5, this.carre.y, width, height);
      }
      //-Move left
      break;
    case 39:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 2 % rows;

      if(this.carre.x<canvas.width-width){
        this.carre.x = this.carre.x+5;
        ctx.clearRect(this.carre.x-5, this.carre.y, width, height);
      }else{
          //console.log("touché mur droit !");
          ctx.clearRect(this.carre.x-5, this.carre.y, width, height);
      }      
      //-Move right
      break;
    case 38:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 3 % rows;
      if(this.carre.y>0) {
        this.carre.y = this.carre.y-5;
        ctx.clearRect(this.carre.x, this.carre.y+5, width, height);
      }else{
          console.log("touché mur haut !");
          ctx.clearRect(this.carre.x, this.carre.y+5, width, height);
      }
      //-Move up
      break;
    case 40:
      currentFrame = ++currentFrame % cols;
      currentFrame_line = 0 % rows;
      if(this.carre.y<canvas.height-height) {
        this.carre.y = this.carre.y+5;
        ctx.clearRect(this.carre.x, this.carre.y-5, width, height);
      }else{
          //console.log("touché mur bas !");
          ctx.clearRect(this.carre.x, this.carre.y+5, width, height);
      }
      //-Move down
      break;
    default:
      break;
  }
};

/*
function possible() {
   for(var i=0;i<10;i++){
            for(var j=0;j<10;j++){
               if(this.map.getMap()[i][j] == 1){
                  if(this.carre.x == i*80){
                    console.log(this.carre.x);
                  }
                  if(this.carre.y == j*80){
                    console.log(this.carre.y);
                  }
               }
            }
   }
}
*/


function anime() {    
    this.map.dessinerMap();
    this.carre.draw();
    //possible();
    if(victoire == false){
        requestAnimationFrame(anime);
    }

}



