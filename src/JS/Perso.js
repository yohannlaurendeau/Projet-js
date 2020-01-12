var allowToMove = true;


var compteur = 0;

var nextCaseX = 0*40;
var nextCaseY = 2*40;

var previousCaseX;
var previousCaseY;

var victoire = false;


var memoireImage = "s";

var nextLevel = 1;
var score = 0 ;

var characterSprites = [];
let currentIndexImage = 0;

var scoreMin = 0;

class Perso{


    constructor(ctx,keys,map) {
        this.ctx = ctx;
        this.keys = keys;
        this.map = map;
        this.x = 0*40;
        this.y = 2*40;
    }


    move() {



        if(allowToMove) {

            var soonZ = this.y / 40 - 1 == -1 ? 1 : this.y / 40 - 1;
            var soonS = this.y / 40 + 1 == 15 ? 1 : this.y / 40 + 1;
            var soonQ = this.x / 40 - 1 == -1 ? 1 : this.x / 40 - 1;
            var soonD = this.x / 40 + 1 == 15 ? 1 : this.x / 40 + 1;

            var z = this.map.getMap()[soonZ][this.x / 40];
            var s = this.map.getMap()[soonS][this.x / 40];
            var q = this.map.getMap()[this.y / 40][soonQ];
            var d = this.map.getMap()[this.y / 40][soonD];

            if (this.keys.left && this.x > 0 && (q == 0 || q == 2 || q == 3 || q == 4 || q == 5 || q == 8 || q == 10)) {
                allowToMove = false;
                previousCaseX = this.x;
                previousCaseY = this.y;
                nextCaseX -= 40;
                nextCaseY = this.y;
                memoireImage = "q";

            } else if (this.keys.right && this.x < 560 && (d == 0 || d == 2 || d == 3 || d == 4 || d == 5 || d == 8 || d == 10)) {
                allowToMove = false;
                previousCaseX = this.x;
                previousCaseY = this.y;
                nextCaseX += 40;
                nextCaseY = this.y;
                memoireImage = "d";

            } else if (this.keys.up && this.y > 0 && (z == 0 || z == 2 || z == 3 || z == 4 || z == 5 || z == 8 || z == 10)) {
                allowToMove = false;
                previousCaseX = this.x;
                previousCaseY = this.y;
                nextCaseY -= 40;
                nextCaseX = this.x;
                memoireImage = "z";

            } else if (this.keys.down && this.y < 560 && (s == 0 || s == 2 || s == 3 || s == 4 || s == 5 || s == 8 || s == 10)) {
                allowToMove = false;
                previousCaseX = this.x;
                previousCaseY = this.y;
                nextCaseY += 40;
                nextCaseX = this.x;
                memoireImage = "s";

            }
            if (this.map.getMap()[this.y / 40][this.x / 40] == 7 && (q == 7 || q == 0)) {
                if (previousCaseX == (this.x + 40)) {


                    allowToMove = false;
                    nextCaseX -= 40;
                    nextCaseY = this.y;
                }


            }
            if (this.map.getMap()[this.y / 40][this.x / 40] == 7 && (d == 7 || d == 0)) {
                if (previousCaseX == (this.x - 40)) {
                    allowToMove = false;
                    nextCaseX += 40;
                    nextCaseY = this.y;
                }

            }
            if (this.map.getMap()[this.y / 40][this.x / 40] == 7 && (z == 7 || z == 0)) {
                if (previousCaseY == this.y + 40) {


                    allowToMove = false;
                    nextCaseY -= 40;
                    nextCaseX = this.x;
                }

            }
            if (this.map.getMap()[this.y / 40][this.x / 40] == 7 && (s == 7 || s == 0)) {
                if (previousCaseY == this.y - 40) {


                    allowToMove = false;
                    nextCaseY += 40;
                    nextCaseX = this.x;
                }

            }


            for (level = 1; level < 5; level++) {

                if (this.map.getMap()[this.y / 40][this.x / 40] == 8) {
                    var explosion = new Audio();
                    explosion.src = "../MEDIA/explosion.mp3";
                    explosion.play();
                    this.map.getMap()[this.y / 40][this.x / 40] = 0;
                    for (var x = 0; x < 15; x++) {
                        for (var y = 0; y < 15; y++) {
                            if (this.map.getMap()[x][y] == 9) {
                                this.map.getMap()[x][y] = 0;
                            }
                        }
                    }
                }


                if (this.map.getMap()[this.y / 40][this.x / 40] == 5) {
                    var sound4 = new Audio();
                    sound4.src = "../MEDIA/son3.mp3";
                    sound4.play();
                    this.map.getMap()[this.y / 40][this.x / 40] = 0;
                    for (var x = 0; x < 15; x++) {
                        for (var y = 0; y < 15; y++) {
                            if (this.map.getMap()[x][y] == 6) {
                                this.map.getMap()[x][y] = 2;
                            }
                        }
                    }
                }
            }
            console.log(nextLevel);
           if (nextLevel == 1){
               scoreMin = 60;
           }
           if (nextLevel == 2){
               scoreMin = 120;
           }
           if (nextLevel == 3){
               scoreMin = 400;
           }



            if (this.map.getMap()[this.y / 40][this.x / 40] == 2 && score > scoreMin) {
                console.log(scoreMin);
                console.log(score);
                var sound5 = new Audio();
                sound5.src = "../MEDIA/son4.mp3";
                sound5.play();
                nextLevel = nextLevel + 1;
                //level = level + 1;
                afficheLevel.innerHTML = "Level : " + nextLevel + "";
                this.map.addMapLevel(nextLevel);

                }




            if(this.map.getMap()[this.y/40][this.x/40] == 3){
                this.map.getMap()[this.y/40][this.x/40] = 0;
                var sound3 = new Audio();
                sound3.src = "../MEDIA/son2.mp3";
                sound3.play();
                var i = Math.round(Math.random() * 10);
                if (i == 1 || i == 2 || i == 3) {
                    score = score - 40;

                }
                else  {
                    score = score + 60;

                }
                afficheScore.innerHTML = "Score : "+score+"";


            }
            if(this.map.getMap()[this.y/40][this.x/40] == 10){
                this.map.getMap()[this.y/40][this.x/40] = 0;
                var sound3 = new Audio();
                sound3.src = "../MEDIA/son2.mp3";
                sound3.play();
                var i = Math.round(Math.random());
                if (i == 1) {
                    score = score - 100;

                }
                else  {
                    score = score + 200;

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
        compteur++;
        if (compteur % 5 == 0) {
            if (sprite + 1 > 4) {
                sprite = 0;
            } else {
                sprite++;
            }

        }

        ctx.drawImage(characterSprites[currentIndexImage], this.x, this.y);
        //faire pour les directions
        compteur++;
        if (compteur % 5 == 0) {
            if (currentIndexImage + 1 > 4) {
                currentIndexImage = 0;
            } else {
                currentIndexImage++;
            }

        }

        if (currentIndexImage == 4) currentIndexImage = 0;
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