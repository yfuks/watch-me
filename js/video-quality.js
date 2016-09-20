var video = document.getElementsByClassName("fillWidth3")[0];

var currentVideoQuality = 'high';
var intervalChecker = 100; // 0.1s
var maximumTimeToLoad = 1000; // 1s
var currentVideoSrc = '';
var inCheck = false;

setInterval(checkBuffering, intervalChecker);

function checkBuffering() {
  if (!gameStarted || inCheck || inCredit) {
    return;
  }

  inCheck = true;
  var currentBufferIndex = getCurrentBufferIndex();
  if (currentBufferIndex == -1) {
    inCheck = false;
    return;
  }
  currentVideoSrc = video.src;
  var tmout = setTimeout(function() {
    inCheck = false;
    // we selected an other video
    if (currentVideoSrc != video.src) {
      clearTimeout(tmout);
      return;
    }

    var timeBuffered = video.seekable.end(currentBufferIndex) - video.seekable.start(currentBufferIndex);
    console.log(timeBuffered);
    if (timeBuffered <= 2) {
      downgradeVideoQuality();
    } else if (timeBuffered >= 5) {
      upgradeVideoQuality();
    }
    clearTimeout(tmout);
  }, maximumTimeToLoad);
}

function upgradeVideoQuality() {
  if (currentVideoQuality == 'high')
    return;
  console.log('upgrade quality');
}

function downgradeVideoQuality() {
  console.log('downgrade quality');
}

function getCurrentBufferIndex() {
  if (video.seekable.length <= 0)
    return -1;

  var currentBuffer = 0;
  var currentVideoTime = video.currentTime;
  var numberOfbufferVideo = video.seekable.length;

  for (var i = 0; i < numberOfbufferVideo; i++) {
    if (video.seekable.start(i) <= currentVideoTime && video.seekable.end(i) >= currentVideoTime)
      currentBuffer = i;
  }
  return currentBuffer;
}
