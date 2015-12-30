(function(angular) {
  'use strict';
  angular.module('app')
    .factory('Comment', Comment);

  Comment.$inject = [
    '$resource',
    'Photo',
    'SERVER_URL'
  ];

  function Comment(
    $resource,
    Photo,
    SERVER_URL
  ) {

    var commentUrl = SERVER_URL + '/comment' +
      '/:find' +
      '/:findMyComments' +
      '/:findOne' +
      '/:create' +
      '/:update' +
      '/:destroy' +
      '/:like';

    var params = {
      find: '@find',
      findMyComments: '@findMyComments',
      findOne: '@findOne',
      create: '@create',
      update: '@update',
      destroy: '@destroy',
      like: '@like'
    };

    var actions = {
      find: {
        method: 'GET',
        params: {
          find: 'find'
        }
      },

      create: {
        method: 'POST',
        params: {
          create: 'create'
        }
      },

      findMyComments: {
        method: 'GET',
        params: {
          findMyComments: 'findMyComments'
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
      }
    };

    var service = $resource(commentUrl, params, actions);

    // service.create = create;

    return service;

    //====================================================
    //  Non Resource methods
    //====================================================
    // function create(params, query) {
    //   var promise = Photo.comment('/comment/create', query, 'POST')
    //     .then(function(commentWrapper) {
    //       return commentWrapper.data;
    //     });
    //   return {
    //     $promise: promise
    //   };
    // }

  }
})(angular);
