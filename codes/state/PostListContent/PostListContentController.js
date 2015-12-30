(function() {
  'use strict';
  angular.module('app')
    .controller('PostListContentController', PostListContentController);

  PostListContentController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostListContentModel', 'U', 'Post', 'Preload'
  ];

  function PostListContentController(
    $scope, $q, $ionicScrollDelegate,
    PostListContentModel, U, Post, Preload
  ) {
    var PostListContent = this;
    PostListContent.Model = PostListContentModel;
    var noLoadingStates = [];

    PostListContent.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostListContentModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        PostListContentModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostListContentModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = PostListContentModel.posts.length - 1;
      return find({
          olderThan: PostListContentModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostListContentModel, 'posts');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }
    //====================================================
    //  Implementations
    //====================================================
    function find(extraQuery) {
      var query = {
        category: 'CONTENTS-POST',
        limit: 5,
        sort: 'id DESC',
        populates: 'photos,createdBy'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary600', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  }
})();
