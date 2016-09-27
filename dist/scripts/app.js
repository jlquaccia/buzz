(function() {
  function config($stateProvider, $locationProvider, $urlRouterProvider) {
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
        templateUrl: '/templates/home.html',
        resolve: {
          'hasInstagram': function($location) {
            return true;
          }
        }
      })
      .state('instaAuth',{
        url: '/access_token={accessToken}',
        controller: 'CallbackCtrl as callback',
        resolve: {
          'hasInstagram': function($location, $stateParams, $rootScope, $timeout, LocalStorage) {
            var final = $.Deferred();

            if ($stateParams.accessToken !== undefined) {
              $rootScope.loggedIn = true;
              var userIds = [];

              // current user follows list
              $.ajax({
                url: 'https://api.instagram.com/v1/users/self/follows?access_token=' + $stateParams.accessToken,
                type: 'get',
                dataType: 'jsonp',
                crossOrigin: true,
                cache: true
              }).done(function(response) {
                LocalStorage.set('currentUserFollows', response.data);
                $rootScope.currentUserFollows = response.data;
                
                for (var i = 0; i < response.data.length; i++) {
                  userId = response.data[i].id;
                  userIds.push(userId);
                }

                // recent media by user's the current user follows (tagged w/ location)
                var followsRecentMediaArray = [];

                var promises = [];

                function recentFollowMediaAjax(userId) {
                  var slayer = $.Deferred();
                  promises.push(slayer);

                   $.ajax({
                    url: 'https://api.instagram.com/v1/users/' + userIds[i] + '/media/recent/?access_token=' + $stateParams.accessToken + '&count=50',
                    type: 'get',
                    dataType: 'jsonp',
                    crossOrigin: true,
                    cache: true,
                    success: function(response) {
                      slayer.resolve(followsRecentMediaArray.push(response.data));
                    },
                    error: function(response) {
                      console.log('something went wrong');
                    }
                  });
                }

                for (var i = 0; i < userIds.length; i++) {
                  (function(i) {
                    recentFollowMediaAjax(userIds[i]);
                  })(i);
                }


                $.when(...promises).done(function(){
                  LocalStorage.set('currentUserFollowsRecentMedia', followsRecentMediaArray);
                  final.resolve($rootScope.currentUserFollowsRecentMedia = followsRecentMediaArray);
                });

              });

              // recent media by current user (tagged w/ location)
              $.ajax({
                url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + $stateParams.accessToken + '&count=30',
                type: 'get',
                dataType: 'jsonp',
                crossOrigin: true,
                cache: true
              }).done(function(response) {
                var data = response.data;

                LocalStorage.set('currentUserRecentMedia', data);
                $rootScope.currentUserRecentMedia = data;
              });
            } else {
              $rootScope.loggedIn = false;
            }

            return final;
          }
        }
      });
  }

  angular
    .module('buzz', ['ui.router', 'ngResource'])
    .config(config);
})();