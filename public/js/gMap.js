///<reference path='../../typings/googlemaps/google.maps.d.ts'/>
///<reference path='../../typings/jquery/jquery.d.ts'/>

//lm.gMap.markers[1].marker.setMap()
lm.bb = {};
lm.bb.kmlPoints = [[
  -115.74238507476527,
  49.786669272179843
], [
    -115.74215919324571,
    49.786393238237636
  ], [
    -115.74364650297616,
    49.786400693720886
  ], [
    -115.74364335996607,
    49.786675581409334
  ], [
    -115.74238507476527,
    49.786669272179843
  ]
]

lm.sv = {};
lm.sv.dock = {
  lat: '49.7866858',
  lng: '-115.7420089',
  heading: '197',
  pitch: '82',
  fovy: '75',
  zoom: '1.0',
  panoId: 'WcCu7GfS-RUAAAQJOB-ULA'
};
//var svs = new google.maps.StreetViewService();
// var svsLL = new google.maps.LatLng(49.7866858,-115.7420089);
//svs.getPanoramaByLocation(svsLL, 10, function(data, status){lm.svData = data});

window.addEventListener('google-map-ready', function(e) {

  lm.gMapElm = document.querySelector('google-map');
  lm.gMap = lm.gMapElm.map;
  lm.svElm = document.getElementById('svElm');

  lm.gMapElm.removeAttribute("fitToMarkers");

  lm.kmlPointToPoly = function() {
    lm.bb.coords = [];
    lm.bb.bounds = new google.maps.LatLngBounds;
    for (var i = 0; i < lm.bb.kmlPoints.length; i++) {
      var point = new google.maps.LatLng(lm.bb.kmlPoints[i][1], lm.bb.kmlPoints[i][0]);
      lm.bb.coords.push(point);
      lm.bb.bounds.extend(point);
    }

    lm.bb.poly = new google.maps.Polygon({
      paths: lm.bb.coords,
      clickable: false,
      strokeColor: '#00FF00',
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: '#FFFFFF',
      fillOpacity: 0.05
    });

  }

  lm.bb.ZoomIn = function() {
    console.log("bbMarker Clicked");
    lm.bb.marker.setMap();
    lm.bb.markerElm.info.close();
    lm.gMap.setMapTypeId(google.maps.MapTypeId.HYBRID);
    lm.gMap.setZoom(18);
    lm.gMap.setCenter(lm.bb.marker.getPosition());
  }

/*  lm.sv.AddIcons = function(){
    lm.sv.pano = 
    
    
  }*/


  setTimeout(function() {

    lm.bb.markerElm = document.getElementById("bbMarker");
    lm.bb.marker = lm.bb.markerElm.marker;
    lm.sv.dockMarkerElm = document.getElementById("sv-dock");
    lm.sv.dockMarker = lm.sv.dockMarkerElm.marker;
    lm.sv.dockMarker.setMap();

    lm.resetMap = function() {
      lm.gMapElm.resize();
      lm.gMap.setCenter(lm.mapCenter);
      lm.gMapElm.setAttribute("fitToMarkers", "true");
      setTimeout(function() {
        if (lm.bb.markerElm.info) {
          lm.bb.markerElm.info.close();
        }
        lm.gMapElm.removeAttribute("fitToMarkers");
      }, 500);
    }
    
    lm.sv.ShowDock = function(){
      lm.svElm.className = 'show';
      //lm.svElm.className = 'hide';
      lm.svElm.setAttribute('panoid', lm.sv.dock.panoId);
      lm.svElm.setAttribute('heading', lm.sv.dock.heading);
      lm.svElm.setAttribute('pitch', lm.sv.dock.pitch);
      lm.svElm.setAttribute('zoom', lm.sv.dock.zoom);
    }

    lm.kmlPointToPoly();

    google.maps.event.addListener(lm.bb.marker, 'click', lm.bb.ZoomIn);
    google.maps.event.addListener(lm.sv.dockMarker, 'click', lm.sv.ShowDock);//

    google.maps.event.addListener(lm.gMap, 'zoom_changed', function() {
      lm.zoom = lm.gMap.getZoom();
      if (lm.zoom < 12) {
        lm.gMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        lm.bb.poly.setMap();
        lm.sv.dockMarker.setMap();
        lm.bb.marker.setMap(lm.gMap);
      } else if (lm.zoom < 15) {
        lm.gMap.setMapTypeId(google.maps.MapTypeId.TERRAIN);
        lm.bb.poly.setMap();
        lm.sv.dockMarker.setMap();
        lm.bb.marker.setMap(lm.gMap);
      } else if (lm.zoom < 19) {
        lm.gMap.setMapTypeId(google.maps.MapTypeId.HYBRID);
        lm.bb.marker.setMap();
        lm.bb.poly.setMap(lm.gMap);
        lm.sv.dockMarker.setMap(lm.gMap);
      } else if (lm.zoom < 21) {
        lm.gMap.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        lm.bb.marker.setMap();
        lm.bb.poly.setMap(lm.gMap);
        lm.sv.dockMarker.setMap(lm.gMap);
      }
    });

  }, 1000);



});