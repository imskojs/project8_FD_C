(function() {
  'use strict';
  angular.module('app')
    .factory('DaumMapModel', DaumMapModel);

  function DaumMapModel() {
    var model = {
      currentPosition: {
        latitude: null,
        longitude: null
      },
      markers: [],
      places: [],
      selectedPlace: {},
      modal: {},
      findMeThenSearchNearBy: function() {},
      searchLocationNearBy: function() {},
      filterByEvent: false
    };

    return model;
  }
})();
