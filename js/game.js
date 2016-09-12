var icons = document.getElementsByClassName("icons");

var currentIconIndex = 0;

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
