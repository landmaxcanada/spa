
  lm.gmap = document.querySelector('google-map');
  
  lm.gmap.addEventListener('api-load', function(e) {
    document.querySelector('google-map-directions').map = this.map;
  });

  function toggleControls() {
    lm.gmap.disableDefaultUI = !lm.gmap.disableDefaultUI;
  }
