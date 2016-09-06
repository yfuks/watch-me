var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var videoIntro = document.getElementsByClassName("fillWidth2")[0];
var gameInfos = document.getElementsByClassName("game-infos")[0];

var vidEnded = false;

videoIntro.onended = function() {
    vidEnded = true;
};

videoAcceuil.onclick = function (e) {
  videoAcceuil.pause();
  videoAcceuil.style.display = "none";
  videoIntro.play();
  videoIntro.style.display = "block";

  var timer = setInterval(function () {
    var time = videoIntro.currentTime;
      if (vidEnded) {
          clearInterval(timer);
          gameInfos.style.display = "block";
      }
  }, 700);
}
