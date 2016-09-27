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
          currentLocationMarker = new google.maps.Marker({
            position: LocalStorage.get('currentLocation'),
            map: map,
            title: 'You are here'
          });
    } else {
      initMap();
    }

    $rootScope.currentUserRecentMedia.forEach(function(media) {
      if (media.location) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(media.location.latitude, media.location.longitude),
          map: map,
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        });
      }
    });

    $rootScope.currentUserFollowsRecentMedia.forEach(function(user) {
      user.forEach(function(item) {
        if (item.location) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.location.latitude, item.location.longitude),
            map: map,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          });
        }
      });
    });
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'LocalStorage', 'CurrentLocation', HomeCtrl]);
})();