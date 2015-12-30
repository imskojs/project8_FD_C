(function() {
  'use strict';
  angular.module('app')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = [
    '$scope', '$timeout', '$window',
    'SignUpModel', 'Photo', 'User', 'U', 'Message'
  ];

  function SignUpController(
    $scope, $timeout, $window,
    SignUpModel, Photo, User, U, Message
  ) {

    var SignUp = this;
    SignUp.Model = SignUpModel;

    SignUp.getPicture = getPicture;
    SignUp.register = register;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    SignUp.test = test;
    //====================================================
    //  Implementation
    //====================================================
    function getPicture() {
      SignUp.imgLoading = true;
      return Photo.get('gallery', 800, true, 'square')
        .then(function(base64) {

          SignUpModel.form.files[0] = base64;

          $timeout(function() {
            SignUp.imgLoading = false;
          }, 2000);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    function onBeforeEnter() {
      // SignUpModel.loading = true;
    }

    function onAfterEnter() {
      $timeout(function() {
        SignUpModel.loading = false;
      }, 20);
    }

    function register() {
      Message.loading();
      SignUpModel.form.username = SignUpModel.form.email;
      return User
        .register({}, SignUpModel.form).$promise
        .then(function(data) {
          console.log("---------- data ----------");
          console.log(data);
          Message.hide();
          U.goToState('Main.Login', null, 'back');
        })
        .catch(function(err) {
          Message.hide();
          Message.alert();
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function test() {
      SignUpModel.form.name = 'test';
      SignUpModel.form.nickname = 'test';
      SignUpModel.form.email = 'test@test.com';
      SignUpModel.form.password = '1111';
      SignUpModel.passwordConfirm = '1111';
    }

  }
})();
