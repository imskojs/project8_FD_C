(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Place', Place);

  Place.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Place(
    $resource,
    SERVER_URL
  ) {

    var placeUrl = SERVER_URL + '/place' +
      '/:find' +
      '/:findLikedPlaces' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +
      '/:like' +
      '/:unlike' +

      '/:within';

    var params = {
      find: '@find',
      findLikedPlaces: '@findLikedPlaces',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      like: '@like',
      unlike: '@unlike',

      within: '@within'
    };

    var actions = {

      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      findLikedPlaces: {
        method: 'GET',
        params: {
          findLikedPlaces: 'findLikedPlaces'
        }
      },

      findOne: {
        method: 'GET',
        params: {
          findOne: 'findOne'
        }
      },

      create: {
        method: 'POST',
        params: {
          create: 'create'
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
      },

      like: {
        method: 'POST',
        params: {
          like: 'like'
        }
      },

      unlike: {
        method: 'POST',
        params: {
          unlike: 'unlike'
        }
      },
      // longitude, latitude, distance
      within: {
        method: 'GET',
        params: {
          within: 'within'
        }
      }

    };

    var service = $resource(placeUrl, params, actions);

    return service;

  }
})(angular);
