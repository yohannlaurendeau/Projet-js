var allowToMove = true;

var sprite = 0;

var sCompteur =0;
var nextCaseX = 0*80;
var nextCaseY = 2*80;

var victoire = false;


var memoireImage = "s";

var nextLevel = 1;
var score = 0 ;

var SPRITESHEET_URL = "https://user.oc-static.com/upload/2018/04/21/15243188314387_Luffy.png";


var characterSprites = [];
let currentIndexImage = 0;

class Perso{


    constructor(ctx,keys,map) {
        this.ctx = ctx;
        this.keys = keys;
        this.map = map;
        this.x = 0*80;
        this.y = 2*80;
    }


    move() {


        if(allowToMove) {
            sprite = 0;
            var soonZ = this.y/80-1 == -1 ? 1 : this.y/80-1;
            var soonS = this.y/80+1 == 10 ? 1 : this.y/80+1;
            var soonQ = this.x/80-1 == -1 ? 1 : this.x/80-1;
            var soonD = this.x/80+1 == 10 ? 1 : this.x/80+1;

            var z = this.map.getMap()[soonZ][this.x/80];
            var s = this.map.getMap()[soonS][this.x/80];
            var q = this.map.getMap()[this.y/80][soonQ];
            var d = this.map.getMap()[this.y/80][soonD];

            if (this.keys.left && this.x > 0 && (q == 0 || q == 2 || q == 3 || q == 4 || q == 5)) {
                allowToMove= false;
                nextCaseX -= 800 / 10;
                nextCaseY = this.y;
                memoireImage = "q";

            } else if (this.keys.right && this.x < 720 && (d == 0 || d == 2 || d == 3 || d == 4 || d == 5)) {
                allowToMove= false;
                nextCaseX += 800 / 10;
                nextCaseY = this.y;
                memoireImage = "d";
            }
            if (this.keys.up && this.y > 0 && (z == 0 || z == 2 || z == 3 || z == 4 || z == 5)) {
                allowToMove= false;
                nextCaseY -= 800 / 10;
                nextCaseX = this.x;
                memoireImage = "z";

            } else if (this.keys.down && this.y < 720 && (s == 0 || s == 2 || s == 3 || s == 4  || s == 5)) {
                allowToMove= false;
                nextCaseY += 800 / 10;
                nextCaseX = this.x;
                memoireImage = "s";

            }
            for (level = 1;level < 5;level++) {
                if(this.map.getMap()[this.y/80][this.x/80] == 5) {
                    this.map.getMap()[this.y / 80][this.x / 80] = 0;
                    console.log(level);
                    for (var x = 0; x < 10; x++) {
                        for (var y = 0; y < 10; y++) {
                            if (this.map.getMap()[x][y] == 6) {
                                this.map.getMap()[x][y] = 2;
                            }
                        }
                    }
                }
            }

            if (this.map.getMap()[this.y/80][this.x/80] == 2){
                nextLevel = nextLevel + 1;
                //level = level + 1;
                afficheLevel.innerHTML = "Level : "+nextLevel+"";
                this.map.addMapLevel(nextLevel);
            }
            if(this.map.getMap()[this.y/80][this.x/80] == 3){
                this.map.getMap()[this.y/80][this.x/80] = 0;
                var i = Math.round(Math.random());
                console.log(i);
                if (i == 1) {
                    score = score - 40;

                }
                else  {
                    score = score + 60;

                }
                afficheScore.innerHTML = "Score : "+score+"";


            }


        }
        else {




            if (memoireImage == "q") {
                this.x -= 2;

            } else if (memoireImage== "d") {
                this.x += 2;
            }

            if (memoireImage == "z") {
                this.y -= 2;

            } else if (memoireImage == "s") {
                this.y += 2;
            }
            if(this.x == nextCaseX && this.y == nextCaseY){
                allowToMove = true;
            }

        }
        //Tentative de piege ou piece

        // Condition de victoire


    }







    draw(time) {// time base animation dans mooc; calculer un delta
        this.ctx.save();
        // on dessine l'image d'index currentIndexImage


        //character.style.filter = "brightness(50%)";

        //processLight(this, this.ctx);
        this.ctx.restore();
    }
}

function bindKeyboard() {
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowDown': {
                this.keys.down = true;
                break;
            }
            case 'ArrowUp': {
                this.keys.up = true;
                break;
            }
            case 'ArrowLeft': {
                this.keys.left = true;
                break;
            }
            case 'ArrowRight': {
                this.keys.right = true;
                break;
            }
        }

    }, true);

    window.addEventListener('keyup', e => {
        switch (e.key) {
            case 'ArrowDown': {
                this.keys.down = false;
                break;
            }
            case 'ArrowUp': {
                this.keys.up = false;
                break;
            }
            case 'ArrowLeft': {
                this.keys.left = false;
                break;
            }
            case 'ArrowRight': {
                this.keys.right = false;
                break;
            }
        }

    });
}

var spritesheet;
spritesheet = new Image();
spritesheet.src = SPRITESHEET_URL;


function SpriteImage(img,x,y,width,height){
    this.img = img;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.draw = function(ctx,xPos,yPos){
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height,xPos,yPos);
    };
}






