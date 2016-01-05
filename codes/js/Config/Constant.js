(function(angular) {
  'use strict';

  angular.module('app')
    .constant("GOOGLE_PUSH_SENDER_ID", "000000000000")
    .constant("KAKAO_KEY", "abcdefghijklmnopqrstu0123456789")
    .constant("FACEBOOK_KEY", "1009847152386966")

  .constant("TWITTER_CONSUMER_KEY", "vvDhp4XYjVoeyu4MrTQOsDFZA")
    .constant("TWITTER_CONSUMER_SECRET", "t9MOmdTnIkG6AJgmPJnb1IlDD6appL4Qb8MROH2PPLdHosLPGi")

  .constant("GOOGLE_KEY", "10105261268-engen5vr1t0neb3d3nb9iet3c31i8012.apps.googleusercontent.com")
    .constant("DEV_MODE", true)
    .constant("SERVER_URL", "http://192.168.0.65:1337")
    // .constant("SERVER_URL", "http://52.192.17.128")
    .constant("APP_NAME", "FITNESS_DAY")
    .constant("APP_ID", 9);
})(angular);
