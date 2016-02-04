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
    $scope.$on('$ionicView.beforeEnter', onBeforeEnter);

    Profile.getPhoto = getPhoto;
    Profile.sendForm = sendForm;

    //====================================================
    //  Implementation
    //====================================================
    function onBeforeEnter() {
      return userFindOne()
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

    function getPhoto() {
      return Photo.get('gallery', 600, true, 300, 'square', 1)
        .then(function(base64) {
          ProfileModel.form.files = [base64];
        })
        .catch(function(err) {
          console.log("---------- err from getPhoto controller----------");
          console.log(err);
          // U.error(err);
        });
    }

    function sendForm() {
      Message.loading();
      userUpdate()
        .then(function(user) {
          console.log("---------- user ----------");
          console.log(user);
          Message.hide();
          return Message.alert('프로필 변경 알림.', '프로필을 성공적으로 변경하였습니다.');
        })
        .then(function() {
          U.goBack();

        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          Message.hide();
          Message.alert();
        });
    }


    //====================================================
    //  REST
    //====================================================
    function userFindOne() {
      return User.findOne({
        id: AppStorage.user.id
      }).$promise;
    }

    function userUpdate() {
      return User.update({}, {
        files: ProfileModel.form.files,
        name: ProfileModel.form.name,
        nickname: ProfileModel.form.nickname
      }).$promise;
    }

  }
})();
