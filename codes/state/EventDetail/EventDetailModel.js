(function(angular) {
  'use strict';

  angular.module('app')
    .factory('EventDetailModel', EventDetailModel);

  EventDetailModel.$inject = [];

  function EventDetailModel() {

    var model = {
      event: {
        averageStars: 4,
        photos: [{
          url: 'http://placehold.it/800x1200'
        }]
      }
    };
    return model;
  }
})(angular);
