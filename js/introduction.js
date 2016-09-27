var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var videoIntro = document.getElementsByClassName("fillWidth2")[0];
var gameInfos = document.getElementsByClassName("game-infos")[0];
var buttonReloadIntro = document.getElementsByClassName("button-reload")[0];
var buttonStart = document.getElementsByClassName("button-start")[0];
var buttonSkip = document.getElementsByClassName("button-skip")[0];
var spinner = document.getElementsByClassName("spinner")[0];
var divHeroModule = document.getElementsByClassName("homepage-hero-module")[0];
var game = document.getElementsByClassName("game")[0];
var fade1 = document.getElementById("fade1");
var fade2 = document.getElementById("fade2");
var fade3 = document.getElementById("fade3");

var vidEnded = false;
var infade = false;

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

buttonSkip.onclick = function (e) {
	buttonSkip.style.display = "none";
    gameInfos.style.display = "block";
    videoIntro.style.display = "none";
	videoIntro.pause();
	vidEnded = true;
}

buttonStart.onclick = function (e) {
  videoIntro.style.display = "none";
  gameInfos.style.display = "none";
  divHeroModule.style.display = "none";
  spinner.style.display = "block";
  spinner.style.opacity = 1;
  spinner.style.filter = 'alpha(opacity=' + 100 + ")";
  game.style.display = "block";
  startGame();
}

function fadeOutObject(element) {
  if (infade)
    return;

  infade = true;
  var opci = 1;  // initial opacity
  element.style.opacity = opci;
  element.style.filter = 'alpha(opacity=' + opci * 100 + ")";
  var timerFadeout = setInterval(function () {
      if (opci <= 0.1){
          clearInterval(timerFadeout);
          timerFadeout = null;
          infade = false;
          element.style.display = 'none';
      }
      element.style.opacity = opci;
      element.style.filter = 'alpha(opacity=' + opci * 100 + ")";
      opci -= opci * 0.1;
  }, 20);
}

function playIntro() {
  videoIntro.style.display = "block";
  videoIntro.currentTime = 0;
  videoIntro.play();
  gameInfos.style.display = "none";
  buttonSkip.style.display = "block";

  var timerText = setInterval(function () {
    var time = videoIntro.currentTime;
    if (time > 2 && time < 7) {
      fade1.style.display = 'block';
    } else if (time >= 7 && time <= 8) {
      fadeOutObject(fade1);
    } else if (time > 9 && time < 14) {
      fade2.style.display = 'block';
    } else if (time >= 14 && time <= 15) {
      fadeOutObject(fade2);
    } else if (time > 16 && time < 21) {
      fade3.style.display = 'block';
    } else if (time >= 21) {
      fadeOutObject(fade3);
      timerText = null;
    }
  }, 100);

  // print game infos at the end of the videoIntro
  var timer = setInterval(function () {
    var time = videoIntro.currentTime;
      if (vidEnded) {
        clearInterval(timer);
        timer = null;
		    buttonSkip.style.display = "none";
        fade3.style.display = 'none';
        gameInfos.style.display = "block";
        vidEnded = false; // put to false for reload purpose
      }
  }, 100);
}
