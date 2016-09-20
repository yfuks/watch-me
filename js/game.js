var icons = document.getElementsByClassName("icons");
var video = document.getElementsByClassName("fillWidth3")[0];
var spinner = document.getElementsByClassName("spinner")[0];
var videoContainer = document.getElementsByClassName("video-container2")[0];
var credits = document.getElementsByClassName("credits")[0];
var iconsList = document.getElementsByClassName("icons-list")[0];
var buttonReloadGame = document.getElementsByClassName("button-reload")[1];
var buttonFound = document.getElementsByClassName("button-found")[0];
var buttonReturn = document.getElementsByClassName("button-return")[0];
var bannerFound = document.getElementsByClassName("banner-found")[0];

var currentIconIndex = 0;
var currentVideoTime = 0;
var gameStarted = false;
var inCredit = false;

document.onkeypress = function (e) {
  var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
  if (charCode == 114 && gameStarted) {
    selectIconRandomnly();
  }
}

buttonReloadGame.onclick = function(e) {
  currentVideoTime = 0;
  gameStarted = false;
  inCredit = false;
  video.currentTime = 0;

  buttonReloadGame.style.display = 'none';
  iconsList.style.display = 'block';
  spinner.style.display = 'block';
  buttonFound.style.display = 'block';

  gameStarted = true;
  changeCurrentVideo('' + currentIconIndex);
}

buttonFound.onclick = function (e) {
  video.pause();
  bannerFound.style.display = 'block';
  bannerFound.onclick = function (e) {
    bannerFound.style.display = 'none';
    bannerFound.onclick = null;
    video.play();
  }
}

buttonReturn.onclick = function (e) {
  inCredit = false;
  spinner.style.opacity = 1;
  spinner.style.display = 'block';

  iconsList.style.display = 'block';
  buttonFound.style.display = 'block';
  credits.style.display = 'none';

  if (video.canplaythrough) {
    fadeSpinner(spinner);
    gameStarted = true;
  }
  video.oncanplaythrough = function (event) {
    fadeSpinner(spinner);
    gameStarted = true;
  }
}

function selectIconRandomnly() {
  if (inCredit)
    return;
  var index;
  while (currentIconIndex == (index = Math.floor((Math.random() * icons.length)))) {
    ;
  }
  changeCurrentIcon(index);
  changeCurrentVideo('' + index);
}

function startGame() {
  var source = document.createElement('source');
  source.setAttribute('src', './videos/miroir-last-480p.mp4');
  source.class = "video-source";

  video.appendChild(source);
  video.load();

  var interCheck = setInterval(function () {
    var currentBufferIndex = getCurrentBufferIndex();
    var currentBufferIndex = getCurrentBufferIndex();
    var videoCurrentBufferTime = video.buffered.end(currentBufferIndex) - video.buffered.start(currentBufferIndex);
    console.log(videoCurrentBufferTime);
    if (videoCurrentBufferTime >= 10)
      upgradeVideoQuality();
    else if (videoCurrentBufferTime <= 2)
      downgradeVideoQuality();
    clearInterval(interCheck);
  }, 1500);

  video.oncanplaythrough = function (event) {
    video.canplaythrough = true;
    if (inCredit)
      return;

    fadeSpinner(spinner);
    gameStarted = true;
  }
}


function showCredits() {
  inCredit = true;
  spinner.style.display = 'none';
  iconsList.style.display = 'none';
  buttonFound.style.display = 'none';
  videoContainer.style.display = 'none';
  video.style.display = 'none';
  video.pause();
  credits.style.display = 'block';
}

function fadeSpinner(element) {
  element.style.display = 'none';

  if (inCredit)
    return;

  iconsList.style.display = 'block';

  // work around safari (force redraw)
  videoContainer.style.display = 'block';
  videoContainer.offsetHeight;
  videoContainer.style.display = '';

  video.style.display = "block";
  video.play();
  video.onended = function (e) {
    buttonReloadGame.style.display = 'block';
    buttonFound.style.display = 'none';
    video.style.display = 'none';
    videoContainer.style.display = 'none';
    iconsList.style.display = 'none';
  }
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
  video.load();
  video.canplaythrough = false;

  video.onloadedmetadata = function() {
    var interCheck = setInterval(function () {
      var currentBufferIndex = getCurrentBufferIndex();
      var videoCurrentBufferTime = video.buffered.end(currentBufferIndex) - video.buffered.start(currentBufferIndex);
      console.log(videoCurrentBufferTime);
      if (videoCurrentBufferTime >= 10)
        upgradeVideoQuality();
      else if (videoCurrentBufferTime <= 2)
        downgradeVideoQuality();
      clearInterval(interCheck);
    }, 1500);
    video.currentTime = currentVideoTime;
    video.oncanplaythrough = function (event) {
      video.canplaythrough = true;
      fadeSpinner(spinner);
    }
  };
}

function getSrcVideoFromIndex(index) {
  var srcVideo;
  switch (index) {
    case '0':
    // miroir
      srcVideo = './videos/miroir-last-480p.mp4';
      break;
    case '1':
    // ampoule
      srcVideo = './videos/ampoule-last-480p.mp4';
      break;
    case '2':
    // fanny
      //srcVideo = 'http://3.sendvid.com/nmvekyyj.mp4';
      srcVideo = './videos/fanny-last-480p.mp4';
      break;
    case '3':
    // volet
      srcVideo = './videos/volet-last-480p.mp4';
      break;
    case '4':
    // camera
      srcVideo = './videos/camera-last-480p.mp4';
      break;
    case '5':
    // ordi
      srcVideo = './videos/ordi-last-480p.mp4';
      break;
    case '6':
    // montre
      srcVideo = './videos/montre-last-480p.mp4';
      break;
    case '7':
    // comtoise
      //srcVideo = 'http://3.sendvid.com/s52vg5ig.mp4';
      srcVideo = './videos/comtoise-last-480p.mp4';
      break;
    case '8':
    // tour
      //srcVideo = 'http://4.sendvid.com/1y8ny0ov.mp4';
      srcVideo = './videos/tour-last-480p.mp4';
      break;
    case '9':
    // poignee
      srcVideo = './videos/poignee-last-480p.mp4';
      break;
    default:
      srcVideo = './videos/miroir-last-480p.mp4';
  }
  return srcVideo;
}
