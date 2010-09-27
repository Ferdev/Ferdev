var IMAGES_TO_PRELOAD = [
'/images/button-overlay-inverse.png',
'/images/button-overlay.png',
'/images/spinner.gif',
'/images/icons/token/dark/E-Mail.png',
'/images/icons/token/dark/Twitter.png',
'/images/icons/token/light/E-Mail.png',
'/images/icons/token/light/Twitter.png'
];
function preloadImages() {
  var images = [];
  for (i = 0; i < IMAGES_TO_PRELOAD.length; i++) {
    images[i] = new Image();
    images[i].src = IMAGES_TO_PRELOAD[i];
  }
};