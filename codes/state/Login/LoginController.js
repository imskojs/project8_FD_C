(function() {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$cordovaOauth',
    'LoginModel', 'User', 'U', 'Message',
    'FACEBOOK_KEY', 'TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET', 'GOOGLE_OAUTH_CLIENT_ID', 'AppStorage'
  ];

  function LoginController(
    $cordovaOauth,
    LoginModel, User, U, Message,
    FACEBOOK_KEY, TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, GOOGLE_OAUTH_CLIENT_ID, AppStorage
  ) {

    var Login = this;
    Login.Model = LoginModel;

    Login.localLogin = localLogin;
    Login.loginWithFacebook = loginWithFacebook;
    Login.loginWithTwitter = loginWithTwitter;
    Login.loginWithGoogle = loginWithGoogle;

    //====================================================
    //  Implementation
    //====================================================
    function localLogin() {
      Message.loading();
      User.login({}, LoginModel.form).$promise
        .then(function(userWrapper) {
          Message.hide();
          console.log("---------- userWrapper ----------");
          console.log(userWrapper);
          AppStorage.user = userWrapper.user;
          AppStorage.token = userWrapper.token;
          AppStorage.isFirstTime = false;
          U.goToState('Main.MainTab.PostList.PostListRecent', null, 'forward');
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          if (err.status === 403) {
            return Message.alert('로그인 알림', '비밀번호/이메일이 틀렸습니다. 다시 입력해주세요');
          } else {
            return Message.alert();
          }
        });
    }

    function loginWithFacebook() {
      return $cordovaOauth.facebook(FACEBOOK_KEY, ["email", "public_profile"])
        .then(function(res) {
          console.log("---------- res ----------");
          console.log(res);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
        });
    }

    function loginWithTwitter() {
      return $cordovaOauth.twitter(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET)
        .then(function(res) {
          console.log("---------- res ----------");
          console.log(res);
          console.log("HAS TYPE: " + typeof res);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

    function loginWithGoogle() {
      return $cordovaOauth.google(GOOGLE_OAUTH_CLIENT_ID, [
          "https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/plus.me"
        ])
        .then(function(res) {
          console.log("---------- res ----------");
          console.log(res);
          console.log("HAS TYPE: " + typeof res);
        })
        .catch(function(err) {
          console.log("---------- err ----------");
          console.log(err);
          console.log("HAS TYPE: " + typeof err);
        });
    }

  }
})();
