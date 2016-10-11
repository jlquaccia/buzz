(function() {
  function TopNavbarLinks() {
    return {
      activeLink: function(event) {
        $('.topNavAnchor').removeClass('currentTopNavListItem');
        $(event.target).addClass('currentTopNavListItem');
      },
      removeActiveLink: function() {
        $('.topNavAnchor').removeClass('currentTopNavListItem');
      }
    };
  }

  angular
    .module('buzz')
    .factory('TopNavbarLinks', [TopNavbarLinks]);
})();