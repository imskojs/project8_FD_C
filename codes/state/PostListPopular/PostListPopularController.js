(function() {
  'use strict';
  angular.module('app')
    .controller('PostListPopularController', PostListPopularController);

  PostListPopularController.$inject = [
    'PostListPopularModel'
  ];

  function PostListPopularController(
    PostListPopularModel
  ) {
    var PostListPopular = this;
    PostListPopular.Model = PostListPopularModel;


    //====================================================
    //  Implementation
    //====================================================
  }
})();
