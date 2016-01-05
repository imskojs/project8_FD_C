/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
(function(angular) {
  'use strict';
  angular.module('app')
    .controller('EventDetailController', EventDetailController);

  EventDetailController.$inject = [
    '$scope', '$state', '$q',
    'EventDetailModel', 'Event', 'Message', 'U', 'Preload', 'Favorite'
  ];

  function EventDetailController(
    $scope, $state, $q,
    EventDetailModel, Event, Message, U, Preload, Favorite
  ) {
    var EventDetail = this;
    EventDetail.Model = EventDetailModel;

    EventDetail.refresh = refresh;
    EventDetail.likeEvent = likeEvent;

    $scope.$on('$ionicView.afterEnter', function() {
      U.resize();
    });
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    // Initial Loading of a state;
    //====================================================
    function onBeforeEnter() {
      EventDetailModel.loading = true;
    }

    function onAfterEnter() {
      return findOne()
        .then(function(event) {
          console.log(event);
          U.bindData(event, EventDetailModel, 'event');
        })
        .catch(U.error);
    }


    function refresh() {
      return findOne()
        .then(function(event) {
          console.log(event);
          U.bindData(event, EventDetailModel, 'event');
        })
        .catch(U.error)
        .finally(function() {
          U.broadcast($scope);
        });
    }

    //====================================================
    //  Implementations
    //====================================================
    function likeEvent() {
      Favorite.likeEvent(EventDetailModel.event);
    }

    function findOne(extraQuery) {
      var query = {
        id: $state.params.id,
        populates: 'photos'
      };
      angular.extend(query, extraQuery);
      return Event.findOne(query).$promise
        .then(function(event) {
          var photosPromise = Preload.photos(event, 'Cloudinary600', false);
          return $q.all([event, photosPromise]);
        })
        .then(function(array) {
          var event = array[0];
          return event;
        });
    }

  } //end
})(angular);
