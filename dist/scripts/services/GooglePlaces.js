(function() {
  function GooglePlaces($rootScope) {
    return {
      addMarkersToMap: function(item) {
        var itemLocation = new google.maps.LatLng(item.location.latitude, item.location.longitude);

        var marker = new google.maps.Marker({
          position: itemLocation,
          map: $rootScope.map,
          animation: google.maps.Animation.DROP,
          icon: item.user.profile_picture,
          optimized: false,
          query: item.location.name
        });

        var mapLabel = new MapLabel({
          text: item.user.full_name,
          position: itemLocation,
          map: $rootScope.map,
          fontSize: 15,
          align: 'center',
          fontFamily: 'Courier New',
          minZoom: 12
        });

        return marker;
      }
    };
  }

  angular
    .module('buzz')
    .factory('GooglePlaces', ['$rootScope', GooglePlaces]);
})();