var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var videoIntro = document.getElementsByClassName("fillWidth2")[0];
var gameInfos = document.getElementsByClassName("game-infos")[0];
var buttonReloadIntro = document.getElementsByClassName("button-reload")[0];
var buttonStart = document.getElementsByClassName("button-start")[0];
var spinner = document.getElementsByClassName("sk-folding-cube")[0];
var divHeroModule = document.getElementsByClassName("homepage-hero-module")[0];

var vidEnded = false;

videoIntro.onended = function() {
    vidEnded = true;
};

videoAcceuil.onclick = function (e) {
  videoAcceuil.pause();
  videoAcceuil.style.display = "none";
  playIntro();
}

buttonReloadIntro.onclick = function (e) {
  playIntro();
}

buttonStart.onclick = function (e) {
  videoIntro.style.display = "none";
  gameInfos.style.display = "none";
  divHeroModule.style.display = "none";
  spinner.style.display = "block";
  spinner.style.opacity = 1;
  spinner.style.filter = 'alpha(opacity=' + 100 + ")";
}

function playIntro() {
  videoIntro.style.display = "block";
  videoIntro.play();
  gameInfos.style.display = "none";

  // print game infos at the end of the videoIntro
  var timer = setInterval(function () {
    var time = videoIntro.currentTime;
      if (vidEnded) {
          clearInterval(timer);
          gameInfos.style.display = "block";
          vidEnded = false; // put to false for reload purpose
      }
  }, 700);
}
