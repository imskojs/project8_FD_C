(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Event', Event);

  Event.$inject = [
    '$resource',
    'SERVER_URL'
  ];

  function Event(
    $resource,
    SERVER_URL
  ) {

    var eventUrl = SERVER_URL + '/event' +
      '/:find' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy';

    var params = {
      find: '@find',
      findOne: '@findOne',
      create: '@create',
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
      }
    };

    var service = $resource(eventUrl, params, actions);

    return service;

  }
})(angular);
