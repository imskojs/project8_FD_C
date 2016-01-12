(function() {
  'use strict';
  angular.module('app')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = [
    '$scope', '$timeout', '$window',
    'SignUpModel', 'Photo', 'User', 'U', 'Message', 'Dom'
  ];

  function SignUpController(
    $scope, $timeout, $window,
    SignUpModel, Photo, User, U, Message, Dom
  ) {

    var SignUp = this;
    SignUp.Model = SignUpModel;

    SignUp.getPicture = getPicture;
    SignUp.register = register;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    $scope.$on('$ionicView.afterEnter', onAfterEnter);

    //====================================================
    //  Implementation
    //====================================================
    function getPicture() {
      SignUp.imgLoading = true;
      return Photo.get('gallery', 800, true, 300, 'square', 1)
        .then(function(base64) {
          SignUpModel.form.files = [];
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
      if (!validate()) {
        return false;
      }
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
          U.error(err);
        });
    }

    function validate() {
      var alert = Message.alert.bind(Message, '회원가입 알림');
      var form = SignUpModel.form;
      if (SignUpModel.form.files.length === 0) {
        alert('사진을 등록해주세요');
        return false;
      } else if (!form.name) {
        alert('이름을 입력해주세요')
          .then(function() {
            Dom.focusById('name');
          });
        return false;
      } else if (!form.nickname) {
        alert('별명을 입력해주세요')
          .then(function() {
            Dom.focusById('nickname');
          });
        return false;
      } else if (!form.email) {
        alert('이메일을 입력해주세요')
          .then(function() {
            Dom.focusById('email');
          });
        return false;
      } else if (form.password !== SignUpModel.confirmPassword) {
        alert('비밀번호를 동일하게 입력해주세요')
          .then(function() {
            Dom.focusById('password');
          });
        return false;
      } else if (!validateEmail(form.email)) {
        alert('이메일이 아닙니다, 다시 입력해주세요')
          .then(function() {
            Dom.focusById('email');
          });
        return false;
      } else {
        return true;
      }
    }

    function validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

  }
})();
