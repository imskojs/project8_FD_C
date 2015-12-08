(function() {
  'use strict';
  angular.module('app')
    .controller('PostListRecentController', PostListRecentController);

  PostListRecentController.$inject = [
    'PostListRecentModel'
  ];

  function PostListRecentController(
    PostListRecentModel
  ) {
    var PostListRecent = this;
    PostListRecent.Model = PostListRecentModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
