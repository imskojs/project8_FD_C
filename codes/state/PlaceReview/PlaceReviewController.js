(function(angular) {
  'use strict';
  angular.module('app')
    .controller('PlaceReviewController', PlaceReviewController);

  PlaceReviewController.$inject = [
    '$scope', '$q',
    'PlaceReviewModel', 'Review', 'Message', 'U', 'Preload'
  ];

  function PlaceReviewController(
    $scope, $q,
    PlaceReviewModel, Review, Message, U, Preload
  ) {
    var PlaceReview = this;
    PlaceReview.Model = PlaceReviewModel;
    var noLoadingStates = [];

    PlaceReview.refresh = refresh;
    PlaceReview.loadMore = loadMore;

    // $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    // $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    // function onBeforeEnter() {
    //   if (!U.areSiblingViews(noLoadingStates)) {
    //     PlaceReviewModel.loading = true;
    //   }
    // }

    // function onAfterEnter() {
    //   if (!U.areSiblingViews(noLoadingStates)) {
    //     return find()
    //       .then(function(reviewsWrapper) {
    //         console.log(reviewsWrapper);
    //         U.bindData(reviewsWrapper, PlaceReviewModel, 'reviews');
    //       })
    //       .catch(U.error);
    //   }
    // }

    function refresh() {
      return find()
        .then(function(reviewsWrapper) {
          console.log(reviewsWrapper);
          U.bindData(reviewsWrapper, PlaceReviewModel, 'reviews');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    function loadMore() {
      var last = PlaceReviewModel.reviews.length - 1;
      return find({
          olderThan: PlaceReviewModel.reviews[last]
        })
        .then(function(reviewsWrapper) {
          U.appendData(reviewsWrapper, PlaceReviewModel, 'reviews');
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
