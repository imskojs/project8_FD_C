(function() {
  'use strict';

  angular.module('app')
    .factory('PlaceListModel', PlaceListModel);

  PlaceListModel.$inject = [];

  function PlaceListModel() {

    var model = {
      loading: true,
      more: true,
      places: []
    };
    return model;
  }
})();
