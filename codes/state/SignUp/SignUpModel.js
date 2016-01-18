(function() {
  'use strict';

  angular.module('app')
    .factory('SignUpModel', SignUpModel);

  SignUpModel.$inject = [];

  function SignUpModel() {

    var model = {
      form: {
        files: [],
        name: '',
        nickname: '',
        email: '',
        username: '',
        password: ''
      },
      confirmPassword: null,
      agree: false
    };

    return model;



  }
})();
