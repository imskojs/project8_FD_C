(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    '$scope', '$timeout',
    'ProfileModel', 'User', 'AppStorage', 'U', 'Photo', 'Message'
  ];

  function ProfileController(
    $scope, $timeout,
    ProfileModel, User, AppStorage, U, Photo, Message
  ) {
    var Profile = this;
    Profile.Model = ProfileModel;

    Profile.getPhoto = getPhoto;
    Profile.sendForm = sendForm;

    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);
    //====================================================
    //  Implementation
    //====================================================

    function getPhoto() {
      return Photo.get('gallery', 600, true, 300, 'square', 1)
        .then(function(base64) {
          ProfileModel.form.files = [base64];
        })
        .catch(function(err) {
          U.error(err);
        });
    }

    function sendForm() {
      Message.loading();
      return User.update({}, {
          files: ProfileModel.form.files,
          name: ProfileModel.form.name,
          nickname: ProfileModel.form.nickname
        }).$promise
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          Message.hide();
          return Message.alert('프로필 변경 알림.', '프로필을 성공적으로 변경하였습니다.');
        })
        .then(function() {

        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.hide();
          Message.alert();
        });
    }

    function onBeforeEnter() {
      return User.findOne({
          id: AppStorage.user.id
        }).$promise
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          $timeout(function() {
            AppStorage.user = user;
            ProfileModel.form = user;
            console.log("---------- ProfileModel.form ----------");
            console.log(ProfileModel.form);
          }, 0);
        })
        .catch(function(err) {
          return U.error(err);
        });
    }

  }
})();
