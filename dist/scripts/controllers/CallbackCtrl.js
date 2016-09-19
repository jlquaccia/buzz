(function() {
  function CallbackCtrl($state) {
    $state.go('home');
  }

  angular
    .module('buzz')
    .controller('CallbackCtrl', ['$state', CallbackCtrl]);
})();