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
      '/:findPlaceReviews' +
      '/:findOne' +
      '/:createPlaceReview' +
      '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findPlaceReviews: '@findPlaceReviews',
      findOne: '@findOne',
      createPlaceReview: '@createPlaceReview',
      update: '@update',
      destroy: '@destroy'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },
      findPlaceReviews: {
        method: 'GET',
        params: {
          findPlaceReviews: 'findPlaceReviews'
        }
      },
      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },
      createPlaceReview: {
        method: 'POST',
        params: {
          createPlaceReview: 'createPlaceReview'
        }
      },
      update: {
        method: 'PUT',
        params: {
          update: 'update'
        }
      },
      destroy: {
        method: 'DELETE',
        params: {
          destroy: 'destroy'
        }
      }
    };

    var service = $resource(reviewUrl, params, actions);

    return service;

  }
})(angular);
