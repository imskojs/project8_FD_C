(function() {
  'use strict';
  angular.module('app')
    .controller('PostListController', PostListController);

  PostListController.$inject = [
    '$scope',
    'PostListModel', 'U'
  ];

  function PostListController(
    $scope,
    PostListModel, U
  ) {

    var PostList = this;
    PostList.Model = PostListModel;
    PostList.goToCreatePost = goToCreatePost;

    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function goToCreatePost() {
      var params = {};
      if (U.isState('Main.MainTab.PostList.PostListRecent')) {
        params.category = 'NORMAL-POST';
        params.from = 'PostListRecent';
      } else if (U.isState('Main.MainTab.PostList.PostListPopular')) {
        params.category = 'NORMAL-POST';
        params.from = 'PostListPopular';
      } else if (U.isState('Main.MainTab.PostList.PostListContent')) {
        params.category = 'CONTENTS-POST';
      } else {
        console.log('No PostList Child State');
        return false;
      }
      return U.goToState('Main.PostCreate', params, 'forward');
    }
  }
})();
