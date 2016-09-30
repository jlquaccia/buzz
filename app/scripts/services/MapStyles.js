(function() {
  function MapStyles() {
    return {
      dayMap: function() {
        return [
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
            "elementType":"geometry",
            "stylers":[
              {
                "color":"#abd9ee"
              }
            ]
          }
        ];
      },
      nightMap: function() {
        return [
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 13
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#144b53"
              },
              {
                "lightness": 14
              },
              {
                "weight": 1.4
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#34495e"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#566777"
              },
              {
                "lightness": 5
              }
            ]
          },
          {
            "featureType": "poi.school",
            "elementType": "labels.icon",
            "stylers": [
              {
                "color": "#98acbf"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#4d5a67"
              }
            ]
          },
          // maybe lose the object below
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#3d5165"
              },
              {
                "lightness": 25
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#2e3944"
              }
            ]
          },
          // maybe lose the object below
          {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#52606f"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#445d75"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#146474"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#5a748d"
              }
            ]
          },
          {
            "featureType":"water",
            "elementType":"labels.text",
            "stylers":[
              {
                "color":"#5D6F7F"
              }
            ]
          },
          {
            "featureType":"water",
            "elementType":"labels.text.stroke",
            "stylers":[
              {
                "color":"#FFFFFF"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#021019"
              }
            ]
          }
        ];
      }
    };
  }

  angular
    .module('buzz')
    .factory('MapStyles', [MapStyles]);
})();