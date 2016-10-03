(function() {
  function CurrentLocation(LocalStorage, MapStyles) {
    function success(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var times = SunCalc.getTimes(new Date(), lat, lng);
      var myLocation = new google.maps.LatLng(lat, lng);
      var mapOptions = {
        center: new google.maps.LatLng(myLocation.lat(), myLocation.lng()),
        zoom: 10,
        styles: Date.now() < times.dusk ? MapStyles.dayMap() : MapStyles.nightMap()
      };

      console.log(lat, lng);

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var mapLabel = new MapLabel({
        text: 'You are here',
        position: myLocation,
        map: map,
        fontSize: 15,
        align: 'center',
        fontFamily: 'Courier New'
      });
      
      var marker = new google.maps.Marker({
        position: myLocation,
        map: map
      });
          
      // myoverlay allows ability to style each marker image
      var myoverlay = new google.maps.OverlayView();

      myoverlay.draw = function() {
        this.getPanes().markerLayer.id='markerLayer';
      };

      myoverlay.setMap(map);

      LocalStorage.set('currentLocation', myLocation);
      LocalStorage.set('currentLat', lat);
      LocalStorage.set('currentLng', lng);
    }

    function error(e) {
      console.log('error code: ' + e.code + ', message: ' + e.message);
    }

    return {
      getLocation: function() {
        if (navigator.geolocation) {
          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
          $('map-canvas').innerHTML = 'Geolocation is not supported by this browser.';
        }
      }
    };
  }

  angular
    .module('buzz')
    .factory('CurrentLocation', ['LocalStorage', 'MapStyles', CurrentLocation]);
})();