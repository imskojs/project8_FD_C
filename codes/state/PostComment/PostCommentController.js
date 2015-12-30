(function() {
  'use strict';
  angular.module('app')
    .controller('PostCommentController', PostCommentController);

  PostCommentController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate', '$state', '$timeout',
    'PostCommentModel', 'U', 'Comment', 'Preload', 'Message'
  ];

  function PostCommentController(
    $scope, $q, $ionicScrollDelegate, $state, $timeout,
    PostCommentModel, U, Comment, Preload, Message
  ) {
    var PostComment = this;
    PostComment.Model = PostCommentModel;
    var noLoadingStates = [];

    PostComment.refresh = refresh;
    PostComment.loadMore = loadMore;
    PostComment.createComment = createComment;
    PostComment.deleteComment = deleteComment;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function createComment() {
      Message.loading();
      Comment.create({}, {
          post: $state.params.post,
          content: PostCommentModel.form.content
        }).$promise
        .then(function(comment) {
          console.log("---------- comment ----------");
          console.log(comment);
          $timeout(function() {
            PostCommentModel.comments.push(comment);
            reset();
            U.resize();
            Message.alert('댓글달기 알림', '댓글이 성공적으로 작성되었습니다.');
          }, 0);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert();
        });
    }

    function deleteComment(comment, $index) {
      Message.loading();
      Comment.destroy({
          id: comment.id
        }).$promise
        .then(function(deletedComment) {
          console.log("---------- deletedComment ----------");
          console.log(deletedComment);
          $timeout(function() {
            PostCommentModel.comments.splice($index, 1);
            U.resize();
            Message.hide();
          }, 0);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.hide();
          Message.alert();
        });
    }

    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        PostCommentModel.comments = [];
        $ionicScrollDelegate.scrollTop(false);
        PostCommentModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, PostCommentModel, 'comments');
          })
          .catch(U.error);
      }

      console.log("---------- $state.params.post ----------");
      console.log($state.params.post);
      console.log("HAS TYPE: " + typeof $state.params.post);

    }

    function refresh() {
      return find()
        .then(function(postsWrapper) {
          console.log(postsWrapper);
          U.bindData(postsWrapper, PostCommentModel, 'comments');
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
        .then(function(postsWrapper) {
          U.appendData(postsWrapper, PostCommentModel, 'comments');
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
        post: $state.params.post,
        sort: 'id asc',
        populates: 'createdBy'
      };
      angular.extend(query, extraQuery);
      return Comment.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.comments, 'Cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

    function reset() {
      PostCommentModel.form.content = '';
    }

  }
})();
