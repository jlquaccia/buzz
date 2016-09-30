(function() {
  function CurrentLocation(LocalStorage) {
    function success(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      var myLocation = new google.maps.LatLng(lat, lng);
      var mapOptions = {
        center: new google.maps.LatLng(myLocation.lat(), myLocation.lng()),
        zoom: 10,
        styles: [
          {
            "featureType":"landscape",
            "elementType":"geometry.fill",
            "stylers":[
              {
                "color":"#c9edc5"
              },
              {
                "visibility":"on"
              }
            ]
          },
          {
            "featureType":"landscape.man_made",
            "elementType":"geometry.fill",
            "stylers":[
              {
                "color":"#f4f3f0"
              }
            ]
          },
          {
            "featureType":"landscape.natural",
            "elementType":"geometry.fill",
            "stylers":[
              {
                "visibility":"on"
              }
            ]
          },
          {
            "featureType":"landscape.natural.terrain",
            "elementType":"geometry.fill",
            "stylers":[
              {
                "visibility":"on"
              },
              {
                "color":"#bcdfb8"
              }
            ]
          },
          {
            "featureType":"poi",
            "elementType":"geometry",
            "stylers":[
              {
                "color":"#c8eec4"
              }
            ]
          },
          {
            "featureType":"poi.park",
            "elementType":"geometry.fill",
            "stylers":[
              {
                "color":"#c9edc5"
              }
            ]
          },
          {
            "featureType":"poi.sports_complex",
            "elementType":"geometry",
            "stylers":[
              {
                "color":"#c8eec4"
              }
            ]
          },
          {
            "featureType":"road",
            "elementType":"geometry",
            "stylers":[
              {
                "lightness":100
              },
              {
                "visibility":"simplified"
              }
            ]
          },
          {
            "featureType":"road",
            "elementType":"labels",
            "stylers":[
              {
                "visibility":"simplified"
              }
            ]
          },
          {
            "featureType":"road",
            "elementType":"labels.text",
            "stylers":[
              {
                "weight":"1"
              }
            ]
          },
          {
            "featureType":"road.highway",
            "elementType":"geometry.fill",
            "stylers":[
              {
                "lightness":"0"
              },
              {
                "color":"#ffe492"
              },
              {
                "visibility":"on"
              }
            ]
          },
          {
            "featureType":"road.highway",
            "elementType":"geometry.stroke",
            "stylers":[
              {
                "color":"#ffffff"
              },
              {
                "weight":"2.53"
              },
              {
                "visibility":"on"
              }
            ]
          },
          {
            "featureType":"road.highway",
            "elementType":"labels.text.fill",
            "stylers":[
              {
                "visibility":"on"
              }
            ]
          },
          {
            "featureType":"road.highway",
            "elementType":"labels.text.stroke",
            "stylers":[
              {
                "visibility":"on"
              },
              {
                "color":"#ffffff"
              },
              {
                "weight":"0.50"
              }
            ]
          },
          {
            "featureType":"transit.line",
            "elementType":"geometry",
            "stylers":[
              {
                "visibility":"on"
              },
              {
                "lightness":700
              }
            ]
          },
          {
            "featureType":"water",
            "elementType":"all",
            "stylers":[
              {
                "color":"#7dcdcd"
              }
            ]
          },
          {
            "featureType":"water",
            "elementType":"geometry",
            "stylers":[
              {
                "color":"#abd9ee"
              }
            ]
          }
        ]
      };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var mapLabel = new MapLabel({
        text: 'You are here',
        position: myLocation,
        map: map,
        fontSize: 15,
        align: 'center',
        fontFamily: 'Courier New'
      });
      
      var marker = new google.maps.Marker({
        position: myLocation,
        map: map
      });
          
      // myoverlay allows ability to style each marker image
      var myoverlay = new google.maps.OverlayView();

      myoverlay.draw = function() {
        this.getPanes().markerLayer.id='markerLayer';
      };

      myoverlay.setMap(map);

      LocalStorage.set('currentLocation', myLocation);
      LocalStorage.set('currentLocationMapOptions', mapOptions);
    }

    function error(e) {
      console.log('error code: ' + e.code + ', message: ' + e.message);
    }

    return {
      getLocation: function() {
        if (navigator.geolocation) {
          var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };

          navigator.geolocation.getCurrentPosition(success, error, options);
        } else {
          $('map-canvas').innerHTML = 'Geolocation is not supported by this browser.';
        }
      }
    };
  }

  angular
    .module('buzz')
    .factory('CurrentLocation', ['LocalStorage', CurrentLocation]);
})();