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
      var map = new google.maps.Map(document.getElementById('map-canvas'), LocalStorage.get('currentLocationMapOptions')),
          currentLocationMapLabel = new MapLabel({
            text: 'You are here',
            position: new google.maps.LatLng(LocalStorage.get('currentLocation')),
            map: map,
            fontSize: 15,
            align: 'center'
          }),
          currentLocationMarker = new google.maps.Marker({
            position: LocalStorage.get('currentLocation'),
            map: map
          });

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
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(media.location.latitude, media.location.longitude),
              map: map,
              animation: google.maps.Animation.DROP,
              icon: media.user.profile_picture,
              optimized: false
            });
          }
        });
      }

      if ($rootScope.currentUserFollowsRecentMedia) {
        // create pins for places that the current users friends have been to recently
        $rootScope.currentUserFollowsRecentMedia.forEach(function(user) {
          user.forEach(function(item) {
            if (item.location) {
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(item.location.latitude, item.location.longitude),
                map: map,
                animation: google.maps.Animation.DROP,
                icon: {
                  url: item.user.profile_picture
                },
                optimized: false
              });
            }
          });
        });
      }
    } else {
      initMap();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'LocalStorage', 'CurrentLocation', HomeCtrl]);
})();