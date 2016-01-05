(function() {
  'use strict';
  angular.module('app')
    .controller('PlaceReviewController', PlaceReviewController);

  PlaceReviewController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate', '$state', '$timeout',
    'PlaceReviewModel', 'U', 'Review', 'Preload', 'Message'
  ];

  function PlaceReviewController(
    $scope, $q, $ionicScrollDelegate, $state, $timeout,
    PlaceReviewModel, U, Review, Preload, Message
  ) {
    var PlaceReview = this;
    PlaceReview.Model = PlaceReviewModel;
    var noLoadingStates = [];

    PlaceReview.refresh = refresh;
    PlaceReview.loadMore = loadMore;
    PlaceReview.createReview = createReview;
    PlaceReview.deleteReview = deleteReview;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function createReview() {
      var ok = validate();
      if (!ok) {
        return false;
      }
      Message.loading();
      Review.createPlaceReview({}, {
          rate: PlaceReviewModel.form.rate,
          place: $state.params.place,
          content: PlaceReviewModel.form.content
        }).$promise
        .then(function(review) {
          console.log("---------- review ----------");
          console.log(review);
          $timeout(function() {
            PlaceReviewModel.reviews.push(review);
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

    function deleteReview(review, $index) {
      Message.loading();
      Review.destroyPlaceReview({
          id: review.id
        }).$promise
        .then(function(updatedPlace) {
          console.log("---------- updatedPlace ----------");
          console.log(updatedPlace);
          $timeout(function() {
            PlaceReviewModel.reviews.splice($index, 1);
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
        PlaceReviewModel.reviews = [];
        $ionicScrollDelegate.scrollTop(false);
        PlaceReviewModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(placesWrapper) {
            console.log(placesWrapper);
            U.bindData(placesWrapper, PlaceReviewModel, 'reviews');
            console.log("---------- PlaceReviewModel.form.rate ----------");
            console.log(PlaceReviewModel.form.rate);
          })
          .catch(U.error);
      }

      console.log("---------- $state.params.place ----------");
      console.log($state.params.place);
      console.log("HAS TYPE: " + typeof $state.params.place);

    }

    function refresh() {
      return find()
        .then(function(placesWrapper) {
          console.log(placesWrapper);
          U.bindData(placesWrapper, PlaceReviewModel, 'reviews');
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
        .then(function(placesWrapper) {
          U.appendData(placesWrapper, PlaceReviewModel, 'reviews');
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
        place: $state.params.place,
        sort: 'id asc',
        limit: 900,
        populates: 'createdBy,place'
      };
      angular.extend(query, extraQuery);
      return Review.findPlaceReviews(query).$promise
        .then(function(placesWrapper) {
          var photosPromise = Preload.photos(placesWrapper.reviews, 'Cloudinary200', true);
          return $q.all([placesWrapper, photosPromise]);
        })
        .then(function(array) {
          var placesWrapper = array[0];
          return placesWrapper;
        });
    }

    function validate() {
      var form = PlaceReviewModel.form;
      if (!form.rate) {
        Message.alert('리뷰쓰기 알림.', '별점을 입력해주세요.');
        return false;
      } else if (!form.content) {
        Message.alert('리뷰쓰기 알림.', '내용을 입력해주세요.');
        return false;
      }
      return true;
    }

    function reset() {
      PlaceReviewModel.form.content = '';
    }

  }
})();
