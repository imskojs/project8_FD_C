(function() {
  'use strict';
  angular.module('app')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = [
    '$scope', '$timeout', '$window',
    'SignUpModel', 'Photo'
  ];

  function SignUpController(
    $scope, $timeout, $window,
    SignUpModel, Photo
  ) {

    var SignUp = this;
    SignUp.Model = SignUpModel;

    SignUp.getPicture = getPicture;
    SignUp.registerWithImage = SignUpModel.registerWithImage;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    SignUp.test = test;
    //====================================================
    //  Implementation
    //====================================================
    function getPicture() {
      return Photo.get('gallery', 300)
        .then(function(filePath) {
          console.log("---------- filePath ----------");
          console.log(filePath);
          console.log("HAS TYPE: " + typeof filePath);
          $timeout(function() {
            SignUpModel.form.files.push(filePath);
          }, 0);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    function onBeforeEnter() {
      SignUpModel.loading = true;
    }

    function onAfterEnter() {
      $timeout(function() {
        SignUpModel.loading = false;
      }, 20);
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
