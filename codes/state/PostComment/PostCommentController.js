(function(angular) {
  'use strict';
  angular.module('app')
    .controller('PostCommentController', PostCommentController);

  PostCommentController.$inject = [
    '$scope', '$q',
    'PostCommentModel', 'Review', 'Message', 'U', 'Preload'
  ];

  function PostCommentController(
    $scope, $q,
    PostCommentModel, Review, Message, U, Preload
  ) {
    var PostComment = this;
    PostComment.Model = PostCommentModel;
    // var noLoadingStates = [];

    PostComment.refresh = refresh;
    PostComment.loadMore = loadMore;

    // $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    // $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    // function onBeforeEnter() {
    //   if (!U.areSiblingViews(noLoadingStates)) {
    //     PostCommentModel.loading = true;
    //   }
    // }

    // function onAfterEnter() {
    //   if (!U.areSiblingViews(noLoadingStates)) {
    //     return find()
    //       .then(function(commentsWrapper) {
    //         console.log(commentsWrapper);
    //         U.bindData(commentsWrapper, PostCommentModel, 'comments');
    //       })
    //       .catch(U.error);
    //   }
    // }

    function refresh() {
      return find()
        .then(function(commentsWrapper) {
          console.log(commentsWrapper);
          U.bindData(commentsWrapper, PostCommentModel, 'comments');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = PostCommentModel.comments.length - 1;
      return find({
          olderThan: PostCommentModel.comments[last]
        })
        .then(function(commentsWrapper) {
          U.appendData(commentsWrapper, PostCommentModel, 'comments');
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
        category: 'notification',
        limit: 20,
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Review.find(query).$promise
        .then(function(commentsWrapper) {
          var photosPromise = Preload.photos(commentsWrapper.comments, 'Cloudinary200', true);
          return $q.all([commentsWrapper, photosPromise]);
        })
        .then(function(array) {
          var commentsWrapper = array[0];
          return commentsWrapper;
        });
    }

  } //end
})(angular);
