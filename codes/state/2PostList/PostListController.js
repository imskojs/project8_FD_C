(function() {
  'use strict';
  angular.module('app')
    .controller('PostListController', PostListController);

  PostListController.$inject = ['$scope', 'PostListModel', '$timeout'];

  function PostListController($scope, PostListModel, $timeout) {

    var PostList = this;
    PostList.Model = PostListModel;


    $scope.$on('$ionicView.afterEnter', onAfterEnter);
    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);
    //------------------------
    //  IMPLEMENTATIONS
    //------------------------
    function onAfterEnter() {
      $timeout(function() {
        PostList.loadPhotos = true;
      }, 100);
    }

    function onBeforeLeave() {
      PostList.loadPhotos = false;
    }
  }
})();
