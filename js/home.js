var spinner = document.getElementsByClassName("sk-folding-cube")[0];

window.onload = function() {
  var video = document.createElement('video');

  video.src = '../videos/';
  video.autoPlay = true;
  fade(spinner);
};

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}
