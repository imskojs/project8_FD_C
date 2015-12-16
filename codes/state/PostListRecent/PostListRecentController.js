(function() {
  'use strict';
  angular.module('app')
    .controller('PostListRecentController', PostListRecentController);

  PostListRecentController.$inject = [
    '$scope',
    'PostListRecentModel'
  ];

  function PostListRecentController(
    $scope,
    PostListRecentModel
  ) {
    var PostListRecent = this;
    PostListRecent.Model = PostListRecentModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
