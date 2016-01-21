(function() {
  'use strict';
  angular.module('app')
    .controller('PasswordController', PasswordController);

  PasswordController.$inject = [
    '$scope',
    'PasswordModel', 'User', 'Message', 'U'
  ];

  function PasswordController(
    $scope,
    PasswordModel, User, Message, U
  ) {
    var Password = this;
    Password.Model = PasswordModel;

    Password.sendForm = sendForm;

    $scope.$on('$ionicView.beforeLeave', onBeforeLeave);

    //====================================================
    //  Implementation
    //====================================================
    function sendForm() {
      if (!validate()) {
        return Message.alert('비밀번호 변경 알림', '새로운 비밀번호와 재입력한 비밀번호가 다릅니다.');
      }
      return userChangePassword()
        .then(function(data) {
          console.log("---------- data ----------");
          console.log(data);
          return Message.alert('비밀번호 변경 알림', data.message);
        })
        .then(function() {
          reset();
          U.goBack();
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.alert('비밀번호 변경 알림', err.data.message);
          reset();
        });
    }

    function onBeforeLeave() {
      return reset();
    }

    //====================================================
    //  Helper
    //====================================================
    function validate() {
      if (PasswordModel.form.newPassword !== PasswordModel.newPasswordConfirm) {
        return false;
      } else if (true /*more logic*/ ) {
        // return false;
      }

      return true;
    }

    function reset() {
      PasswordModel.form.oldPassword = '';
      PasswordModel.form.newPassword = '';
      PasswordModel.newPasswordConfirm = '';
    }

    //====================================================
    //  REST
    //====================================================
    function userChangePassword() {
      return User.changePassword({
        oldPassword: PasswordModel.form.oldPassword,
        newPassword: PasswordModel.form.newPassword
      }).$promise;
    }
  }
})();
