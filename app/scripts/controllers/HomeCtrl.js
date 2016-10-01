(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, LocalStorage, CurrentLocation) {
    if (!$rootScope.loggedIn) {
      $rootScope.currentUserFollows = LocalStorage.get('currentUserFollows');
      $rootScope.currentUserFollowsRecentMedia = LocalStorage.get('currentUserFollowsRecentMedia');
      $rootScope.currentUserRecentMedia = LocalStorage.get('currentUserRecentMedia');
    }

    var initMap = function() {
      google.maps.event.addDomListener(window, 'load', CurrentLocation.getLocation());
    };

    if (localStorage.currentLocationMapOptions) {
      var markersArray = [];

      var map = new google.maps.Map(document.getElementById('map-canvas'), LocalStorage.get('currentLocationMapOptions'));
      var currentLocationMapLabel = new MapLabel({
        text: 'You are here',
        position: new google.maps.LatLng(LocalStorage.get('currentLocation')),
        map: map,
        fontSize: 15,
        align: 'center',
        fontFamily: 'Courier New'
      });

      var currentLocationMarker = new google.maps.Marker({
        position: LocalStorage.get('currentLocation'),
        map: map,
        content: '<h1>Test</h1>'
      });

      markersArray.push(currentLocationMarker);

      // myoverlay allows ability to style each marker image
      var myoverlay = new google.maps.OverlayView();

      myoverlay.draw = function() {
        this.getPanes().markerLayer.id='markerLayer';
      };

      myoverlay.setMap(map);

      if ($rootScope.currentUserRecentMedia) {
        // create pins for places the current user has been recently
        $rootScope.currentUserRecentMedia.forEach(function(media) {
          if (media.location) {
            var mediaLocation = new google.maps.LatLng(media.location.latitude, media.location.longitude);

            var marker = new google.maps.Marker({
              position: mediaLocation,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: media.user.profile_picture,
              optimized: false,
              content: '<h1>Test</h1>'
            });

            var mapLabel = new MapLabel({
              text: media.user.full_name,
              position: mediaLocation,
              map: map,
              fontSize: 15,
              align: 'center',
              fontFamily: 'Courier New',
              minZoom: 12
            });

            markersArray.push(marker);
          }
        });
      }

      if ($rootScope.currentUserFollowsRecentMedia) {
        // create pins for places that the current users friends have been to recently
        $rootScope.currentUserFollowsRecentMedia.forEach(function(user) {
          user.forEach(function(item) {
            if (item.location) {
              var itemLocation = new google.maps.LatLng(item.location.latitude, item.location.longitude);

              var marker = new google.maps.Marker({
                position: itemLocation,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: {
                  url: item.user.profile_picture
                },
                optimized: false,
                content: '<h3>'+ item.location.name + '</h3>'
              });

              var mapLabel = new MapLabel({
                text: item.user.full_name,
                position: itemLocation,
                map: map,
                fontSize: 15,
                align: 'center',
                fontFamily: 'Courier New',
                minZoom: 12
              });

              markersArray.push(marker);
            }
          });
        });
      }

      for (var i = 0; i < markersArray.length; i++) {
        google.maps.event.addListener(markersArray[i], 'click', function(e) {
          var infoBox = new InfoBox({
            latlng: this.getPosition(),
            map: map,
            content: this.content
          });
        });
      }

      var markerCluster = new MarkerClusterer(map, markersArray, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    } else {
      initMap();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'LocalStorage', 'CurrentLocation', HomeCtrl]);
})();