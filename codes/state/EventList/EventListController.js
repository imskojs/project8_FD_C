(function() {
  'use strict';
  angular.module('app')
    .controller('EventListController', EventListController);

  EventListController.$inject = [
    '$scope', '$q', '$ionicScrollDelegate',
    'EventListModel', 'U', 'Event', 'Preload'
  ];

  function EventListController(
    $scope, $q, $ionicScrollDelegate,
    EventListModel, U, Event, Preload
  ) {
    var EventList = this;
    EventList.Model = EventListModel;
    var noLoadingStates = [];

    EventList.loadMore = loadMore;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        EventListModel.events = [];
        $ionicScrollDelegate.scrollTop(false);
        EventListModel.loading = true;
      }
    }

    function onAfterEnter() {
      if (!U.areSiblingViews(noLoadingStates)) {
        return find()
          .then(function(eventsWrapper) {
            console.log(eventsWrapper);
            U.bindData(eventsWrapper, EventListModel, 'events');
          })
          .catch(U.error);
      }
    }

    function loadMore() {
      var length = EventListModel.events.length;
      return find({
          skip: length
        })
        .then(function(eventsWrapper) {
          U.appendData(eventsWrapper, EventListModel, 'events');
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
        category: 'EVENT',
        limit: 500,
        sort: 'createdAt DESC',
        populates: 'photos,createdBy'
      };
      angular.extend(query, extraQuery);
      return Event.find(query).$promise
        .then(function(eventsWrapper) {
          var photosPromise = Preload.photos(eventsWrapper.events, 'Cloudinary300', true);
          return $q.all([eventsWrapper, photosPromise]);
        })
        .then(function(array) {
          var eventsWrapper = array[0];
          return eventsWrapper;
        });
    }

  }
})();
