(function(angular) {
  'use strict';
  angular.module('app')
    .controller('EventReviewController', EventReviewController);

  EventReviewController.$inject = [
    '$scope', '$q',
    'EventReviewModel', 'Review', 'Message', 'U', 'Preload'
  ];

  function EventReviewController(
    $scope, $q,
    EventReviewModel, Review, Message, U, Preload
  ) {
    var EventReview = this;
    EventReview.Model = EventReviewModel;
    // var noLoadingStates = [];

    EventReview.refresh = refresh;
    EventReview.loadMore = loadMore;

    // $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    // $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    // function onBeforeEnter() {
    //   if (!U.areSiblingViews(noLoadingStates)) {
    //     EventReviewModel.loading = true;
    //   }
    // }

    // function onAfterEnter() {
    //   if (!U.areSiblingViews(noLoadingStates)) {
    //     return find()
    //       .then(function(reviewsWrapper) {
    //         console.log(reviewsWrapper);
    //         U.bindData(reviewsWrapper, EventReviewModel, 'reviews');
    //       })
    //       .catch(U.error);
    //   }
    // }

    function refresh() {
      return find()
        .then(function(reviewsWrapper) {
          console.log(reviewsWrapper);
          U.bindData(reviewsWrapper, EventReviewModel, 'reviews');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = EventReviewModel.reviews.length - 1;
      return find({
          olderThan: EventReviewModel.reviews[last]
        })
        .then(function(reviewsWrapper) {
          U.appendData(reviewsWrapper, EventReviewModel, 'reviews');
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
        .then(function(reviewsWrapper) {
          var photosPromise = Preload.photos(reviewsWrapper.reviews, 'Cloudinary200', true);
          return $q.all([reviewsWrapper, photosPromise]);
        })
        .then(function(array) {
          var reviewsWrapper = array[0];
          return reviewsWrapper;
        });
    }

  } //end
})(angular);
