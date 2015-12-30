(function() {
  'use strict';
  angular.module('app')
    .controller('PostListRecentController', PostListRecentController);

  PostListRecentController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostListRecentModel', 'U', 'Post', 'Preload'
  ];

  function PostListRecentController(
    $scope, $q, $ionicScrollDelegate,
    PostListRecentModel, U, Post, Preload
  ) {
    var PostListRecent = this;
    PostListRecent.Model = PostListRecentModel;
    var noLoadingStates = [];

    PostListRecent.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostListRecentModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        PostListRecentModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostListRecentModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var last = PostListRecentModel.posts.length - 1;
      return find({
          olderThan: PostListRecentModel.posts[last].id
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostListRecentModel, 'posts');
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
        category: 'NORMAL-POST',
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
          console.log("---------- postsWrapper ----------");
          console.log(postsWrapper);
          return postsWrapper;
        });
    }

  }
})();
