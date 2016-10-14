(function() {
  function AuthCtrl($scope, $state, $rootScope, Firebase, TopNavbarLinks, LocalStorage) {
    $scope.register = function() {
      Firebase.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
        $scope.login();
      }, function(error) {
        $scope.firebaseError = error.message;
      });
    }

    $scope.login = function() {
      Firebase.$signInWithEmailAndPassword($scope.email, $scope.password).then(function(user) {
        $state.go('home');
      }, function(error) {
        $scope.firebaseError = error.message;
      });
    }

    // This has to do with the password match check directive
    $scope.pw1 = '';

    // Set active top navbar link
    $rootScope.activeLink = function(event) {
      TopNavbarLinks.activeLink(event);
    };

    $rootScope.removeActiveLink = function() {
      TopNavbarLinks.removeActiveLink();
    };
  }

  angular
    .module('buzz')
    .controller('AuthCtrl', ['$scope', '$state', '$rootScope', 'Firebase', 'TopNavbarLinks', 'LocalStorage', AuthCtrl]);
})();