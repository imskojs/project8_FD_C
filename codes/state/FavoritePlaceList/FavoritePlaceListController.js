(function() {
  'use strict';
  angular.module('app')
    .controller('FavoritePlaceListController', FavoritePlaceListController);

  FavoritePlaceListController.$inject = [
    'FavoritePlaceListModel'
  ];

  function FavoritePlaceListController(
    FavoritePlaceListModel
  ) {
    var FavoritePlaceList = this;
    FavoritePlaceList.Model = FavoritePlaceListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
