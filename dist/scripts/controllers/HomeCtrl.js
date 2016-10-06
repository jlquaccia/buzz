(function() {
  function HomeCtrl($scope, $stateParams, $rootScope, $timeout, LocalStorage, CurrentLocation, MapStyles) {
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

    var initMap = function() {
      google.maps.event.addDomListener(window, 'load', CurrentLocation.getLocation());
    };

    if (localStorage.currentLocation) {
      var service;
      var markersArray = [];
      var times = SunCalc.getTimes(new Date(), LocalStorage.get('currentLat'), LocalStorage.get('currentLng'));
      var mapOptions = {
        center: new google.maps.LatLng(LocalStorage.get('currentLat'), LocalStorage.get('currentLng')),
        zoom: 10,
        styles: Date.now() < times.dusk ? MapStyles.dayMap() : MapStyles.nightMap()
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var currentLocationMapLabel = new MapLabel({
        text: 'You are here',
        position: new google.maps.LatLng(LocalStorage.get('currentLocation')),
        map: map,
        fontSize: 15,
        align: 'center',
        fontFamily: 'Courier New'
      });

      var currentLocationMarker = new google.maps.Marker({
        position: LocalStorage.get('currentLocation'),
        map: map,
        content: '<h1>Current Location</h1>'
      });

      markersArray.push(currentLocationMarker);

      // myoverlay allows ability to style each marker image
      var myoverlay = new google.maps.OverlayView();

      myoverlay.draw = function() {
        this.getPanes().markerLayer.id='markerLayer';
      };

      myoverlay.setMap(map);

      if ($rootScope.currentUserRecentMedia) {
        // create pins for places the current user has been recently
        $rootScope.currentUserRecentMedia.forEach(function(media) {
          if (media.location) {
            var mediaLocation = new google.maps.LatLng(media.location.latitude, media.location.longitude);

            var request = {
              location: mediaLocation,
              query: media.location.name
            }

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);

            function callback(results, status) {
              if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                  var place = results[i];

                  createMarker(place);
                }
              }
            }

            function createMarker(place) {
              var placeLoc = place.geometry.location;

              var marker = new google.maps.Marker({
                position: mediaLocation,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: media.user.profile_picture,
                optimized: false,
                content: '<h5>'+ media.location.name + '</h5>' +
                         '<ul>' +
                          '<li>' + place.formatted_address + '</li>' +
                          '<li>' + place.icon + '</li>' +
                          '<li>' + place.photos + '</li>' +
                          '<li>' + place.rating + '</li>' +
                          '<li>' + place.types + '</li>' +
                         '</ul>'
              });

              markersArray.push(marker);

              var mapLabel = new MapLabel({
                text: media.user.full_name,
                position: mediaLocation,
                map: map,
                fontSize: 15,
                align: 'center',
                fontFamily: 'Courier New',
                minZoom: 12
              });

              google.maps.event.addListener(marker, 'click', function(e) {
                var infoBox = new InfoBox({
                  latlng: this.getPosition(),
                  map: map,
                  content: this.content
                });
              });
            }
          }
        });
      }

      if ($rootScope.currentUserFollowsRecentMedia) {
        // create pins for places that the current users friends have been to recently
        $rootScope.currentUserFollowsRecentMedia.forEach(function(user) {
          user.forEach(function(item) {
            if (item.location) {
              var itemLocation = new google.maps.LatLng(item.location.latitude, item.location.longitude);

              var marker = new google.maps.Marker({
                position: itemLocation,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: {
                  url: item.user.profile_picture
                },
                optimized: false,
                content: '<h5>'+ item.location.name + '</h5><br>' +
                         '<div class="innerContent">' +
                           '<ul>' +
                            '<li>Reviews</li>' +
                            '<li>Website</li>' +
                            '<li>isOpenOrNot</li>' +
                            '<li>Category</li>' +
                            '<li>Phone Number</li>' +
                            '<li>Address</li>' +
                            '<li>'+ item.location.latitude + '</li>' +
                            '<li>'+ item.location.longitude + '</li>' +
                           '</ul>' +
                         '</div>' 
              });

              var mapLabel = new MapLabel({
                text: item.user.full_name,
                position: itemLocation,
                map: map,
                fontSize: 15,
                align: 'center',
                fontFamily: 'Courier New',
                minZoom: 12
              });

              markersArray.push(marker);
            }
          });
        });
      }

      // for (var i = 0; i < markersArray.length; i++) {
      //   google.maps.event.addListener(markersArray[i], 'click', function(e) {
      //     var infoBox = new InfoBox({
      //       latlng: this.getPosition(),
      //       map: map,
      //       content: this.content
      //     });
      //   });
      // }

      console.log(markersArray);

      $timeout(function() {
        var markerCluster = new MarkerClusterer(map, markersArray, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }, 1000);

    } else {
      initMap();
    }
  }

  angular
    .module('buzz')
    .controller('HomeCtrl', ['$scope', '$stateParams', '$rootScope', '$timeout', 'LocalStorage', 'CurrentLocation', 'MapStyles', HomeCtrl]);
})();