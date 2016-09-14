(function() {
  function config($stateProvider, $locationProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html'
      })
      .state('callback',{
        url: '/callback?access_token',
        controller: 'CallbackCtrl as callback',
        resolve: {
          'urlFix': ['$location', '$stateParams', '$rootScope', function($location, $stateParams, $rootScope){
            $location.url($location.url().replace("#","?"));
            $rootScope.accessToken = $stateParams.access_token;
          }]
        }
      });

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB3YdIk9nxLbTsRtNbVjmmX2a2ydksCBzI',
      v: '3.20',
      libraries: 'weather,geometry,visualization'
    });
  }

  angular
    .module('buzz', ['ui.router', 'uiGmapgoogle-maps', 'ngResource'])
    .config(config);
})();