(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, uiGmapGoogleMapApi) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    uiGmapGoogleMapApi.then(function(maps) {

    });

    // $scope.currentUserFollows = 'https://api.instagram.com/v1/users/self/follows?access_token=' + $rootScope.accessToken;
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'uiGmapGoogleMapApi', HomeCtrl]);
})();