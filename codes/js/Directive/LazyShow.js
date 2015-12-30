(function(angular) {
  'use strict';

  angular.module('app')
    .directive('lazyShow', lazyShow);

  lazyShow.$inject = [];

  function lazyShow() {
    return {
      restrict: 'A',
      compile: compile
    };

    function compile(element) {
      element.addClass('lazy-show');
      return function() {

      }
    }
  }

})(angular);
