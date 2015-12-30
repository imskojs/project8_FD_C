(function(angular) {
  'use strict';
  angular.module('app')
    .factory('User', User);

  User.$inject = [
    '$resource',
    'Photo',
    'SERVER_URL'
  ];

  function User(
    $resource,
    Photo,
    SERVER_URL
  ) {

    var postUrl = SERVER_URL + '/user' +
      '/:login';

    var params = {
      login: '@login'
    };

    var actions = {
      login: {
        method: 'POST',
        params: {
          login: 'login'
        }
      }
    };

    var service = $resource(postUrl, params, actions);

    service.register = register;

    return service;

    function register(param, query) {
      console.log("---------- User.register Service Query ----------");
      console.log(query);

      var promise = Photo.post('/user/register', query, 'POST')
        .then(function(dataWrapper) {
          return dataWrapper.data;
        });
      return {
        $promise: promise
      };
    }

  }
})(angular);
