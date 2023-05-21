export function getRandomInt (min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export var randomOrder = function(element:any) {
  
  // Viewport Dimensions
  var vpHeight = window.innerHeight -50;
  var vpWidth = window.innerWidth - 800;
  
  // Image Position
  var xPos = getRandomInt(0, vpWidth - element.offsetWidth);
  var yPos = getRandomInt(0, vpHeight - element.offsetHeight);
  var zIndex = getRandomInt(0,13);
element.style.cssText += '--x-position:' + xPos + 'px; --y-position:' + yPos + 'px; z-index:' + zIndex;
};
