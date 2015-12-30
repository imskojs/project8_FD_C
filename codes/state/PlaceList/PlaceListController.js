(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceListController', PlaceListController);

  PlaceListController.$inject = [
    '$scope', '$q',
    'PlaceListModel', 'Preload', 'DaumMapModel', 'U'
  ];

  function PlaceListController(
    $scope, $q,
    PlaceListModel, Preload, DaumMapModel, U
  ) {

    var PlaceList = this;
    PlaceList.Model = PlaceListModel;

    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);

    function onBeforeEnter() {
      PlaceListModel.loading = true;
    }

    function onAfterEnter() {
      return getFromDaumMapModel()
        .then(function(placesWrapper) {
          U.bindData(placesWrapper, PlaceListModel, 'places');
        })
        .catch(U.error);
    }

    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function getFromDaumMapModel() {
      return Preload.photos(DaumMapModel.places, 'Cloudinary300', true)
        .then(function() {
          var placesWrapper = {
            places: DaumMapModel.places
          };
          return placesWrapper;
        });
    }
  }
})();
