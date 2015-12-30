(function(angular) {
  'use strict';
  angular.module('app')
    .controller('NotificationListController', NotificationListController);

  NotificationListController.$inject = [
    '$scope', '$q',
    'NotificationListModel', 'Post', 'Message', 'U', 'Preload'
  ];

  function NotificationListController(
    $scope, $q,
    NotificationListModel, Post, Message, U, Preload
  ) {
    var NotificationList = this;
    NotificationList.Model = NotificationListModel;
    var noLoadingStates = [];


    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        NotificationListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(postsWrapper) {
            console.log(postsWrapper);
            U.bindData(postsWrapper, NotificationListModel, 'posts');
          })
          .catch(U.error);
      }
    }


    //====================================================
    //  Implementations
    //====================================================
    function find(extraQuery) {
      var query = {
        category: 'NOTICE-POST',
        limit: 999,
        populates: 'createdBy',
        sort: 'id DESC'
      };
      angular.extend(query, extraQuery);
      return Post.find(query).$promise
        .then(function(postsWrapper) {
          var photosPromise = Preload.photos(postsWrapper.posts, 'Cloudinary200', true);
          return $q.all([postsWrapper, photosPromise]);
        })
        .then(function(array) {
          var postsWrapper = array[0];
          return postsWrapper;
        });
    }

  } //end
})(angular);
