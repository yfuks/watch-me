var spinner = document.getElementsByClassName("spinner")[0];
var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var videoIntro = document.getElementsByClassName("fillWidth2")[0];
var divHeroModule = document.getElementsByClassName("homepage-hero-module")[0];

var canPlayAcceuil = false;
var canPlayIntro = false;
var loadingEnd = false;

videoAcceuil.oncanplaythrough = function (e) {
  if (canPlayIntro == true && !loadingEnd) {
    start();
	loadingEnd = true;
  }
  canPlayAcceuil = true;
}

videoIntro.oncanplaythrough = function (e) {
  if (canPlayAcceuil == true && !loadingEnd) {
    start();
	loadingEnd = true;
  }
  canPlayIntro = true;
}

/*
 *    Start the app
 */

function start() {
  fade(spinner);

  var x = getWindowWidth(),
      y = getWindowHeight();

  // Resize video
  scaleVideoContainer(x, y);
  initBannerVideoSize(videoAcceuil, 450, 1500, true);
  initBannerVideoSize(videoIntro, 1080, 1920, false);

  window.onresize = function(event) {
    var x = getWindowWidth(),
        y = getWindowHeight();
     scaleVideoContainer(x, y);
     scaleBannerVideoSize(videoAcceuil, true);
     scaleBannerVideoSize(videoIntro, false);
  };
}

/*
 *    Hide the spinner then diplay the Accueil video and play it
 */

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            timer = null;
            element.style.display = 'none';

            // work around safari (force redraw)
            divHeroModule.style.display = 'block';
            divHeroModule.offsetHeight;
            divHeroModule.style.display = '';

            videoAcceuil.style.display = 'block';
            videoAcceuil.play();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 70);
}

/*
 *  Video
 */

 function scaleVideoContainer(width, height) {
     var unitWidth = parseInt(width) + 'px';
     var unitHeight = parseInt(height) + 'px';
     divHeroModule.style.width = unitWidth;
     divHeroModule.style.height = unitHeight;
 }

function initBannerVideoSize(element, height, width, marginSide) {
  element.dataset.height = height;
  element.dataset.width = width;

  scaleBannerVideoSize(element, marginSide);
}

function scaleBannerVideoSize(element, isMarginSide){
  var marginSide = 50;
  var windowWidth = getWindowWidth(),
      windowHeight = getWindowHeight(),
      videoWidth,
      videoHeight;

    var videoAspectRatio = element.dataset.height / element.dataset.width,
        windowAspectRatio = windowHeight / windowWidth;

    if (isMarginSide) {
      videoWidth = (windowWidth - (marginSide * 2)) > 800 ? 800 : (windowWidth - (marginSide * 2));
    } else {
      videoWidth = (windowWidth);
    }

    videoHeight = videoWidth * videoAspectRatio;
    element.style.top = (windowHeight - videoHeight) / 2 + 'px';
    element.style.marginLeft = (windowWidth / 2) - (videoWidth / 2) + 'px';
    element.width = videoWidth;
    element.height = videoHeight;
}

/*
 *    Window tools
 */

function getWindowWidth() {
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  return (windowWidth);
}

function getWindowHeight() {
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return (windowHeight);
}
