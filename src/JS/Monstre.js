var memoireImageMonstre ="s";
var characterSpritesMonstre = [];
let currentIndexImageMonstre = 0;
class Monstre {
    constructor(ctx, map) {
        this.ctx = ctx;
        this.map = map;
        this.x = 7 * 40;
        this.y = 5 * 450;
    }

    move() {

        var soonZ = this.y / 40 - 1 == -1 ? 1 : this.y / 40 - 1;
        var soonS = this.y / 40 + 1 == 15 ? 1 : this.y / 40 + 1;
        var soonQ = this.x / 40 - 1 == -1 ? 1 : this.x / 40 - 1;
        var soonD = this.x / 40 + 1 == 15 ? 1 : this.x / 40 + 1;

        var z = this.map.getMap()[soonZ][this.x / 40];
        var s = this.map.getMap()[soonS][this.x / 40];
        var q = this.map.getMap()[this.y / 40][soonQ];
        var d = this.map.getMap()[this.y / 40][soonD];

        var random = Math.round(Math.random() * 2);

        var Parcoursx;
        var Parcoursy;

        Parcoursx++;
        Parcoursy++;
        if (random == 0) {
            if (Parcoursx%5 == 0) {
                if (this.x > 0 && (q == 0 || q == 3 || q == 4 || q == 5)) {
                    this.x -= 40;
                    memoireImageMonstre = "q";
                }
            }
            else if(Parcoursx%10 == 0){
                if (this.x < 1120 && (d == 0 || d == 3 || d == 4 || d== 5)) {
                    this.x += 40;
                    memoireImageMonstre = "d";
                }

            }
            else{
                this.x = this.x;
            }
        }

        if (random == 1) {
            if (Parcoursy%10 == 0){
                if (this.y > 0 && (z == 0 || z == 3 || z == 4 || z == 5)) {
                    this.y -= 40;
                    memoireImageMonstre = "z";
                }
                if (Parcoursy%5 == 0){
                    if (this.y < 1120 && (s == 0 || s == 3 || s == 4 || s == 5)) {
                        this.y += 40;
                        memoireImageMonstre = "*s";
                    }

                }
                else{
                    this.y = this.y;
                }
            }

        }

    }

    draw() {
        this.ctx.save();
        var sprite = 0;
        compteur ++;
        if(compteur%10 == 0) {
            if(sprite+1 > 4) {
                sprite = 0;
            }
            else {
                sprite ++;
            }

        }
        ctx.drawImage(characterSpritesMonstre[currentIndexImageMonstre],this.x,this.y);
        //faire pour les directions
        compteur ++;
        if(compteur%10 == 0) {
            if(currentIndexImageMonstre+1 > 4) {
                currentIndexImageMonstre = 0;
            }
            else {
                currentIndexImageMonstre ++;
            }

        }

        if(currentIndexImageMonstre  == 4) currentIndexImageMonstre = 0;
        this.ctx.restore();

    }


}
function chargerImagesMonstre(callback){
    let nbImagesMonstre =4;
    let nbImagesChargeesMonstre = 0;
    for(var i=0; i <nbImagesMonstre; i++){
        (function(j) {
            var characterImageMonstre = new Image();
            characterImageMonstre.src = "./../MEDIA/monstre_" + memoireImage + j + ".png";
            characterImageMonstre.onload = () => {
                nbImagesChargeesMonstre++;
                //console.log("image " + characterImage.src + " chargée dans index " + j);
                characterSpritesMonstre[j] = characterImageMonstre;

                if (nbImagesChargeesMonstre == nbImagesMonstre){
                    if(callback){
                        callback();
                    }
                }
            }
        })(i);

    }
}

