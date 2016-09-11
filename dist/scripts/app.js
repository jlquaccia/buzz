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
      });

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyB3YdIk9nxLbTsRtNbVjmmX2a2ydksCBzI',
      v: '3.20',
      libraries: 'weather,geometry,visualization'
    });
  }

  angular
    .module('buzz', ['ui.router', 'uiGmapgoogle-maps'])
    .config(config);
})();