(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceEventController', PlaceEventController);

  PlaceEventController.$inject = [
    'PlaceEventModel'
  ];

  function PlaceEventController(
    PlaceEventModel
  ) {
    var PlaceEvent = this;
    PlaceEvent.Model = PlaceEventModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
