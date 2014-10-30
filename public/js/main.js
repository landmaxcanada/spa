///<reference path='../../typings/jquery/jquery.d.ts'/>
  
  (function() {
  "use strict";
  var DEFAULT_ROUTE = 'map';

  var template = document.querySelector('#t');

  template.pages = [
    { name: 'Map', hash: 'map', icon: 'language' },
    { name: 'Rates', hash: 'rates' },
    { name: 'Rooms', hash: 'rooms' },
    { name: 'Media', hash: 'media' },
    { name: 'Terri Clark', hash: 'terri_clark' },
    { name: 'Contact', hash: 'contact' },
  ];

  template.addEventListener('template-bound', function(e) {
    var keys = document.querySelector('#keys');

    // Allow selecting pages by num keypad. Dynamically add
    // [1, template.pages.length] to key mappings.
    var keysToAdd = Array.apply(null, template.pages).map(function(x, i) {
      return i + 1;
    }).reduce(function(x, y) {
        return x + ' ' + y;
      });
    keys.keys += ' ' + keysToAdd;

    this.route = this.route || DEFAULT_ROUTE; // Select initial route.
  });

  template.keyHandler = function(e, detail, sender) {

    var pages = document.querySelector('#pages');

    // Select page by num key. 
    var num = parseInt(detail.key);
    if (!isNaN(num) && num <= this.pages.length) {
      pages.selectIndex(num - 1);
      return;
    }

    switch (detail.key) {
      case 'left':
      case 'up':
        pages.selectPrevious();
        break;
      case 'right':
      case 'down':
        pages.selectNext();
        break;
      case 'space':
        detail.shift ? pages.selectPrevious() : pages.selectNext();
        break;
    }
  };

  template.hideDrawer = function(){
    console.log("hideDrawer");
    document.querySelector('#scaffold').closeDrawer();
  }
  template.trackPages = function(e, detail, sender) {
    // Click clicks should navigate and not cycle pages.
    //if target =google-map return
    lm.track = e;
    lm.source = e._source;
    lm.pointerType = e.pointerType;
    console.log("lm.pointerType: " + lm.pointerType + "  _source: " + lm.source);
    /*if (e.path[0].localName == 'a' || e.target == "google-map.full") {
      return;
    }

    e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);*/
  };

  template.cyclePages = function(e, detail, sender) {
    // Click clicks should navigate and not cycle pages.
    //if target =google-map return
    lm.tap = e;
    lm.source = e._source;
    lm.pointerType = e.pointerType;
    console.log("lm.pointerType: " + lm.pointerType + "  _source: " + lm.source);
    /*  if (e.path[0].localName == 'a' || e.target == "google-map.full") {
        return;
      }

      e.shiftKey ? sender.selectPrevious(true) : sender.selectNext(true);*/
    e.stopPropagation();
  };
  
  template.menuTapped = function(e, detail, sender) {
    lm.menuTapped = detail;
    console.log('menu Tapped detail: ' + detail);
    if (window.location.hash === "#map") {
      setTimeout(function() {
        lm.resetMap();
        document.querySelector('#scaffold').closeDrawer();
      }, 500);
    }
  }

  template.menuItemSelected = function(e, detail, sender) {
    lm.menuDetail = detail;
    console.log('menu detail: ' + detail)
    if (detail.isSelected) {
      document.querySelector('#scaffold').closeDrawer();
    }
    lm.tweakTitleFont();
  };

  lm.tweakTitleFont = function() {
    $("div#mainTitle").fitText(1.2, { minFontSize: '18px', maxFontSize: '30px' });
  }

setTimeout(function() {
    lm.tweakTitleFont();  
  }, 10000)


template.bbMarkerTap = function(){
  lm.tempThis = this;
  console.log("bbTaped: " + lm.tempThis);
}


})();