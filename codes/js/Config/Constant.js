(function(angular) {
  'use strict';

  angular.module('app')
    // Social login with Kakao
    .constant("KAKAO_KEY", "abcdefghijklmnopqrstu0123456789")
    // Social login with Facebook
    .constant("FACEBOOK_KEY", "1009847152386966")
    // Social login with twitter
    .constant("TWITTER_CONSUMER_KEY", "vvDhp4XYjVoeyu4MrTQOsDFZA")
    .constant("TWITTER_CONSUMER_SECRET", "t9MOmdTnIkG6AJgmPJnb1IlDD6appL4Qb8MROH2PPLdHosLPGi")
    // social login with google+
    .constant("GOOGLE_OAUTH_CLIENT_ID", "10105261268-engen5vr1t0neb3d3nb9iet3c31i8012.apps.googleusercontent.com")
    // Used for sending push notification
    .constant("GOOGLE_PROJECT_NUMBER", "10105261268")
    // Development mode
    .constant("DEV_MODE", true)
    // Server
    // .constant("SERVER_URL", "http://192.168.0.65:1337")
    .constant("SERVER_URL", "http://52.192.17.128")
    .constant("APP_NAME", "FITNESS_DAY")
    .constant("APP_ID", 9);
})(angular);
