var spinner = document.getElementsByClassName("sk-folding-cube")[0];
var videoAcceuil = document.getElementsByClassName("fillWidth")[0];
var divHeroModule = document.getElementsByClassName("homepage-hero-module")[0];

window.onload = function() {
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

  window.onresize = function(event) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
     scaleVideoContainer(x, y);
     scaleBannerVideoSize(videoAcceuil);
  };
};

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

function initBannerVideoSize(element) {
  element.dataset.height = element.videoHeight;
  element.dataset.width = element.videoWidth;

  scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element){
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

    videoWidth = windowWidth;
    videoHeight = videoWidth * videoAspectRatio;
    element.style.top = (windowHeight - videoHeight) / 2 + 'px';
    element.style.marginLeft = 0;
    element.width = videoWidth;
    element.height = videoHeight;
}
