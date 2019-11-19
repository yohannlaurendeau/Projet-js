var title = document.getElementById('title');
var buttons = document.getElementsByClassName('buttons');
var soundBtn = document.getElementById('soundBtn');

var sound = new Audio();
sound.src = "https://felgo.com/web-assets/pop.wav";

var map = [
    [1,1,0,1,1,1,1,1,1,1], // 0 signifie case ou on peut se deplacer et 1 case "interdite"
    [1,0,0,1,1,1,1,0,0,1],
    [1,1,0,0,1,0,0,0,1,1],
    [1,1,1,0,0,0,0,1,1,1],
    [1,1,1,1,1,0,0,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,0,0,0,1,1,1],
    [1,1,1,1,0,0,0,1,1,1],
    [1,1,1,1,0,0,1,1,1,1],
    [1,1,1,1,2,1,1,1,1,1]
]

var victoire = false;

class Carre{
    constructor(ctx,keys) {
        this.ctx = ctx;
        this.keys = keys;
        this.x = 0*80;
        this.y = 2*80;
    }

    move() {
        var soonZ = this.y/80-1 == -1 ? 1 : this.y/80-1;
        var soonS = this.y/80+1 == 10 ? 1 : this.y/80+1;
        var soonQ = this.x/80-1 == -1 ? 1 : this.x/80-1;
        var soonD = this.x/80+1 == 10 ? 1 : this.x/80+1;

        var z = map[this.x/80][soonZ];
        var s = map[this.x/80][soonS];
        var q = map[soonQ][this.y/80];
        var d = map[soonD][this.y/80];


        if (this.keys.left && this.x >0 && (q == 0 || q == 2)) {
            this.x -= 800/10;
            this.keys.left = false;
        } else if (this.keys.right && this.x <720 && (d == 0 || d == 2)) {
            this.x += 800/10;
            this.keys.right = false;
        }
        if (this.keys.up && this.y >0 && (z == 0 || z == 2)) {
            this.y -= 800/10;
            this.keys.up = false;
        } else if (this.keys.down && this.y <720 && (s == 0 || s == 2)) {
            this.y += 800/10;
            this.keys.down = false;
        }

        // Condition de victoire
        if (map[this.x/80][this.y/80] == 2){
        	console.log("Victoire");
            victoire = true;
        }


    }

    draw() {

        this.ctx.save();
        // CORPS DU PERSO
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.x, this.y, 80, 80);
        this.ctx.restore();
    }
}


function dessinerMap(){
    //DESSINE LA MAP
    var images = map;
    console.log("hihi");
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            var monImage = new Image();

            if (map[j][i] == 0){
                monImage.src ="./Images/0.png";
                images.push(monImage);
                this.ctx.drawImage(monImage, j*80, i*80);
            }
            else {
                monImage.src ="./Images/1.png";
                images.push(monImage);

                this.ctx.drawImage(monImage, j*80,i*80);
            }
        }
    }
}

function init() {
    title.style.display = 'none';
    soundBtn.style.display = 'none';
    buttons[0].style.visibility = 'hidden';
    canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');


    this.keys = {
        down: false,
        up: false,
        left: false,
        right: false
    };
    this.bindKeyboard();

    this.carre = new Carre(this.ctx, this.keys);

    requestAnimationFrame(anime);
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


function anime() {

    this.dessinerMap();
    this.carre.move();
    this.carre.draw();
    if(victoire == false){
        requestAnimationFrame(anime);
    }

}



