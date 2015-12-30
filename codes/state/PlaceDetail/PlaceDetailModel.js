(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceDetailModel', PlaceDetailModel);

  PlaceDetailModel.$inject = [];

  function PlaceDetailModel() {

    var model = {
      loading: true,
      loadPhotos: true,
      place: {}
    };

    return model;
  }
})();
