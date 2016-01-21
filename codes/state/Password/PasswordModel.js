(function() {
  'use strict';

  angular.module('app')
    .factory('PasswordModel', PasswordModel);

  PasswordModel.$inject = [];

  function PasswordModel() {

    var Model = {
      form: {
        oldPassword: '',
        newPassword: ''
      },
      newPasswordConfirm: ''
    };

    return Model;
  }
})();
