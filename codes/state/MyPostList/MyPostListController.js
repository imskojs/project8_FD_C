(function() {
  'use strict';
  angular.module('app')
    .controller('MyPostListController', MyPostListController);

  MyPostListController.$inject = [
    'MyPostListModel'
  ];

  function MyPostListController(
    MyPostListModel
  ) {
    var MyPostList = this;
    MyPostList.Model = MyPostListModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
