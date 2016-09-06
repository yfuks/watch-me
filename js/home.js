var spinner = document.getElementsByClassName("sk-folding-cube")[0];
var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var videoIntro = document.getElementsByClassName("fillWidth2")[0];
var divHeroModule = document.getElementsByClassName("homepage-hero-module")[0];

var canPlayAcceuil = false;
var canPlayIntro = false;

videoAcceuil.oncanplaythrough = function (e) {
  if (canPlayIntro == true) {
    start();
  }
  canPlayAcceuil = true;
}

videoIntro.oncanplaythrough = function (e) {
  if (canPlayAcceuil == true) {
    start();
  }
  canPlayIntro = true;
}

function start() {
  fade(spinner);

  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

  // Resive video
  scaleVideoContainer(x, y);
  initBannerVideoSize(videoAcceuil);
  initBannerVideoSize2(videoIntro);

  window.onresize = function(event) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
     scaleVideoContainer(x, y);
     scaleBannerVideoSize(videoAcceuil);
     scaleBannerVideoSize2(videoIntro);
  };
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
            videoAcceuil.style.display = "block";
            divHeroModule.style.display = "block";
            videoAcceuil.play();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 70);
}

function scaleVideoContainer(width, height) {
    var unitWidth = parseInt(width) + 'px';
    var unitHeight = parseInt(height) + 'px';
    divHeroModule.style.width = unitWidth;
    divHeroModule.style.height = unitHeight;
}

/*
 *  Video Acceuil
 */

function initBannerVideoSize(element) {
  element.dataset.height = 1080;
  element.dataset.width = 1920;

  scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element){
  var marginSide = 50;
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
      windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,
      videoWidth,
      videoHeight;

    var videoAspectRatio = element.dataset.height / element.dataset.width,
        windowAspectRatio = windowHeight / windowWidth;

    /*
    console.log('windowWidth', windowWidth);
    console.log('windowHeight', windowHeight);
    console.log('windowAspectRatio', windowAspectRatio);
    console.log('videoAspectRatio', videoAspectRatio);
    */

    videoWidth = (windowWidth - (marginSide * 2)) > 800 ? 800 : (windowWidth - (marginSide * 2));
    videoHeight = videoWidth * videoAspectRatio;
    element.style.top = (windowHeight - videoHeight) / 2 + 'px';
    element.style.marginLeft = (windowWidth / 2) - (videoWidth / 2) + 'px';
    element.width = videoWidth;
    element.height = videoHeight;
}

/*
 *  Video intro
 */

 function initBannerVideoSize2(element) {
   element.dataset.height = element.videoHeight;
   element.dataset.width = element.videoWidth;

   scaleBannerVideoSize2(element);
 }

 function scaleBannerVideoSize2(element){
   var w = window,
       d = document,
       e = d.documentElement,
       g = d.getElementsByTagName('body')[0],
       windowWidth = w.innerWidth || e.clientWidth || g.clientWidth,
       windowHeight = w.innerHeight|| e.clientHeight|| g.clientHeight,
       videoWidth,
       videoHeight;

     var videoAspectRatio = element.dataset.height / element.dataset.width,
         windowAspectRatio = windowHeight / windowWidth;

     /*
     console.log('windowWidth', windowWidth);
     console.log('windowHeight', windowHeight);
     console.log('windowAspectRatio', windowAspectRatio);
     console.log('videoAspectRatio', videoAspectRatio);
     */

     videoWidth = (windowWidth);
     videoHeight = videoWidth * videoAspectRatio;
     element.style.top = (windowHeight - videoHeight) / 2 + 'px';
     element.style.marginLeft = (windowWidth / 2) - (videoWidth / 2) + 'px';
     element.width = videoWidth;
     element.height = videoHeight;
 }
