(function() {
  function Cookies($cookies) {
    return {
      setCookie: function(str, item) {
        $cookies.put(str, item);
      },
      getCookie: function(str) {
        $cookies.get(str);
      }
    };
  }

  angular
    .module('buzz')
    .factory('Cookies', ['$cookies', Cookies]);
})();