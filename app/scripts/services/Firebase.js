(function() {
  function Firebase() {
    return firebase;
  }

  angular
    .module('buzz')
    .factory('Firebase', [Firebase]);
})();