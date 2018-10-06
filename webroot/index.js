
InitializeAnimation("#animationArea")
function InitializeAnimation(elementName) {
  var target = $(elementName);
  if (target.length > 0) {
    var ctx = target[0].getContext("2d");
    ctx.fillStyle = `rgb(0,0,0)`;
    ctx.fillRect(0,0,9999,9999);
  } else {
    console.log("Error: Element: " + elementName + " was not found in the DOM.");
  }
}
