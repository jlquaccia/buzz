(function() {
  function TextFilters() {
    return {
      toTitleCase: function(string) {
        return string.replace(/\w\S*/g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }
    };
  }

  angular
    .module('buzz')
    .factory('TextFilters', [TextFilters]);
})();