var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var videoIntro = document.getElementsByClassName("fillWidth2")[0];
var gameInfos = document.getElementsByClassName("game-infos")[0];
var buttonReloadIntro = document.getElementsByClassName("button-reload")[0];

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

function playIntro() {
  videoIntro.style.display = "block";
  videoIntro.play();
  gameInfos.style.display = "none";

  var timer = setInterval(function () {
    var time = videoIntro.currentTime;
      if (vidEnded) {
          clearInterval(timer);
          gameInfos.style.display = "block";
          vidEnded = false; // put to false for reload purpose
      }
  }, 700);
}
