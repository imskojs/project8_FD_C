(function() {
  'use strict';
  angular.module('app')
    .controller('EventReviewController', EventReviewController);

  EventReviewController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate', '$state', '$timeout',
    'EventReviewModel', 'U', 'Review', 'Preload', 'Message'
  ];

  function EventReviewController(
    $scope, $q, $ionicScrollDelegate, $state, $timeout,
    EventReviewModel, U, Review, Preload, Message
  ) {
    var EventReview = this;
    EventReview.Model = EventReviewModel;
    var noLoadingStates = [];

    EventReview.refresh = refresh;
    EventReview.loadMore = loadMore;
    EventReview.createReview = createReview;
    EventReview.deleteReview = deleteReview;

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
      Review.createEventReview({}, {
          rate: EventReviewModel.form.rate,
          event: $state.params.event,
          content: EventReviewModel.form.content
        }).$promise
        .then(function(review) {
          console.log("---------- review ----------");
          console.log(review);
          $timeout(function() {
            EventReviewModel.reviews.push(review);
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
      Review.destroyEventReview({
          id: review.id
        }).$promise
        .then(function(updatedEvent) {
          console.log("---------- updatedEvent ----------");
          console.log(updatedEvent);
          $timeout(function() {
            EventReviewModel.reviews.splice($index, 1);
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
        EventReviewModel.reviews = [];
        $ionicScrollDelegate.scrollTop(false);
        EventReviewModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(eventsWrapper) {
            console.log(eventsWrapper);
            U.bindData(eventsWrapper, EventReviewModel, 'reviews');
            console.log("---------- EventReviewModel.form.rate ----------");
            console.log(EventReviewModel.form.rate);
          })
          .catch(U.error);
      }

      console.log("---------- $state.params.event ----------");
      console.log($state.params.event);
      console.log("HAS TYPE: " + typeof $state.params.event);

    }

    function refresh() {
      return find()
        .then(function(eventsWrapper) {
          console.log(eventsWrapper);
          U.bindData(eventsWrapper, EventReviewModel, 'reviews');
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
        .then(function(eventsWrapper) {
          U.appendData(eventsWrapper, EventReviewModel, 'reviews');
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
        event: $state.params.event,
        sort: 'id asc',
        limit: 900,
        populates: 'createdBy,event'
      };
      angular.extend(query, extraQuery);
      return Review.findEventReviews(query).$promise
        .then(function(eventsWrapper) {
          var photosPromise = Preload.photos(eventsWrapper.reviews, 'Cloudinary200', true);
          return $q.all([eventsWrapper, photosPromise]);
        })
        .then(function(array) {
          var eventsWrapper = array[0];
          return eventsWrapper;
        });
    }

    function validate() {
      var form = EventReviewModel.form;
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
      EventReviewModel.form.content = '';
    }

  }
})();
