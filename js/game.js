var icons = document.getElementsByClassName("icons");
var video = document.getElementsByClassName("fillWidth3")[0];
var spinner = document.getElementsByClassName("spinner")[0];
var videoContainer = document.getElementsByClassName("video-container2")[0];

var currentIconIndex = 0;

function startGame() {
  var source = document.createElement('source');
  source.setAttribute('src', './videos/miroir-last.mp4');
  source.class = "video-source";

  video.appendChild(source);
  video.load();

  video.oncanplaythrough = function (event) {
    spinner.style.display = "none";
    video.style.display = "block";
    videoContainer.style.display = "block";
    video.play();
  }
}

function selectIcon(srcElement) {
  var index = srcElement.getAttribute('data-index');
  if (index != currentIconIndex) {
    changeCurrentIcon(index);
  }
}

function changeCurrentIcon(indexIcon) {
  var iconIndex = currentIconIndex * 1 + 1;
  icons[currentIconIndex].src = "./icon/" + iconIndex + "-off.png";

  currentIconIndex = indexIcon;
  iconIndex = currentIconIndex * 1 + 1;
  icons[currentIconIndex].src = "./icon/" + iconIndex + "-on.png";
}
