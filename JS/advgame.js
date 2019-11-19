var startBtn = document.getElementById('startBtn');
var scoreBtn = document.getElementById('scoreBtn');
var soundBtn = document.getElementById('soundBtn');


var sound = new Audio();
sound.src = "https://felgo.com/web-assets/pop.wav";

function initialize(){
  startBtn.style.display = 'none';
  
}

function soundGestion(){
     sound.play();   
}