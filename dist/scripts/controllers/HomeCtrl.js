(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, LocalStorage, CurrentLocation, Firebase, TopNavbarLinks) {
    // Set active top navbar link
    $rootScope.activeLink = function(event) {
      TopNavbarLinks.activeLink(event);
    };

    $rootScope.removeActiveLink = function() {
      TopNavbarLinks.removeActiveLink();
    };

    if (!$rootScope.loggedIn) {
      $rootScope.currentUserFollows = LocalStorage.get('currentUserFollows');
      $rootScope.currentUserFollowsRecentMedia = LocalStorage.get('currentUserFollowsRecentMedia');
      $rootScope.currentUserRecentMedia = LocalStorage.get('currentUserRecentMedia');
    }

    if (localStorage.currentLocation) {
      CurrentLocation.getMapFromLocalStorage();
    } else {
      CurrentLocation.initMap();
    }

    $rootScope.logout = function() {
      Firebase.$signOut();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'LocalStorage', 'CurrentLocation', 'Firebase', 'TopNavbarLinks', HomeCtrl]);
})();