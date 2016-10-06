(function() {
  function GooglePlaces($rootScope) {
    return {
      getPlacesInfo: function(item) {
        var service;
        var itemLocation = new google.maps.LatLng(item.location.latitude, item.location.longitude);
        var request = {
              location: itemLocation,
              query: item.location.name
            };

        service = new google.maps.places.PlacesService($rootScope.map);
        service.textSearch(request, callback);

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var place = results[i];

              createMarker(place);
            }
          } else {
            console.log(status);
          }
        }

        function createMarker(place) {
          var placeLoc = place.geometry.location;

          var marker = new google.maps.Marker({
            position: itemLocation,
            map: $rootScope.map,
            animation: google.maps.Animation.DROP,
            icon: item.user.profile_picture,
            optimized: false
          });

          var mapLabel = new MapLabel({
            text: item.user.full_name,
            position: itemLocation,
            map: $rootScope.map,
            fontSize: 15,
            align: 'center',
            fontFamily: 'Courier New',
            minZoom: 12
          });

          google.maps.event.addListener(marker, 'click', function(e) {
            var infoBox = new InfoBox({
              latlng: this.getPosition(),
              map: $rootScope.map,
              content: '<h5>'+ item.location.name + '</h5>' +
                     '<ul>' +
                      '<li>' + place.formatted_address + '</li>' +
                      '<li>' + place.icon + '</li>' +
                      '<li>' + place.photos + '</li>' +
                      '<li>' + place.rating + '</li>' +
                      '<li>' + place.types + '</li>' +
                     '</ul>'
            });
          });
        }
      },
      addMarkersToMap: function(item) {
        var markersArray = [];
        var itemLocation = new google.maps.LatLng(item.location.latitude, item.location.longitude);

        var marker = new google.maps.Marker({
          position: itemLocation,
          map: $rootScope.map,
          animation: google.maps.Animation.DROP,
          icon: item.user.profile_picture,
          optimized: false
        });

        var mapLabel = new MapLabel({
          text: item.user.full_name,
          position: itemLocation,
          map: $rootScope.map,
          fontSize: 15,
          align: 'center',
          fontFamily: 'Courier New',
          minZoom: 12
        });

        // google.maps.event.addListener(marker, 'click', function(e) {
        //   var infoBox = new InfoBox({
        //     latlng: this.getPosition(),
        //     map: $rootScope.map,
        //     content: '<h5>Test</h5>'
        //   });
        // });

        markersArray.push(marker);

        return markersArray;
      }
    };
  }

  angular
    .module('buzz')
    .factory('GooglePlaces', ['$rootScope', GooglePlaces]);
})();