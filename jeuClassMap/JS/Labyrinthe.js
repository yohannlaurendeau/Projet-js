var title = document.getElementById('title');
var buttons = document.getElementsByClassName('buttons');
var soundBtn = document.getElementById('soundBtn');
var afficheLevel = document.getElementById("level");
var afficheScore = document.getElementById("score");

var sound = new Audio();
sound.src = "../MEDIA/pop.wav";

var nextLevel = 1;
var score = 0 ;
var piege = 0 ;
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
                monImage.src ="./../MEDIA/"+this.map2[i][j]+".png";
                images.push(monImage);
                this.ctx.drawImage(monImage, j*80,i*80);
               	
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


var memoireImage = "s";

class Perso{
    constructor(ctx,keys,map) {
        this.ctx = ctx;
        this.keys = keys;
        this.map = map;
        this.x = 0*80;
        this.y = 2*80;
    }

    move() {
        var soonZ = this.y/80-1 == -1 ? 1 : this.y/80-1;
        var soonS = this.y/80+1 == 10 ? 1 : this.y/80+1;
        var soonQ = this.x/80-1 == -1 ? 1 : this.x/80-1;
        var soonD = this.x/80+1 == 10 ? 1 : this.x/80+1;

        
        var z = this.map.getMap()[soonZ][this.x/80];
        var s = this.map.getMap()[soonS][this.x/80];
        var q = this.map.getMap()[this.y/80][soonQ];
        var d = this.map.getMap()[this.y/80][soonD];


        if (this.keys.left && this.x >0 && (q == 0 || q == 2 || q == 3 || q == 4)) {
            this.x -= 800/10;
            memoireImage = "q";
            this.keys.left = false;
        } else if (this.keys.right && this.x <720 && (d == 0 || d == 2 || d == 3 || d == 4)) {
            this.x += 800/10;
            memoireImage = "d";
            this.keys.right = false;
        }
        if (this.keys.up && this.y >0 && (z == 0 || z == 2 || z == 3 || z == 4)) {
            this.y -= 800/10;
            memoireImage = "z";
            this.keys.up = false;
        } else if (this.keys.down && this.y <720 && (s == 0 || s == 2 || s == 3 || s == 4)) {
            this.y += 800/10;
            memoireImage = "s";
            this.keys.down = false;
        }
        //Tentative de piege ou piece
       
        // Condition de victoire
        if (this.map.getMap()[this.y/80][this.x/80] == 2){
           nextLevel = nextLevel + 1;
           level = level + 1;
           afficheLevel.innerHTML = "Level : "+level+"";
           this.map.addMapLevel(nextLevel);
        }
        if(this.map.getMap()[this.y/80][this.x/80] == 3){
            this.map.getMap()[this.y/80][this.x/80] = 0;
	       score = score + 40;
	       afficheScore.innerHTML = "Score : "+score+"";

        	}
        if(this.map.getMap()[this.y/80][this.x/80] == 4){
            this.map.getMap()[this.y/80][this.x/80] = 0;
            score = score - 40;
            afficheScore.innerHTML = "Score : "+score+"";

        }

        }


    


    draw() {

        this.ctx.save();
        var character = new Image();
        character.src ="./../MEDIA/Luffy_"+memoireImage+".png";

        //character.style.filter = "brightness(50%)";
        ctx.drawImage(character,this.x,this.y);
        //processLight(this, this.ctx);
        this.ctx.restore();
    }
}

class Monstre {
	constructor(ctx,map){
		this.ctx = ctx;
		this.map = map;
		this.x = 5*80;
		this.y = 6*80;


	}
	move(){		
        if (this.x >= 220 ){
        	this.x += 800/10;

            	
        }else if (this.x =< 580){
        	this.x -= 800/10;
        }



            
            
           
       



	}
	draw(){
		this.ctx.save();
		ctx.fillRect(80,80,this.x*80,this.y*80);
		this.ctx.restore();
	}
}


function init() {
    title.style.display = 'none';
    soundBtn.style.display = 'none';
    buttons[0].style.visibility = 'hidden';
    canvas = document.querySelector('#canvas') ;
    this.ctx = canvas.getContext('2d') ;
    nextLevel = 1;
    level = 1;
    afficheLevel.innerHTML = "Level : "+level+"";
    score = 0;
    afficheScore.innerHTML = "Score :"+score+"";


    this.keys = {
        down: false,
        up: false,
        left: false,
        right: false
    };
    this.bindKeyboard();

    var mapJeu = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,3,1,1,1,1,1,1,1,1],
            [0,0,0,1,1,1,1,1,1,1],
            [1,1,0,0,1,1,1,1,1,1],
            [1,1,1,4,1,0,0,0,0,2],
            [1,1,0,0,0,0,3,0,4,1],
            [1,1,3,0,4,1,0,3,1,1],
            [1,3,0,1,1,1,1,1,1,1],
            [1,0,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1]
    ]

    this.map = new GameMap(this.ctx, mapJeu);

    this.perso = new Perso(this.ctx, this.keys, this.map);

    
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


/*const processLight = async (player, context) => {
    const nbCouches = 3;
    var coucheNumberY = nbCouches;
    var coucheNumberX = nbCouches;
    var revertY = false;
    var revertX = false;
    -2 -1 0 1 2
    for(let i = -1 * nbCouches; i <= nbCouches; i++) {  
        revertY = false;        
        coucheNumberY = nbCouches;              
        for(let j = -1 * nbCouches; j <= nbCouches; j++){            
            const pixels = context.getImageData(player.x + i * 64, player.y + j * 64, 64, 64);
            var d = pixels.data;
            for (var p = 0; p < d.length; p+=4) {
                const newValue = 80 - coucheNumberY * 8 - coucheNumberX * 8;
                if(newValue > d[p] || newValue > d[p + 1] || newValue > d[p + 2] ) {
                    d[p] += newValue;
                    d[p+1] += newValue;
                    d[p+2] += newValue;
                }
                                       
            }    
            context.putImageData(pixels, player.x + i * 64, player.y + j * 64);            
            
            if(coucheNumberY == 0) {
                revertY = true;
            }            
            
            if(revertY) {
                coucheNumberY++;
            }else {
                coucheNumberY--;
            }                                       
        }

        if(coucheNumberX == 0) {
            revertX = true;
        }

        if(revertX) {
            coucheNumberX++;
        }else {
            coucheNumberX--;
        } 
    }
}*/



function anime() {		
    this.map.dessinerMap();
    this.perso.move();
    this.perso.draw();
    if(victoire == false){
        requestAnimationFrame(anime);
    }

}



