(function() {
  'use strict';
  angular.module('app')
    .controller('PostListContentController', PostListContentController);

  PostListContentController.$inject = [
    'PostListContentModel'
  ];

  function PostListContentController(
    PostListContentModel
  ) {
    var PostListContent = this;
    PostListContent.Model = PostListContentModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
