var icons = document.getElementsByClassName("icons");
var video = document.getElementsByClassName("fillWidth3")[0];
var spinner = document.getElementsByClassName("spinner")[0];
var videoContainer = document.getElementsByClassName("video-container2")[0];

var currentIconIndex = 0;
var currentVideoTime = 0;
var gameStarted = false;

document.onkeypress = function (e) {
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  if (charCode == 114 && gameStarted) {
    selectIconRandomnly();
  }
}

function selectIconRandomnly() {
  var index;
  while (currentIconIndex == (index = Math.floor((Math.random() * icons.length)))) {
    ;
  }
  changeCurrentIcon(index);
  changeCurrentVideo('' + index);
}

function startGame() {
  var source = document.createElement('source');
  source.setAttribute('src', './videos/miroir-last.mp4');
  source.class = "video-source";

  video.appendChild(source);
  video.load();

  video.oncanplaythrough = function (event) {
    fadeSpinner(spinner);
    gameStarted = true;
  }
}

function fadeSpinner(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            timer = null;
            element.style.display = 'none';

            // work around safari (force redraw)
            videoContainer.style.display = 'block';
            videoContainer.offsetHeight;
            videoContainer.style.display = '';

            video.style.display = "block";
            video.play();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 70);
}


function selectIcon(srcElement) {
  var index = srcElement.getAttribute('data-index');
  if (index != currentIconIndex) {
    changeCurrentIcon(index);
    changeCurrentVideo(index);
  }
}

function changeCurrentIcon(indexIcon) {
  var iconIndex = currentIconIndex * 1 + 1;
  icons[currentIconIndex].src = "./icon/" + iconIndex + "-off.png";

  currentIconIndex = indexIcon;
  iconIndex = currentIconIndex * 1 + 1;
  icons[currentIconIndex].src = "./icon/" + iconIndex + "-on.png";
}

function changeCurrentVideo(index) {
  currentVideoTime = video.currentTime;
  video.pause();
  video.style.display = 'none';

  videoContainer.style.display = 'none';

  spinner.style.opacity = 1;
  spinner.style.display = "block";

  video.src = getSrcVideoFromIndex(index);
  video.currentTime = currentVideoTime;
  video.load();

  video.oncanplaythrough = function (event) {
    fadeSpinner(spinner);
  }
}

function getSrcVideoFromIndex(index) {
  var srcVideo;
  switch (index) {
    case '0':
      srcVideo = './videos/miroir-last.mp4';
      break;
    case '1':
      srcVideo = './videos/ampoule-last.mp4';
      break;
    case '2':
      srcVideo = './videos/volet-last.mp4';
      break;
    case '3':
      srcVideo = './videos/fanny-last.mp4';
      break;
    case '4':
      srcVideo = './videos/camera-last.mp4';
      break;
    case '5':
      srcVideo = './videos/ordi-last.mp4';
      break;
    case '6':
      srcVideo = './videos/montre-last.mp4';
      break;
    case '7':
      srcVideo = './videos/comtoise-last.mp4';
      break;
    case '8':
      srcVideo = './videos/tour-last.mp4';
      break;
    case '9':
      srcVideo = './videos/poignee-last.mp4';
      break;
    default:
      srcVideo = './videos/miroir-last.mp4';
  }
  return srcVideo;
}
