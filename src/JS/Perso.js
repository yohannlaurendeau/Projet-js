var allowToMove = true;


var compteur = 0;

var nextCaseX = 0*80;
var nextCaseY = 2*80;

var victoire = false;


var memoireImage = "s";

var nextLevel = 1;
var score = 0 ;

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

            var soonZ = this.y/80-1 == -1 ? 1 : this.y/80-1;
            var soonS = this.y/80+1 == 10 ? 1 : this.y/80+1;
            var soonQ = this.x/80-1 == -1 ? 1 : this.x/80-1;
            var soonD = this.x/80+1 == 10 ? 1 : this.x/80+1;

            var z = this.map.getMap()[soonZ][this.x/80];
            var s = this.map.getMap()[soonS][this.x/80];
            var q = this.map.getMap()[this.y/80][soonQ];
            var d = this.map.getMap()[this.y/80][soonD];

            if (this.keys.left && this.x > 0 && (q == 0 || q == 2 || q == 3 || q == 4 || q == 5 || q == 7)) {
                allowToMove= false;
                nextCaseX -= 800 / 10;
                nextCaseY = this.y;
                memoireImage = "q";

            } else if (this.keys.right && this.x < 720 && (d == 0 || d == 2 || d == 3 || d == 4 || d == 5 || d == 7)) {
                allowToMove= false;
                nextCaseX += 800 / 10;
                nextCaseY = this.y;
                memoireImage = "d";

            } else if (this.keys.up && this.y > 0 && (z == 0 || z == 2 || z == 3 || z == 4 || z == 5 ||z == 7)) {
                allowToMove= false;
                nextCaseY -= 800 / 10;
                nextCaseX = this.x;
                memoireImage = "z";

            } else if (this.keys.down && this.y < 720 && (s == 0 || s == 2 || s == 3 || s == 4  || s == 5 || s == 7)) {
                allowToMove= false;
                nextCaseY += 800 / 10;
                nextCaseX = this.x;
                memoireImage = "s";

            }
            if(this.map.getMap()[this.y/80][this.x/80] == 7 && (q ==7 || q ==0)){
                allowToMove = false;
                nextCaseX -= 800 /10;
                nextCaseY = this.y;

            }
            





            for (level = 1;level < 5;level++) {
                if(this.map.getMap()[this.y/80][this.x/80] == 5) {
                    this.map.getMap()[this.y / 80][this.x / 80] = 0;
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

    draw() {// time base animation dans mooc; calculer un delta
        this.ctx.save();
        // on dessine l'image d'index currentIndexImage
        //console.log(currentIndexImage);
        var sprite = 0;
        compteur ++;
        if(compteur%5 == 0) {
            if(sprite+1 > 4) {
                sprite = 0;
            }
            else {
                sprite ++;
            }

        }

        ctx.drawImage(characterSprites[currentIndexImage],this.x,this.y);
       //faire pour les directions
        compteur ++;
        if(compteur%5 == 0) {
            if(currentIndexImage+1 > 4) {
                currentIndexImage = 0;
            }
            else {
                currentIndexImage ++;
            }

        }

        if(currentIndexImage  == 4) currentIndexImage = 0;
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

function chargerImages(callback) {

    let nbImages =5;
    let nbImagesChargees = 0;

    for(var i=0; i <nbImages; i++){
        (function(j) {
            var characterImage = new Image();
            characterImage.src = "./../MEDIA/Luffy_" + memoireImage + j + ".png";
            characterImage.onload = () => {
                nbImagesChargees++;
                //console.log("image " + characterImage.src + " chargée dans index " + j);
                characterSprites[j] = characterImage;

                if (nbImagesChargees == nbImages){
                    if(callback){
                        callback();    
                    }
                } 
            }
        })(i);

    }
}