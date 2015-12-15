/**
 * Created by Seunghoon Ko on 10/10/2015
 * As part of applicat platform
 *
 * Copyright (C) Applicat (www.applicat.co.kr) & Seunghoon Ko - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Seunghoon Ko <imskojs@gmail.com>, 10/10/2015
 *
 */
(function(angular) {
  'use strict';
  angular.module('app')
    .filter('AppText', AppText);

  AppText.$inject = [];

  function AppText() {
    return function(input) {
      if (input === true){
        return '유';
      } else if (input === false){
        return '무';
      }
    };
  }
})(angular);
