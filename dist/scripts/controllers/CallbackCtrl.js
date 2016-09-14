(function() {
  function CallbackCtrl($state, $stateParams) {
    console.log($stateParams.access_token);
    $state.go('home');
  }

  angular
    .module('buzz')
    .controller('CallbackCtrl', ['$state', '$stateParams', CallbackCtrl]);
})();