(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceReviewModel', PlaceReviewModel);

  PlaceReviewModel.$inject = [];

  function PlaceReviewModel() {

    var Model = {
      loading: true,
      loadPhotos: true,
      reviews: [],
      form: {
        rate: 5,
        place: '',
        content: ''
      }
    };

    return Model;
  }
})();
