
/*lm.gMap = document.querySelector('google-map');*/

/*lm.gMap.addEventListener('api-load', function(e) {
  document.querySelector('google-map-directions').map = this.map;
});

function toggleControls() {
  lm.gMap.disableDefaultUI = !lm.gMap.disableDefaultUI;
}*/


/*lm.gMap = document.querySelector('google-map');
  lm.gMap.addEventListener('google-map-ready', function(e) {
    console.log('Map loaded!');
    lm.gMap.removeAttribute("fitToMarkers");
  });*/


window.addEventListener('google-map-ready', function(e) {
  //console.log('Map loaded!');
  lm.gMap = document.querySelector('google-map');
  lm.gMap.removeAttribute("fitToMarkers");

  lm.resetMap = function() {
    lm.gMap.resize();
    lm.gMap.map.setCenter(lm.mapCenter);
    lm.gMap.setAttribute("fitToMarkers", "true");
  }

  });