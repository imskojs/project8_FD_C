//==========================================================================
//              Style for user selection.
//==========================================================================

(function(angular) {
  'use strict';

  angular.module('app')
    .directive('autoHeight', autoHeight);

  autoHeight.$inject = [];

  function autoHeight() {
    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element) {
      element.on('keyup', function() {
        element.css('height', '100%');
      });
    }
  }

})(angular);
