(function() {
  'use strict';
  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = [
    '$cordovaOauth',
    'LoginModel', 'FACEBOOK_KEY', 'TWITTER_KEY', 'GOOGLE_KEY'
  ];

  function LoginController(
    $cordovaOauth,
    LoginModel, FACEBOOK_KEY, TWITTER_KEY, GOOGLE_KEY
  ) {

    var Login = this;
    Login.Model = LoginModel;

    Login.loginWithFacebook = loginWithFacebook;
    Login.loginWithTwitter = loginWithTwitter;
    Login.loginWithGoogle = loginWithGoogle;

    //====================================================
    //  Implementation
    //====================================================
    function loginWithFacebook() {
      return $cordovaOauth.facebook(FACEBOOK_KEY, ["email", "public_profile"])
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

    function loginWithTwitter() {
      return $cordovaOauth.twitter(TWITTER_KEY,
          't9MOmdTnIkG6AJgmPJnb1IlDD6appL4Qb8MROH2PPLdHosLPGi')
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
      return $cordovaOauth.google(GOOGLE_KEY, [
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
