(function() {
  'use strict';

  angular.module('app')
    .factory('SignUpModel', SignUpModel);

  SignUpModel.$inject = ['Users'];

  function SignUpModel(Users) {

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
    };
    model.validate = validate;
    model.beforeSend = beforeSend;
    model.registerWithImage = registerWithImage;

    return model;

    function validate() {

    }

    function beforeSend() {
      validate();
      model.form.username = model.form.email;
    }

    function registerWithImage() {
      beforeSend();
      console.log("---------- model.form ----------");
      console.log(model.form);
      console.log("HAS TYPE: " + typeof model.form);
      return Users
        .registerWithImage({}, model.form).$promise
        .then(function(dataWrapper) {
          console.log("---------- dataWrapper ----------");
          console.log(dataWrapper);

        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);

        });
    }

  }
})();
