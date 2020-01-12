var title = document.getElementById('title');
var affichage = document.getElementById('affichage');
var buttonsDiv = document.getElementsByClassName('buttonsDiv');
var afficheLevel = document.getElementById("level");
var afficheScore = document.getElementById("score");
var soundButton = document.getElementById("sound");

var sound = new Audio();
sound.src = "../MEDIA/pop.wav";

var sound2 = new Audio();
sound2.src = "../MEDIA/son.mp3";


class GameMap {
    constructor(ctx, map) {
        this.ctx = ctx;
        this.map2 = map;
    }

    dessinerMap() {
        //DESSINE LA MAP
        var images = this.map2;
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                var monImage = new Image();
                monImage.src = "./../MEDIA/" + this.map2[i][j] + ".png";
                images.push(monImage);
                this.ctx.drawImage(monImage, j * 80, i * 80);

            }
        }
    }


    addMapLevel(level) {
        if (level == 2) {
            this.map2 = [
                [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                [0, 0, 1, 1, 5, 1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 0, 7, 7, 7, 7, 7, 0, 1],
                [1, 1, 0, 0, 0, 1, 0, 0, 1, 1],
                [1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 6, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 0, 0, 0, 1, 1, 1]
            ]
        } else if (level == 3) {
            this.map2 = [
                [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                [0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
                [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 6],
                [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
                [1, 5, 1, 1, 1, 1, 0, 0, 1, 1],
                [1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
                [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 0, 0, 0, 1, 1, 1]
            ]
        }
        else if (level == 4){
            var i = Math.round(Math.random() * 3);
            if (i == 0){
                this.map2 = [
                    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
                    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 0, 0, 0, 0, 6],
                    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
                    [1, 5, 1, 1, 1, 1, 0, 0, 1, 1],
                    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
                    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1]
                ]
            }
            if (i == 1){
                this.map2 = [
                    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
                    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 0, 0, 0, 0, 6],
                    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
                    [1, 5, 1, 1, 1, 1, 0, 0, 1, 1],
                    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
                    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1]
                ]
            }
            else {
                this.map2 = [
                    [0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
                    [0, 0, 1, 1, 0, 1, 1, 1, 1, 1],
                    [0, 0, 0, 1, 0, 1, 1, 1, 1, 1],
                    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 0, 0, 0, 0, 6],
                    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
                    [1, 5, 1, 1, 1, 1, 0, 0, 1, 1],
                    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1],
                    [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
                    [1, 0, 1, 1, 0, 0, 0, 1, 1, 1]
                ]

            }



        }
            else
         {
            var endGame = prompt("Vous avez fini le jeu !\nVeuillez entrer votre nom ?");
            if (endGame) {
                sessionStorage.setItem('nomJoueur', endGame);
                sessionStorage.setItem('scoreJoueur', score);
                document.location.reload();
            }

        }
    }

    getMap() {
        return this.map2;
    }

}

function highScore(){
    //Mettre ici l'affichage de mon array 
    title.innerHTML = 'Your current score';
    title.style.left = '215px';
    buttonsDiv[0].style.visibility = 'hidden';

    var afficheNom = document.createElement("p");
    afficheNom.setAttribute("id","nom");

    if (sessionStorage.getItem('nomJoueur') && sessionStorage.getItem('scoreJoueur')){
        //Restauration du contenu du champ        
        afficheNom.innerHTML= sessionStorage.getItem('nomJoueur') + " : " + sessionStorage.getItem('scoreJoueur');
        document.body.appendChild(afficheNom);        
    }

    var btnRetour = document.createElement("BUTTON");
    btnRetour.innerHTML = "Retour";
    btnRetour.setAttribute("id", "btnRetour");
    btnRetour.onclick = function () {
        buttonsDiv[0].style.visibility = 'visible';
        afficheNom.style.visibility = 'hidden';
        title.innerHTML = 'Adventure game !';
        btnRetour.style.visibility = 'hidden'; 
        sound.play();
    };
    document.body.appendChild(btnRetour);
}


function start() {
    title.style.display = 'none';
    buttonsDiv[0].style.visibility = 'hidden';
    canvas = document.querySelector('#canvas') ;
    this.ctx = canvas.getContext('2d') ;
    nextLevel = 1;
    level = 1;
    afficheLevel.innerHTML = "Level : "+level+"";
    score = 0;
    afficheScore.innerHTML = "Score : "+score+"";


    this.keys = {
        down: false,
        up: false,
        left: false,
        right: false
    };
    this.bindKeyboard();

    var mapJeu = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,5,1,1,1,1,1,1,1,1],
        [0,0,0,1,1,1,1,1,1,1],
        [1,1,0,0,1,1,1,1,1,1],
        [1,1,1,3,1,0,0,0,0,6],
        [1,1,0,0,0,0,3,0,3,1],
        [1,1,3,0,3,1,0,3,1,1],
        [1,3,0,1,1,1,1,1,1,1],
        [1,0,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
    ]

    this.map = new GameMap(this.ctx, mapJeu);

    this.perso = new Perso(this.ctx, this.keys, this.map);

    this.monstre = new Monstre(this.ctx,this.map);

    requestAnimationFrame(anime);
}

function init() {
    // on ne demarre que quand tout est chargé
    chargerImages(start);
    chargerImagesMonstre(start);

    sound2.loop=true;
    sound2.play();

}

function soundGestion(){
    var r = confirm("Voulez-vous désactiver le son ? Appuyez sur 'Annuler' pour réactiver le son");
    if (r == true) {
        sound2.pause();
    } else {
        sound2.play();
    }
}



function anime() {
    this.map.dessinerMap();
    this.perso.move();
    this.perso.draw();
    chargerImages();
    chargerImagesMonstre();
    this.monstre.move();
    this.monstre.draw();

    if(victoire == false){
        requestAnimationFrame(anime);

    }

}










