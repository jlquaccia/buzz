(function() {
  function HomeCtrl($scope, uiGmapGoogleMapApi) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    
    uiGmapGoogleMapApi.then(function(maps) {

    });
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', 'uiGmapGoogleMapApi', HomeCtrl]);
})();