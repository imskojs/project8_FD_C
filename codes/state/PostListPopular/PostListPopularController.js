(function() {
  'use strict';
  angular.module('app')
    .controller('PostListPopularController', PostListPopularController);

  PostListPopularController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'PostListPopularModel', 'U', 'Post', 'Preload'
  ];

  function PostListPopularController(
    $scope, $q, $ionicScrollDelegate,
    PostListPopularModel, U, Post, Preload
  ) {
    var PostListPopular = this;
    PostListPopular.Model = PostListPopularModel;
    var noLoadingStates = [];

    PostListPopular.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostListPopularModel.posts = [];
        $ionicScrollDelegate.scrollTop(false);
        PostListPopularModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostListPopularModel, 'posts');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var length = PostListPopularModel.posts.length;
      return find({
          skip: length
        })
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostListPopularModel, 'posts');
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
        sort: 'likes DESC',
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
