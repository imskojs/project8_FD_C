(function() {
  'use strict';

  angular.module('app')
    .controller('DaumMapController', DaumMapController);

  DaumMapController.$inject = [
    'DaumMapModel', 'Message',
    '$ionicModal', '$scope', '$state', '$stateParams', '$timeout'
  ];

  function DaumMapController(
    DaumMapModel, Message,
    $ionicModal, $scope, $state, $stateParams, $timeout
  ) {

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
      DaumMapModel.domMap.relayout();
      if ($stateParams.id) {
        DaumMapModel.findPlaceByIdThenDrawAPlace($stateParams.id);
      }
    }

    function onAfterEnter() {
      Message.loading();
      $timeout(function() {
        DaumMapModel.domMap.relayout();
        if ($stateParams.findMe === 'true') {
          DaumMapModel.findMeThenSearchNearBy();
        } else {
          Message.hide();
        }
      }, 10);
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
