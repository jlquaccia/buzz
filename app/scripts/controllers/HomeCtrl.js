(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, uiGmapGoogleMapApi, LocalStorage) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    uiGmapGoogleMapApi.then(function(maps) {

    });

    if (!$rootScope.loggedIn) {
      $rootScope.currentUserFollows = LocalStorage.get('currentUserFollows');
      $rootScope.currentUserFollowsRecentMedia = LocalStorage.get('currentUserFollowsRecentMedia');
      $rootScope.currentUserRecentMedia = LocalStorage.get('currentUserRecentMedia');
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'uiGmapGoogleMapApi', 'LocalStorage', HomeCtrl]);
})();