(function() {
  'use strict';

  angular.module('app')
    .factory('ProfileModel', ProfileModel);

  ProfileModel.$inject = [];

  function ProfileModel() {

    var model = {
      form: {
        files: [],
        name: '',
        nickname: ''
      }
    };

    return model;
  }
})();
