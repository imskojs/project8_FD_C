(function() {
  'use strict';

  angular.module('app')
    .controller('DaumMapController', DaumMapController);

  DaumMapController.$inject = [
    'DaumMapModel', 'Message',
    '$ionicModal', '$scope', '$state', '$stateParams', '$timeout', '$window'
  ];

  function DaumMapController(
    DaumMapModel, Message,
    $ionicModal, $scope, $state, $stateParams, $timeout, $window
  ) {

    var daum = $window.daum;
    var DaumMap = this;
    DaumMap.Model = DaumMapModel;

    DaumMap.searchType = "address";

    DaumMap.findMeThenSearchNearBy = DaumMapModel.findMeThenSearchNearBy;
    DaumMap.searchLocationNearBy = DaumMapModel.searchLocationNearBy;

    $scope.$on('$ionicView.enter', onEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Implementation
    //====================================================
    function onEnter() {
      if ($stateParams.id) {
        DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
      }
    }

    function onAfterEnter() {
      $timeout(function() {
        DaumMapModel.domMap.relayout();
      }, 20);
      var latitude;
      var longitude;
      $timeout(function() {
        if ($stateParams.id) {
          DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
        } else if (DaumMapModel.selectedPlace.geoJSON &&
          DaumMapModel.selectedPlace.geoJSON.coordinates) {
          latitude = DaumMapModel.selectedPlace.geoJSON.coordinates[1];
          longitude = DaumMapModel.selectedPlace.geoJSON.coordinates[0];
          DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude, longitude));
          // DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude + 0.01, longitude + 0.01));
          // DaumMapModel.domMap.panTo(new daum.maps.LatLng(latitude - 0.01, longitude - 0.01));
        }
      }, 30);
    }

    //====================================================
    //  Modals
    //====================================================
    $ionicModal.fromTemplateUrl('state/DaumMap/PlaceModal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      })
      .then(function(modal) {
        DaumMapModel.modal = modal;
      });
  }
})();
