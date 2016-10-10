(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, LocalStorage, CurrentLocation) {
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

    if (localStorage.currentLocation) {
      CurrentLocation.getMapFromLocalStorage();
    } else {
      CurrentLocation.initMap();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'LocalStorage', 'CurrentLocation', HomeCtrl]);
})();