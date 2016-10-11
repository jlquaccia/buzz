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

    // Get the current user via firebase when logged in
    Firebase.$onAuthStateChanged(function(user) {
      $rootScope.currentUser = user;
    });

    $rootScope.logout = function() {
      Firebase.$signOut();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'LocalStorage', 'CurrentLocation', 'Firebase', 'TopNavbarLinks', HomeCtrl]);
})();