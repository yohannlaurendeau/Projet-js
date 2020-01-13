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
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                var monImage = new Image();
                monImage.src = "./../MEDIA/" + this.map2[i][j] + ".png";
                images.push(monImage);
                this.ctx.drawImage(monImage, j * 40, i * 40);

            }
        }
    }


    addMapLevel(level) {
        if (level == 2 ) {
            this.map2 = [
                [1,6,1,1,1,1,10,1,1,1,1,1,1,1,1],
                [1,0,1,1,1,1,0,0,0,1,1,0,0,3,1],
                [0,0,0,0,3,1,0,1,0,1,1,0,1,1,1],
                [1,1,0,0,0,0,0,1,0,1,0,0,1,1,1],
                [1,1,0,3,1,1,1,0,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,1,0,0,0,1,1,1,0,0],
                [1,0,0,0,3,1,0,3,1,1,0,0,0,0,1],
                [1,3,0,1,1,1,1,1,1,1,0,0,0,0,1],
                [1,0,0,1,10,1,1,1,1,1,1,0,1,0,1],
                [1,1,0,1,0,1,0,3,1,1,1,0,1,0,1],
                [1,0,0,1,0,1,0,0,1,1,1,0,3,0,1],
                [1,9,1,1,0,0,0,0,0,0,0,0,1,0,1],
                [1,10,0,1,0,1,0,1,0,1,0,0,1,0,1],
                [1,0,5,1,8,1,1,1,3,1,0,0,0,3,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]
        } else if (level == 3) {
            this.map2 = [
                [0,0,0,0,0,0,0,0,1,10,0,3,0,0,0],
                [0,1,1,1,1,1,1,0,1,1,0,1,0,1,0],
                [0,0,3,1,1,1,0,0,0,0,0,1,0,1,1],
                [1,1,1,1,1,1,1,1,0,1,1,0,0,0,0],
                [1,1,1,1,1,1,1,10,0,1,1,1,1,1,0],
                [1,1,1,10,1,1,1,1,0,1,1,1,1,1,8],
                [1,3,0,0,1,1,10,0,0,0,0,0,0,0,1],
                [1,1,0,1,1,1,1,1,1,1,0,0,0,0,1],
                [3,0,0,1,1,1,1,1,1,1,1,0,1,0,1],
                [1,1,0,1,0,1,0,1,1,1,1,0,1,0,1],
                [1,0,0,0,0,1,0,0,1,1,1,9,1,0,1],
                [1,1,1,1,0,0,0,0,0,0,0,0,1,0,1],
                [1,1,0,1,5,1,3,1,0,1,0,0,1,6,1],
                [1,0,1,1,1,1,1,1,1,1,0,0,3,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ]
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

function instructions(){
    title.innerHTML = 'Comment jouer ?';
    title.style.left = '190px';
    buttonsDiv[0].style.visibility = 'hidden';

    var afficheRegles = document.createElement("p");
    afficheRegles.setAttribute("id","regles");
    afficheRegles.innerHTML = "Le but est simple, vous devez obtenir à travers ce labyrinthe<br/> le meilleur score possible en marchant sur les cases '?' et '!'.<br/><br/>Mais attention ! Les case '?' et '!' peuvent être des cases pièges<br/> vous faisant diminuer le score.<br/><br/>Pour passer les différents niveaux,vous devez détruire la pierre<br/> bloquant le passage à la clé qui permettra l'ouverture de la porte.<br/><br/><b>Le choix des cases est vôtre, bonne aventure !</b>";
    document.body.appendChild(afficheRegles);

    var btnRetour = document.createElement("BUTTON");
    btnRetour.innerHTML = "Retour";
    btnRetour.setAttribute("id", "btnRetour");
    btnRetour.onclick = function () {
        buttonsDiv[0].style.visibility = 'visible';
        afficheRegles.style.visibility = 'hidden';
        title.innerHTML = 'Adventure game !';
        btnRetour.style.visibility = 'hidden'; 
        sound.play();
    };
    document.body.appendChild(btnRetour);
}

function highScore(){
    //Mettre ici l'affichage de mon array 
    title.innerHTML = 'Your current score';
    title.style.left = '190px';
    buttonsDiv[0].style.visibility = 'hidden';

    var afficheNom = document.createElement("div");
    afficheNom.setAttribute("div","nom");

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
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,3,1,1,1,1,1,0,1,1,0,0,0,0,0],
        [0,0,0,0,0,1,1,3,0,0,0,1,1,0,3],
        [1,1,0,0,0,0,0,1,1,1,0,0,1,1,1],
        [1,1,1,3,1,1,0,0,0,0,0,0,0,0,6],
        [5,1,0,0,0,0,0,0,0,1,0,0,0,1,1],
        [0,1,0,0,3,1,0,0,1,1,0,0,0,0,3],
        [0,9,0,1,1,1,1,1,0,0,0,0,1,0,1],
        [1,1,1,1,1,0,0,0,0,1,1,0,1,3,1],
        [1,1,1,1,1,10,0,1,1,1,0,0,1,0,1],
        [1,1,1,3,1,1,1,1,1,1,0,0,0,0,1],
        [1,1,0,0,0,0,0,0,0,1,0,1,1,0,1],
        [1,1,1,0,0,0,1,1,0,1,0,1,1,0,1],
        [1,1,10,0,0,0,1,1,0,3,0,1,0,3,1],
        [1,1,1,1,8,1,1,1,1,1,1,1,1,1,1]
    ]

    this.map = new GameMap(this.ctx, mapJeu);

    this.perso = new Perso(this.ctx, this.keys, this.map);



    requestAnimationFrame(anime);
}

function init() {
    // on ne demarre que quand tout est chargé
    chargerImages(start);


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

    if(victoire == false){
        requestAnimationFrame(anime);

    }

}










