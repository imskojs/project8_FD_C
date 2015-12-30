(function(angular) {
  'use strict';
  angular.module('app')
    .controller('NotificationDetailController', NotificationDetailController);

  NotificationDetailController.$inject = [
    '$scope', '$state', '$q',
    'NotificationDetailModel', 'Post', 'Message', 'U', 'Preload'
  ];

  function NotificationDetailController(
    $scope, $state, $q,
    NotificationDetailModel, Post, Message, U, Preload
  ) {
    var NotificationDetail = this;
    NotificationDetail.Model = NotificationDetailModel;

    NotificationDetail.refresh = refresh;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      NotificationDetailModel.loading = true;
    }

    function onAfterEnter() {
      return findOne()
        .then(function(post) {
          console.log(post);
          U.bindData(post, NotificationDetailModel, 'post');
        })
        .catch(U.error);
    }

    function refresh() {
      return findOne()
        .then(function(post) {
          console.log(post);
          U.bindData(post, NotificationDetailModel, 'post');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Implementations
    //====================================================
    function findOne(extraQuery) {
      var query = {
        id: $state.params.id,
        populates: 'photos,createdBy'
      };
      angular.extend(query, extraQuery);
      return Post.findOne(query).$promise
        .then(function(post) {
          var photosPromise = Preload.photos(post, 'Cloudinary600', false);
          return $q.all([post, photosPromise]);
        })
        .then(function(array) {
          var post = array[0];
          return post;
        });
    }

  } //end
})(angular);
