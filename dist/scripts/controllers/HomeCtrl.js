(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, $timeout, LocalStorage, CurrentLocation, MapStyles, GooglePlaces) {
    // Set active top navbar link
    $rootScope.activeLink = function() {
      $('.topNavAnchor').removeClass('currentTopNavListItem');
      $(event.target).addClass('currentTopNavListItem');
    };

    if (!$rootScope.loggedIn) {
      $rootScope.currentUserFollows = LocalStorage.get('currentUserFollows');
      $rootScope.currentUserFollowsRecentMedia = LocalStorage.get('currentUserFollowsRecentMedia');
      $rootScope.currentUserRecentMedia = LocalStorage.get('currentUserRecentMedia');
    }

    var initMap = function() {
      google.maps.event.addDomListener(window, 'load', CurrentLocation.getLocation());
    };

    if (localStorage.currentLocation) {
      var itemsArray = [];
      var times = SunCalc.getTimes(new Date(), LocalStorage.get('currentLat'), LocalStorage.get('currentLng'));
      var mapOptions = {
        center: new google.maps.LatLng(LocalStorage.get('currentLat'), LocalStorage.get('currentLng')),
        zoom: 10,
        styles: Date.now() < times.dusk ? MapStyles.dayMap() : MapStyles.nightMap()
      };

      $rootScope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      var currentLocationMapLabel = new MapLabel({
        text: 'You are here',
        position: new google.maps.LatLng(LocalStorage.get('currentLocation')),
        map: $rootScope.map,
        fontSize: 15,
        align: 'center',
        fontFamily: 'Courier New'
      });

      var currentLocationMarker = new google.maps.Marker({
        position: LocalStorage.get('currentLocation'),
        map: $rootScope.map,
        content: '<h1>Current Location</h1>'
      });

      // markersArray.push(currentLocationMarker);

      // myoverlay allows ability to style each marker image
      var myoverlay = new google.maps.OverlayView();

      myoverlay.draw = function() {
        this.getPanes().markerLayer.id='markerLayer';
      };

      myoverlay.setMap($rootScope.map);

      // if ($rootScope.currentUserRecentMedia) {
      //   // create pins for places the current user has been recently
      //   $rootScope.currentUserRecentMedia.forEach(function(item) {
      //     if (item.location) {
      //       itemsArray.push(item);
      //     }
      //   });
      // }

      if ($rootScope.currentUserFollowsRecentMedia) {
        // create pins for places that the current users friends have been to recently
        $rootScope.currentUserFollowsRecentMedia.forEach(function(user) {
          user.forEach(function(item) {
            if (item.location) {
              itemsArray.push(item);
            }
          });
        });
      }

      var markers = [];

      itemsArray.forEach(function(item) {
        // GooglePlaces.getPlacesInfo(item);
        markers.push(GooglePlaces.addMarkersToMap(item));
      });

      markers.forEach(function(marker) {
        google.maps.event.addListener(marker, 'click', function(e) {
          var service;
          var markerLocation = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
          var request = {
            location: markerLocation,
            query: marker.query
          };

          service = new google.maps.places.PlacesService($rootScope.map);
          service.textSearch(request, callback);

          function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                var place = results[i];

                createInfoBox(place);
              }
            } else {
              console.log(status);
            }
          }

          function createInfoBox(place) {
            var placeLoc = place.geometry.location;
            var infoBox = new InfoBox({
              latlng: markerLocation,
              map: $rootScope.map,
              content: '<h5>'+ marker.query + '</h5>' +
                     '<ul>' +
                      '<li>' + place.formatted_address + '</li>' +
                      '<li>' + place.icon + '</li>' +
                      '<li>' + place.photos + '</li>' +
                      '<li>' + place.rating + '</li>' +
                      '<li>' + place.types + '</li>' +
                     '</ul>'
            });
          }
        });
      });
      
      var markerCluster = new MarkerClusterer($rootScope.map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      
    } else {
      initMap();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', 'LocalStorage', 'CurrentLocation', 'MapStyles', 'GooglePlaces', HomeCtrl]);
})();