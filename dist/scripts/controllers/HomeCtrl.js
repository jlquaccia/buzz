(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, uiGmapGoogleMapApi, hasInstagram) {
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
    

    console.log(hasInstagram)
    uiGmapGoogleMapApi.then(function(maps) {

    });
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', 'uiGmapGoogleMapApi', 'hasInstagram', HomeCtrl]);
})();