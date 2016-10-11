(function() {
  function Firebase($firebaseAuth) {
    return $firebaseAuth();
  }

  angular
    .module('buzz')
    .factory('Firebase', ['$firebaseAuth', Firebase]);
})();