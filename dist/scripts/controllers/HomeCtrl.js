(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, $timeout, uiGmapGoogleMapApi, LocalStorage) {
    if (localStorage.currentLocation) {
      $rootScope.map = LocalStorage.get('currentLocation');
    } else {
      $rootScope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    }

    uiGmapGoogleMapApi.then(function(maps) {
      var options = {
        enableHighAccuracy: true
      };

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        console.log(JSON.stringify($scope.position));
        $timeout(function() {
          var currentLocation = { center: {latitude: pos.coords.latitude, longitude: pos.coords.longitude}, zoom: 10 };
          LocalStorage.set('currentLocation', currentLocation);
          $rootScope.map = currentLocation;
        }, 0);
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      }, options);
    });

    if (!$rootScope.loggedIn) {
      $rootScope.currentUserFollows = LocalStorage.get('currentUserFollows');
      $rootScope.currentUserFollowsRecentMedia = LocalStorage.get('currentUserFollowsRecentMedia');
      $rootScope.currentUserRecentMedia = LocalStorage.get('currentUserRecentMedia');
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', 'uiGmapGoogleMapApi', 'LocalStorage', HomeCtrl]);
})();