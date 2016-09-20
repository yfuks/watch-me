var video = document.getElementsByClassName("fillWidth3")[0];

var currentVideoQuality = 'high';
var intervalChecker = 100; // 0.1s
var maximumTimeToLoad = 1000; // 1s
var currentVideoSrc = '';
var inCheck = false;

function upgradeVideoQuality() {
  //if (currentVideoQuality == 'high')
  //  return;
  console.log('upgrade quality');
}

function downgradeVideoQuality() {
  console.log('downgrade quality');
}

function getCurrentBufferIndex() {
  if (video.buffered.length <= 0)
    return -1;

  var currentBuffer = 0;
  var currentVideoTime = video.currentTime;
  var numberOfbufferVideo = video.buffered.length;

  for (var i = 0; i < numberOfbufferVideo; i++) {
    if (video.buffered.start(i) <= currentVideoTime && video.buffered.end(i) >= currentVideoTime)
      currentBuffer = i;
  }
  return currentBuffer;
}
