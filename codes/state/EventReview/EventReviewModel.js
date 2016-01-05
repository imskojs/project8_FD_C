(function(angular) {
  'use strict';

  angular.module('app')
    .factory('EventReviewModel', EventReviewModel);

  EventReviewModel.$inject = [];

  function EventReviewModel() {

    var model = {
      loading: false,
      loadPhotos: true,
      reviews: [],
      form: {
        rate: null,
        event: '',
        content: ''
      }
    };
    return model;
  }
})(angular);
