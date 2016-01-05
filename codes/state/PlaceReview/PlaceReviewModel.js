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
        rate: null,
        place: '',
        content: ''
      }
    };

    return Model;
  }
})();
