(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Review', Review);

  Review.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Review(
    $resource,
    SERVER_URL
  ) {

    var reviewUrl = SERVER_URL + '/review' +
      '/:find' +
      '/:findOne' +
      '/:update' +
      '/:findPlaceReviews' +
      '/:findEventReviews' +
      '/:createPlaceReview' +
      '/:createEventReview' +
      '/:destroyPlaceReview' +
      '/:destroyEventReview';

    var params = {
      find: '@find',
      findOne: '@findOne',
      update: '@update',
      findPlaceReviews: '@findPlaceReviews',
      findEventReviews: '@findEventReviews',
      createPlaceReview: '@createPlaceReview',
      createEventReview: '@createEventReview',
      destroyPlaceReview: '@destroyPlaceReview',
      destroyEventReview: '@destroyEventReview'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },
      findPlaceReviews: {
        method: 'GET',
        params: {
          findPlaceReviews: 'findPlaceReviews'
        }
      },
      findEventReviews: {
        method: 'GET',
        params: {
          findEventReviews: 'findEventReviews'
        }
      },
      createPlaceReview: {
        method: 'POST',
        params: {
          createPlaceReview: 'createPlaceReview'
        }
      },

      createEventReview: {
        method: 'POST',
        params: {
          createEventReview: 'createEventReview'
        }
      },
      destroyPlaceReview: {
        method: 'DELETE',
        params: {
          destroyPlaceReview: 'destroyPlaceReview'
        }
      },
      destroyEventReview: {
        method: 'DELETE',
        params: {
          destroyEventReview: 'destroyEventReview'
        }
      }
    };

    var service = $resource(reviewUrl, params, actions);

    return service;

  }
})(angular);
