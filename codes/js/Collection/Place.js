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
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +

      '/:within'
      ;

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',

      within: '@within'
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
