(function() {
  function LocalStorage() {
    return {
      set: function(str, item) {
        localStorage.setItem(str, JSON.stringify(item));
      },
      get: function(str) {
        return JSON.parse(localStorage.getItem(str));
      }
    };
  }

  angular
    .module('buzz')
    .factory('LocalStorage', [LocalStorage]);
})();