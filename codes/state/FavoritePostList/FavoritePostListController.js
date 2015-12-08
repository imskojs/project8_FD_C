(function() {
  'use strict';
  angular.module('app')
    .controller('FavoritePostListController', FavoritePostListController);

  FavoritePostListController.$inject = [
    'FavoritePostListModel'
  ];

  function FavoritePostListController(
    FavoritePostListModel
  ) {
    var FavoritePostList = this;
    FavoritePostList.Model = FavoritePostListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
