(function(angular) {
  'use strict';

  angular.module('app')
    .factory('EventDetailModel', EventDetailModel);

  EventDetailModel.$inject = [];

  function EventDetailModel() {

    var model = {
      event: {}
    };
    return model;
  }
})(angular);
